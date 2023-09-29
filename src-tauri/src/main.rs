// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{fs, os::fd::AsFd, io::Read};
use tauri::ActivationPolicy;
use std::{
    fs::File,
    io::{stdin, BufRead, BufReader},
    path::PathBuf,
};

#[tauri::command]
fn println(str: String) {
    println!("{}", str);
}

#[tauri::command]
fn read_source(src: String) {
    // let mut file = PathBuf::from(src);
    // let word_count;

    if src == "" {
        let stdin = std::io::stdin();

        if std::io::IsTerminal.is_terminal() {
            // ::std::process::exit(2);
        }

        let mut buffer = String::new();
        let mut handle = stdin.lock();
        let data = handle.read_to_string(bufffer);
    
    } else {
        fs::read_to_string(path.to_str().unwrap());
        
    }

}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_options() -> Result<String, String> {
    // println!("get_options");

    let mut path = current_dir().unwrap();
    path.push("example.json");

    let data = fs::read_to_string(path.to_str().unwrap());
    match data {
        std::result::Result::Ok(v) => {
            println!("Found file {}", path.to_str().unwrap());
            Ok(v)
        }
        std::result::Result::Err(_) => {
            println!("No such file {}", path.to_str().unwrap());
            Err(String::from("No such file"))
        }
    }
}

use base64::Engine;
use std::env::current_dir;

#[tauri::command]
fn on_layoutstop(app_handle: tauri::AppHandle, res: String) {
    //-> Result<String, String> {
    // println!("on_layoutstop");

    let bytes_url = base64::engine::general_purpose::STANDARD.decode(res);

    let mut path = current_dir().unwrap();
    path.push("example.png");

    match bytes_url {
        std::result::Result::Ok(v) => {
            std::fs::write(path.to_str().unwrap(), v).unwrap();
            // println!("generated file");
            // Ok(String::from("ok"))
            app_handle.exit(0)
        }
        std::result::Result::Err(_e) => {
            // println!("error generating file");
            // Err(String::from(e.to_string()))
            app_handle.exit(1)
        }
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.set_activation_policy(ActivationPolicy::Accessory);
            // match app.get_cli_matches() {
            //     // `matches` here is a Struct with { args, subcommand }.
            //     // `args` is `HashMap<String, ArgData>` where `ArgData` is a struct with { value, occurrences }.
            //     // `subcommand` is `Option<Box<SubcommandMatches>>` where `SubcommandMatches` is a struct with { name, matches }.
            //     Ok(matches) => {
            //         println!("{:?}", matches)
            //     }
            //     Err(e) => {
            //         println!("{:?}", e.to_string());
            //         app.handle().exit(1)
            //     }
            // }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            println,
            get_options,
            on_layoutstop
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
