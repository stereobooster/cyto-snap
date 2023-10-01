#!/usr/bin/env bash

PACKAGE_NAME=$(node -p "require('./package.json').name")
RUST_TARGET=$(node .github/get_target.js)

mkdir -p bins/${RUST_TARGET}
cp src-tauri/target/release/${PACKAGE_NAME}* bins/${RUST_TARGET}
