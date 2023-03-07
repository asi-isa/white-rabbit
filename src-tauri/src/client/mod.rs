use std::{collections::HashMap, fmt::format};

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
pub async fn friend_request(ip: String, port: String) {
    let mut map = HashMap::new();
    // TODO get my ip and port from global state
    // less ambiguos: toIp, fromIp, ...
    map.insert("ip", "127.0.0.1");
    map.insert("port", "3300");

    let url = format!("http://{ip}:{port}/friend/request");

    reqwest::Client::new()
        .post(url)
        .json(&map)
        .send()
        .await
        .unwrap();
}
