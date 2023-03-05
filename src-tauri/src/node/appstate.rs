use std::sync::Mutex;

use tauri::AppHandle;

pub struct AppState {
    pub app_handle: Mutex<Option<AppHandle>>,
}

impl AppState {
    pub fn new(app_handle: Option<AppHandle>) -> Self {
        Self {
            app_handle: Mutex::new(app_handle),
        }
    }

    pub fn app_handle(&self) -> Option<AppHandle> {
        self.app_handle.lock().unwrap().to_owned()
    }
}
