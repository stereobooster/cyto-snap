// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "macos")]
use tauri::ActivationPolicy;

use base64::Engine;
// TODO: use https://doc.rust-lang.org/stable/std/io/trait.IsTerminal.html
use is_terminal::IsTerminal;
use path_clean::PathClean;
use std::path::{Path, PathBuf};
use std::io::Read;

#[tauri::command]
fn println(str: String) {
    println!("{}", str);
}

#[tauri::command]
fn eprintln(str: String) {
    eprintln!("{}", str);
}

#[tauri::command]
fn app_exit(app_handle: tauri::AppHandle, exit_code: i32) {
    app_handle.exit(exit_code)
}

fn absolute_path(path: impl AsRef<Path>) -> std::io::Result<PathBuf> {
    let path = path.as_ref();

    let absolute_path = if path.is_absolute() {
        path.to_path_buf()
    } else {
        std::env::current_dir()?.join(path)
    }
    .clean();

    Ok(absolute_path)
}

#[tauri::command]
fn read_source(src: String) -> Result<String, String> {
    if src == "" {
        let stdin = std::io::stdin();

        if stdin.is_terminal() {
            return Err(String::from("Can't read from stdin in terminal"));
        }

        let mut buffer = String::new();
        match stdin.lock().read_to_string(&mut buffer) {
            Ok(_) => Ok(buffer),
            Err(_) => Err(String::from("Error reading from stdin")),
        }
    } else {
        let path = absolute_path(PathBuf::from(src)).unwrap();
        match std::fs::read_to_string(&path) {
            std::result::Result::Ok(v) => Ok(v),
            std::result::Result::Err(e) => {
                Err(format!("{} ({})", e.to_string(), path.to_string_lossy()))
            }
        }
    }
}

#[tauri::command]
fn write_destination(dst: String, res: String) -> Result<String, String> {
    if dst == "" {
        print!("{}", res);
        Ok(String::from("ok"))
    } else {
        let bytes = base64::engine::general_purpose::STANDARD.decode(res);
        let path = absolute_path(PathBuf::from(dst)).unwrap();
        match bytes {
            std::result::Result::Ok(v) => {
                std::fs::write(path, v).unwrap();
                Ok(String::from("ok"))
            }
            std::result::Result::Err(e) => Err(e.to_string()),
        }
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(target_os = "macos")]
            app.set_activation_policy(ActivationPolicy::Accessory);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            println,
            eprintln,
            app_exit,
            read_source,
            write_destination
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
