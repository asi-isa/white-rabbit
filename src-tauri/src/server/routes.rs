use actix_web::{get, post, web, HttpRequest, Responder};
use tauri::Manager;

use crate::{server::state::AppState, types::PayloadAddress};

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Message {
    text: String,
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
    friend_request: web::Json<FriendRequest>,
    data: web::Data<AppState>,
) -> impl Responder {
    let FriendRequest { ip, port } = friend_request.0;

    let payload = PayloadAddress::new(ip.clone(), port.clone());

    emit("incomingFriendRequest", payload, data);

    format!("received friend request from {:#?} {:#?}", ip, port)
}

#[post("/msg")]
pub async fn rcv_msg(
    req: HttpRequest,
    msg: web::Json<Message>,
    data: web::Data<AppState>,
) -> impl Responder {
    let payload = Payload {
        message: msg.text.clone(),
    };

    emit("rcv", payload, data);

    println!("req {:#?}", req);
    println!("req.peer_addr {:#?}", req.peer_addr());
    println!("req.connection_info {:#?}", req.connection_info());
    // println!("req.conn_data {:#?}", req.conn_data());
    println!("req.headers {:#?}", req.headers());

    format!("hello {:#?}", msg.text)
}

/// Emits event with payload to frontend.
fn emit<S>(event: &str, payload: S, data: web::Data<AppState>)
where
    S: Serialize + Clone,
{
    data.app_handle().unwrap().emit_all(event, payload).unwrap();
}
