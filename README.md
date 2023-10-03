# cyto-snap

~~Full of hacks~~ Experimental package to demo how one can use Tauri instead of Puppeteer or Playwright.

Render graphs on the server side with Cytoscape.js, getting image file as output. This package is similar to [cytosnap](https://github.com/cytoscape/cytosnap), but is uses Tauri instead of Puppeteer.

Can be used like this:

```
npx @stereobooster/cyto-snap -s g2.json -d g2.png
```

## TODO

- [ ] support [SVG output](https://github.com/kinimesi/cytoscape-svg)
- Finish configuration of github actions
  - [ ] check release flow
  - [ ] add action to create releses for tags and publish Tauri installers to release
- write more tests
  - [ ] test `jpg`
  - [ ] test `STDIN` / `STDOUT`
  - test edge cases
    - [ ] none existent file
    - [ ] none existen folder
    - [ ] broken JSON
    - [ ] wrong values is JSON
  - [ ] test all [the rest of layouts](https://js.cytoscape.org/#extensions/layout-extensions) 
- [ ] Add TypeScript signatures

## Development

1. Install `rustup` or similar
   1. Install rust
2. Install `pnpm`
   1. Instal node packages `pnpm install`
3. Build `pnpm tauri build`, `pnpm tauri-postbuild`
4. Test `pnpm test`
