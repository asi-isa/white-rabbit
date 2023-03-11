use std::collections::HashMap;

use crate::types::Address;

#[tauri::command]
pub async fn send(text: String) {
    let mut map = HashMap::new();
    map.insert("text", text);

    let client = reqwest::Client::new();
    let _res = client
        .post("http://localhost:3300/msg")
        .json(&map)
        .send()
        .await;
}

#[tauri::command]
pub async fn friend_request(from: Address, to: Address) {
    let mut json_body = HashMap::new();
    json_body.insert("ip", from.ip());
    json_body.insert("port", from.port());

    let url = format!("http://{}/friend/request", dbg!(to.to_string()));

    reqwest::Client::new()
        .post(url)
        .json(&json_body)
        .send()
        .await
        .unwrap();
}
