# cyto-snap

## Development

1. Install `rustup` or similar
   1. Install `rust`
2. Install `pnpm`
   1. `pnpm install`
3. Build `pnpm tauri build`
4. Run `src-tauri/target/release/cyto-snap -s tmp/example.json -d tmp/example.png`

## TODO

- npm executable https://stereobooster.com/posts/distributing-executable-binaries-in-npm-package/
  - [ ] simplest option: pack all executables in npm and use `spawn`
    - map between rust and nose targets
- tests
  - test `jpg`
  - test `STDIN` / `STDOUT`
  - test error cases
    - none existent file
    - none existen folder
    - broken JSON
    - broken values is JSON
  - [ ] test all the rest of layouts https://js.cytoscape.org/#extensions/layout-extensions
- distribution
  - npm (see above)
  - standard OS packages https://tauri.app/v1/guides/building/
  - Brew and similar https://oclif.io/docs/releasing/
    - tarballs, https://snapcraft.io/, https://chocolatey.org/, https://scoop.sh/
  - "cURL installer" https://rust-cli.github.io/book/tutorial/packaging.html#how-to-install-these-binaries

## Links

- https://superface.ai/blog/npm-publish-gh-actions-changelog
- https://github.com/tauri-apps/tauri/discussions/3048
- https://github.com/cytoscape/cytosnap/blob/master/index.js
