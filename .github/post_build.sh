#!/usr/bin/env bash

PACKAGE_NAME=cyto-snap
RUST_TARGET=$(node .github/get_target.js)

mkdir -p bins/${RUST_TARGET}
cp src-tauri/target/release/${PACKAGE_NAME}* bins/${RUST_TARGET}
