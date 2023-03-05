use tauri::Manager;

mod server;
use server::state::AppState;

mod client;
use client::send;

#[tokio::main]
async fn main() {
    let srv = server::Server::new("127.0.0.1:3300".to_string());

    srv.listen().await;

    tauri::Builder::default()
        .setup(move |app| {
            let app_handle = app.app_handle().clone();

            srv.set(AppState::new(Some(app_handle)));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![send])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
