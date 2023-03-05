use tauri::Manager;

mod node;
use node::appstate::AppState;

#[tokio::main]
async fn main() {
    let node = node::Node::new("127.0.0.1:3300".to_string());

    node.listen().await;

    tauri::Builder::default()
        .setup(move |app| {
            let app_handle = app.app_handle().clone();

            node.set(AppState::new(Some(app_handle)));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
