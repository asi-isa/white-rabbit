use actix_web::{
    web::{self, Data},
    App, HttpServer,
};

mod routes;
pub mod state;
use self::{
    routes::{hello, index},
    state::AppState,
};

pub struct Server {
    address: String,
    state: Data<AppState>,
}

impl Server {
    pub fn new(address: String) -> Self {
        Self {
            address,
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
            })
            .bind(&self.address)
            .unwrap()
            .run(),
        );
    }
}
