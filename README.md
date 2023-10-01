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

- tests
  - test all layouts https://js.cytoscape.org/#extensions/layout-extensions
  - test `jpg`
  - test `STDIN` / `STDOUT`
  - test error cases
    - none existent file
    - none existen folder
    - broken JSON
    - broken values is JSON
- npm executable
  - https://blog.orhun.dev/packaging-rust-for-npm/
  - https://www.woubuc.be/blog/post/publishing-rust-binary-on-npm/
  - https://blog.xendit.engineer/how-we-repurposed-npm-to-publish-and-distribute-our-go-binaries-for-internal-cli-23981b80911b
  - https://github.com/prebuild/prebuild-install
  - https://github.com/prebuild/prebuildify
  - https://github.com/EverlastingBugstopper/binary-install
  - https://github.com/avh4/binwrap
  - https://github.com/japaric/trust
- distribution
  - Brew and others https://oclif.io/docs/releasing/
  - npm
  - https://rust-cli.github.io/book/tutorial/packaging.html#how-to-install-these-binaries

## Links

- https://tauri.app/v1/guides/features/cli/
- https://rust-cli.github.io/book/index.html
- https://rust-cli-recommendations.sunshowers.io/index.html
- https://deterministic.space/rust-cli-tips.html
- https://doc.rust-lang.org/book/ch12-00-an-io-project.html
- https://doc.rust-lang.org/rust-by-example/

- https://superface.ai/blog/npm-publish-gh-actions-changelog
- https://github.com/tauri-apps/tauri/discussions/3048

- visual-diff
  - https://github.com/dmtrKovalenko/odiff
  - https://github.com/mapbox/pixelmatch
  - https://github.com/rsmbl/Resemble.js
  - https://github.com/gemini-testing/looks-same
  - https://github.com/HumbleSoftware/js-imagediff
  - https://github.com/reg-viz/img-diff-js
  - https://github.com/happo/lcs-image-diff
    - https://github.com/bokuweb/lcs-image-diff-rs
    - https://github.com/murooka/go-diff-image
  - https://github.com/yahoo/blink-diff (deprecated)
