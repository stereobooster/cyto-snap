# cyto-snap

## Development

1. Install `rustup` or similar
   1. Install `rust`
2. Install `pnpm`
   1. `pnpm install`
3. Build `pnpm tauri build`
4. Run `src-tauri/target/release/cyto-snap -s tmp/example.json -d tmp/example.png`

## Notes

https://github.com/cytoscape/cytosnap/blob/master/index.js

**TODO**:

- [ ] setup CI https://github.com/tauri-apps/tauri-action
  - cross-platform https://tauri.app/v1/guides/building/cross-platform/
  - setup github releases
    - and checksums
  - https://superface.ai/blog/npm-publish-gh-actions-changelog
- distribution
  - https://github.com/tauri-apps/tauri/discussions/3048
  - Brew and others https://oclif.io/docs/releasing/
  - npm https://www.woubuc.be/blog/post/publishing-rust-binary-on-npm/
    - https://blog.xendit.engineer/how-we-repurposed-npm-to-publish-and-distribute-our-go-binaries-for-internal-cli-23981b80911b
    - https://github.com/prebuild/prebuild-install
    - https://github.com/prebuild/prebuildify
- visual-diff as integration testing

## Links

- https://tauri.app/v1/guides/features/cli/
- https://rust-cli.github.io/book/index.html
- https://rust-cli-recommendations.sunshowers.io/index.html
- https://deterministic.space/rust-cli-tips.html
- https://doc.rust-lang.org/book/ch12-00-an-io-project.html
- https://doc.rust-lang.org/rust-by-example/
