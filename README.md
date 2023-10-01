# cyto-snap

~~A lot of hacks~~ Experimental package to demo how one can use Tauri instead of Puppeteer or Playwright.

Render graphs on the server side with Cytoscape.js, getting image file as output. This package is similar to [cytosnap](https://github.com/cytoscape/cytosnap), but is uses Tauri instead of Puppeteer

## TODO

- [npm executable](https://stereobooster.com/posts/distributing-executable-binaries-in-npm-package/)
  - [x] pack all executables in npm
  - [ ] either use `postinstall` to replace excutable or use JS wrapper with `spawn`
- Finish configuration of github actions
  - [ ] check release flow
  - [ ] add action to create releses for tags and publish Tauri installer to release
- [ ] write an article
- tests
  - [ ] test `jpg`
  - [ ] test `STDIN` / `STDOUT`
  - test error cases
    - [ ] none existent file
    - [ ] none existen folder
    - [ ] broken JSON
    - [ ] wrong values is JSON
  - [ ] test all the rest of layouts https://js.cytoscape.org/#extensions/layout-extensions
- distribution
  - Brew and similar https://oclif.io/docs/releasing/
    - tarballs, https://snapcraft.io/, https://chocolatey.org/, https://scoop.sh/
  - "cURL installer" https://rust-cli.github.io/book/tutorial/packaging.html#how-to-install-these-binaries

## Links

- https://github.com/tauri-apps/tauri/discussions/3048

## Development

1. Install `rustup` or similar
   1. Install `rust`
2. Install `pnpm`
   1. `pnpm install`
3. Build `pnpm tauri build`, `pnpm tauri-postbuild`
4. Test `pnpm test`
