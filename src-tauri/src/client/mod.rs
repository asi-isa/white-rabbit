use std::collections::HashMap;

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
