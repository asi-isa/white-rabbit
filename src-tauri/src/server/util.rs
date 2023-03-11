use std::net::ToSocketAddrs;

use actix_web::{App, HttpServer};

pub fn get_address() -> std::net::SocketAddr {
    let ip = "localhost"; // TODO get 'outside' ip
    let port = get_available_port().expect("No free port was found.");
    let address = format!("{ip}:{port}");

    let address = address.to_socket_addrs().unwrap().next().unwrap();

    address
}

fn get_available_port() -> Option<u16> {
    (49152..65535).find(|port| port_is_available(*port))
}

// TODO check if address is available
fn port_is_available(port: u16) -> bool {
    let address = format!("localhost:{port}");
    match HttpServer::new(|| App::new()).bind(address) {
        Ok(_) => true,
        Err(_) => false,
    }
}
