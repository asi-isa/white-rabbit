use std::env;

use tauri::Manager;

mod server;
use server::state::AppState;

mod client;
use client::send;

#[tokio::main]
async fn main() {
    // let args: Vec<String> = env::args().collect();
    // let port = &args[1];
    let port = 3300;

    let address = format!("127.0.0.1:{port}");

    let srv = server::Server::new(dbg!(address));

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
