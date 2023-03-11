use std::env;
use tauri::Manager;

mod types;
use types::PayloadAddress;

mod server;
use server::{state::AppState, Server};

mod client;
use client::{friend_request, send};

#[tokio::main]
async fn main() {
    let srv = Server::new();

    srv.listen().await;

    tauri::Builder::default()
        .setup(move |app| {
            let app_handle = app.app_handle();

            let (ip, port) = srv.ip_port();

            let app_handle1 = app_handle.clone();

            // i cant just emit the ip and port to the frontend(fe)
            // like so
            // app_handle.emit_all("address", ip_port);
            // the reason behind that is probably due to the ssr nature of nextjs
            // the event will be emitted while server side rendering
            // and will therefore not be useable/listenable on the fe
            //
            // so, the backend has to wait until the component actually mounts
            // before it emits the address
            // and to ensure that, it will listen to an event, which
            // will be emitted inside a useEffect hook
            // ...

            // TODO rename addressReq
            // frontend requests ip and port
            app.listen_global("ip_port_req", move |_| {
                let payload = PayloadAddress::new(ip.clone(), port.clone());
                app_handle1
                    .emit_all("address", payload)
                    .expect("Error while emitting 'address' event.");
            });

            srv.set(AppState::new(Some(app_handle)));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![send, friend_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
