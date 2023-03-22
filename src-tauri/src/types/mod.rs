use serde::{Deserialize, Serialize};

#[derive(Serialize, Clone)]
pub struct PayloadMsg {
    msg: String,
}

impl PayloadMsg {
    pub fn new(msg: String) -> Self {
        Self { msg }
    }
}

#[derive(Serialize, Clone)]
pub struct PayloadAddress {
    ip: String,
    port: String,
}

impl PayloadAddress {
    pub fn new(ip: String, port: String) -> Self {
        Self { ip, port }
    }
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Address {
    ip: String,
    port: String,
}

impl Address {
    pub fn new(ip: String, port: String) -> Self {
        Self { ip, port }
    }

    pub fn ip(&self) -> String {
        self.ip.clone()
    }

    pub fn port(&self) -> String {
        self.port.clone()
    }

    pub fn to_string(&self) -> String {
        format!("{}:{}", self.ip, self.port)
    }
}
