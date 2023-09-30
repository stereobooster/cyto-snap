import cytoscape, { Css } from "cytoscape";
import { invoke } from "@tauri-apps/api/tauri";
import { getMatches } from "@tauri-apps/api/cli";

type Options = {
  // cytoscape
  elements: any;
  style: cytoscape.Stylesheet[];
  layout: cytoscape.LayoutOptions;
  // other
  format: "png" | "jpeg"; // | "json";
  quality: number;
  resolvesTo: "base64uri" | "base64"; //| "binary";
  // not implemented
  // background: string;
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
  // background: "transparent",
  width: 400,
  height: 400,
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const matches = await getMatches();
    const src = matches.args.source.value || "";
    const dst = matches.args.destination.value || "";
    let source_raw = await invoke<string>("read_source", { src });
    // TODO: maybe validate with https://github.com/samchon/typia
    const source: Options = { ...defaults, ...JSON.parse(source_raw) };

    const container = document.getElementById("cy")!;

    // pixelperfect - start
    container.style.width = `${Math.floor(
      source.width / window.devicePixelRatio
    )}px`;
    container.style.height = `${Math.floor(
      source.height / window.devicePixelRatio
    )}px`;
    if ("style" in source.style[0] && source.style[0].selector === "node") {
      const style = source.style[0]?.style as Css.Node;
      if (typeof style.width === "number")
        style.width = style.width / window.devicePixelRatio;
      if (typeof style.height === "number")
        style.height = style.height / window.devicePixelRatio;
    }
    if ("style" in source.style[1] && source.style[1].selector === "edge") {
      const style = source.style[1]?.style as Css.Edge;
      if (typeof style.width === "number")
        style.width = style.width / window.devicePixelRatio;
    }
    if (
      "padding" in source.layout &&
      typeof source.layout.padding === "number"
    ) {
      source.layout.padding = source.layout.padding / window.devicePixelRatio;
    }
    // pixelperfect - end

    const cy = cytoscape({ container, ...source });

    cy.layout(source.layout).run();

    let res: string = "";

    switch (source.format) {
      case "jpeg":
        res = cy.jpeg({ quality: source.quality });
        break;
      case "png":
        res = cy.png();
        break;
      // case "json":
      //   result = JSON.stringify(cy.json());
      //   break;
    }

    if (dst) source.resolvesTo = "base64";

    switch (source.resolvesTo) {
      case "base64uri":
        // do nothing
        break;
      case "base64":
        res = res.replace(`data:image/${source.format};base64,`, "");
        break;
    }

    await invoke("write_destination", { dst, res });
    await invoke("app_exit", { exitCode: 0 });
  } catch (e) {
    await invoke("eprintln", { str: String(e) });
    await invoke("app_exit", { exitCode: 1 });
  }
});
