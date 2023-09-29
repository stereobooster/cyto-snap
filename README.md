# Tauri + Vanilla TS

## Development

1. Install `rustup` or similar
   1. Install `rust`
2. Install `pnpm`
   1. `pnpm install`
3. Run: `pnpm tauri dev`

## Notes

https://github.com/cytoscape/cytosnap/blob/master/index.js

**TODO**:

- [x] read options from file (JSON)
  - https://tauri.app/v1/api/js/fs/
- [x] pass options to frontend
- [x] generate graph
- [x] take a picture and save to disk
  - https://github.com/AbhinavRobinson/tauri-screen-recorder
- [ ] add CLI options
  - https://tauri.app/v1/guides/features/cli/
  - input:
    - file path with whole content
      - absolute / relative
      - handle parse errors
    - STDIN with whole content
      - https://rust-cli.github.io/book/in-depth/machine-communication.html#how-to-deal-with-input-piped-into-us
  - output 
    - path where to write file
      - absolute / relative
    - STDOUT
      - options: binary, base64, base64uri
  - https://rust-cli.github.io/book/in-depth/exit-code.html
- [ ] setup CI
  - cross-platform https://tauri.app/v1/guides/building/cross-platform/
  - setup github releases
    - and checksums
- change icon (but this CLI anyway)
- distribution
  - Brew and others https://oclif.io/docs/releasing/
  - npm https://www.woubuc.be/blog/post/publishing-rust-binary-on-npm/
    - https://blog.xendit.engineer/how-we-repurposed-npm-to-publish-and-distribute-our-go-binaries-for-internal-cli-23981b80911b
    - https://github.com/prebuild/prebuild-install
    - https://github.com/prebuild/prebuildify
- visual-diff as integration testing
