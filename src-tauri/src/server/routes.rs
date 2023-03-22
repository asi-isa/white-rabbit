use actix_web::{get, post, web, Responder};
use tauri::Manager;

use crate::{server::state::AppState, types::PayloadAddress};

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Clone, Serialize)]
pub struct Message {
    msg: String,
    ip: String,
    port: String,
}

#[derive(Deserialize)]
pub struct FriendRequest {
    ip: String,
    port: String,
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

#[post("/friend/request")]
pub async fn friend_request(
    friend_request_data: web::Json<FriendRequest>,
    data: web::Data<AppState>,
) -> impl Responder {
    let FriendRequest { ip, port } = friend_request_data.0;

    let payload = PayloadAddress::new(ip.clone(), port.clone());

    emit("incomingFriendRequest", payload, data);

    format!("received friend request from {:#?} {:#?}", ip, port)
}

#[post("/friend/request/ack")]
pub async fn friend_request_ack(
    friend_request_data: web::Json<FriendRequest>,
    state: web::Data<AppState>,
) -> impl Responder {
    let FriendRequest { ip, port } = friend_request_data.0;

    let payload = PayloadAddress::new(ip.clone(), port.clone());

    emit("friendRequestAck", payload, state);

    format!("accepted friend request from {:#?} {:#?}", ip, port)
}

#[post("/msg")]
pub async fn rcv_msg(msg: web::Json<Message>, state: web::Data<AppState>) -> impl Responder {
    emit("rcv", msg.0, state);

    format!("received msg")
}

/// Emits event with payload to frontend.
fn emit<S>(event: &str, payload: S, state: web::Data<AppState>)
where
    S: Serialize + Clone,
{
    state
        .app_handle()
        .unwrap()
        .emit_all(event, payload)
        .unwrap();
}
