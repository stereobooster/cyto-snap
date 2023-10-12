import cytoscape, { Ext } from "cytoscape";
import { invoke } from "@tauri-apps/api/tauri";
import { getMatches } from "@tauri-apps/api/cli";

type Options = {
  // cytoscape
  elements: any;
  style: cytoscape.Stylesheet[];
  layout: cytoscape.LayoutOptions;
  // other
  format: "png" | "jpeg" | "svg" | "json";
  quality: number;
  resolvesTo: "base64uri" | "base64"; //| "blob";
  background: string;
  width: number;
  height: number;
};

const defaults: Options = {
  elements: [],
  style: [],
  layout: { name: "grid" },
  format: "png",
  quality: 85,
  resolvesTo: "base64uri",
  background: "transparent",
  width: 400,
  height: 400,
};

const loadExtension = async (name: string) => {
  let ext: Ext | undefined;
  switch (name) {
    case "avsdf":
      ext = (await import("cytoscape-avsdf")).default;
      break;
    case "dagre":
      ext = (await import("cytoscape-dagre")).default;
      break;
    // case "elk":
    //   // @ts-ignore
    //   ext = (await import("cytoscape-elk")).default;
    //   break;
    case "klay":
      ext = (await import("cytoscape-klay")).default;
      break;
    case "cola":
      // @ts-ignore
      ext = (await import("cytoscape-cola")).default;
      break;
    case "svg":
      // @ts-ignore
      ext = (await import("cytoscape-svg")).default;
      break;
  }
  if (ext) cytoscape.use(ext);
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const matches = await getMatches();
    const src = matches.args.source.value || "";
    const dst = matches.args.destination.value || "";
    let source_raw = await invoke<string>("read_source", { src });
    // TODO: maybe validate with https://github.com/samchon/typia
    const source: Options = { ...defaults, ...JSON.parse(source_raw) };

    await loadExtension(source.layout.name);

    const container = document.getElementById("cy")!;
    container.style.width = `${source.width}px`;
    container.style.height = `${source.height}px`;

    const cy = cytoscape({ container, ...source });

    if (typeof source.layout === "object") {
      // @ts-ignore
      if (source.layout.fit === undefined) source.layout.fit = true;
      // @ts-ignore
      if (source.layout.animate === undefined) source.layout.animate = false;
    }
    cy.layout(source.layout).run();

    let res: string = "";

    if (dst) source.resolvesTo = "base64";
    let enc = dst ? "base64" : "text";

    switch (source.format) {
      case "jpeg":
        res = cy.jpeg({
          quality: source.quality,
          bg: source.background,
          maxWidth: source.width,
          maxHeight: source.height,
          output: source.resolvesTo,
        });
        break;
      case "png":
        res = cy.png({
          bg: source.background,
          maxWidth: source.width,
          maxHeight: source.height,
          output: source.resolvesTo,
        });
        break;
      case "svg":
        await loadExtension("svg");
        enc = "text";
        // @ts-ignore
        res = cy.svg({
          bg: source.background,
          full: true,
        });
        break;
      case "json":
        enc = "text";
        res = JSON.stringify(cy.json());
        break;
    }

    await invoke("write_destination", { dst, res, enc });
    await invoke("app_exit", { exitCode: 0 });
  } catch (e) {
    await invoke("eprintln", { str: String(e) });
    await invoke("app_exit", { exitCode: 1 });
  }
});
