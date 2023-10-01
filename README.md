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

- npm executable
  - npm https://stereobooster.com/posts/distributing-executable-binaries-in-npm-package/
- tests
  - test all layouts https://js.cytoscape.org/#extensions/layout-extensions
  - test `jpg`
  - test `STDIN` / `STDOUT`
  - test error cases
    - none existent file
    - none existen folder
    - broken JSON
    - broken values is JSON
- distribution
  - Brew and others https://oclif.io/docs/releasing/
  - "cURL installer" https://rust-cli.github.io/book/tutorial/packaging.html#how-to-install-these-binaries

## Links

- https://superface.ai/blog/npm-publish-gh-actions-changelog
- https://github.com/tauri-apps/tauri/discussions/3048
