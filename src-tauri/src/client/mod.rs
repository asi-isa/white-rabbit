use std::collections::HashMap;

use serde::Serialize;

use crate::types::Address;

async fn post<T>(url: String, body: &T) -> Result<(), String>
where
    T: Serialize + ?Sized,
{
    let client = reqwest::Client::new();
    let response = client.post(url).json(&body).send().await;

    match response {
        Ok(_) => Ok(()),

        // TODO get error cause
        Err(error) => {
            println!("{:#?}", error);
            println!("{:#?}", error.to_string());
            Err("something went wrong".to_string())
        }
    }
}

#[tauri::command]
pub async fn send(msg: String, to: Address, from: Address) -> Result<(), String> {
    let mut body = HashMap::new();
    body.insert("msg", msg);

    body.insert("ip", from.ip());
    body.insert("port", from.port());

    let url = format!("http://{}/msg", to.to_string());

    let url = dbg!(url);

    post(url, &body).await
}

#[tauri::command]
pub async fn send_friend_request(from: Address, to: Address) -> Result<(), String> {
    let mut body = HashMap::new();
    body.insert("ip", from.ip());
    body.insert("port", from.port());

    let url = format!("http://{}/friend/request", dbg!(to.to_string()));

    post(url, &body).await
}

#[tauri::command]
pub async fn accept_friend_request(from: Address, to: Address) -> Result<(), String> {
    let mut body = HashMap::new();
    body.insert("ip", from.ip());
    body.insert("port", from.port());

    let url = format!("http://{}/friend/request/ack", dbg!(to.to_string()));

    post(url, &body).await
}
