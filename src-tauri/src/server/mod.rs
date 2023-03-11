use std::net::SocketAddr;

use actix_web::{
    web::{self, Data},
    App, HttpServer,
};

mod routes;
pub mod state;
mod util;
use self::{
    routes::{friend_request, hello, index, rcv_msg},
    state::AppState,
    util::get_address,
};

pub struct Server {
    address: SocketAddr,
    state: Data<AppState>,
}

impl Server {
    pub fn new() -> Self {
        Self {
            address: dbg!(get_address()),
            state: web::Data::new(AppState::new(None)),
        }
    }

    pub fn set(&self, state: AppState) {
        *self.state.app_handle.lock().unwrap() = state.app_handle();
    }

    pub async fn listen(&self) {
        let data = self.state.clone();

        tokio::spawn(
            HttpServer::new(move || {
                App::new()
                    .app_data(data.clone())
                    .service(hello)
                    .service(index)
                    .service(rcv_msg)
                    .service(friend_request)
            })
            .bind(&self.address)
            .unwrap()
            .run(),
        );
    }

    pub fn ip_port(&self) -> (String, String) {
        (
            self.address.ip().to_string(),
            self.address.port().to_string(),
        )
    }
}
