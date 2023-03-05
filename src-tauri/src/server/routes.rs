use actix_web::{get, post, web, Responder};
use tauri::Manager;

use crate::server::state::AppState;

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Message {
    text: String,
}

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, Serialize)]
struct Payload {
    message: String,
}

#[get("/hello/{param}")]
pub async fn hello(param: web::Path<String>) -> impl Responder {
    format!("hello {param}")
}

#[get("/")]
pub async fn index(data: web::Data<AppState>) -> impl Responder {
    format!("hello {:#?}", data.app_handle())
}

#[post("/msg")]
pub async fn rcv_msg(msg: web::Json<Message>, data: web::Data<AppState>) -> impl Responder {
    data.app_handle()
        .unwrap()
        .emit_all(
            "rcv",
            Payload {
                message: msg.text.clone(),
            },
        )
        .unwrap();

    format!("hello {:#?}", msg.text)
}
