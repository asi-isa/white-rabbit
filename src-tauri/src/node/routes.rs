use actix_web::{get, web, Responder};

use crate::node::appstate::AppState;

#[get("/hello/{param}")]
pub async fn hello(param: web::Path<String>) -> impl Responder {
    format!("hello {param}")
}

#[get("/")]
pub async fn index(data: web::Data<AppState>) -> impl Responder {
    format!("hello {:#?}", data.app_handle())
}
