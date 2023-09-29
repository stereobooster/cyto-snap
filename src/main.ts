import cytoscape from "cytoscape";
import { invoke } from "@tauri-apps/api/tauri";
import { exit } from "@tauri-apps/api/process";

type Options = {
  // cytoscape
  elements: any;
  style: cytoscape.Stylesheet[];
  layout: cytoscape.LayoutOptions;
  // other
  format: "png" | "jpeg" | "json";
  quality: number;
  resolvesTo: "base64uri" | "base64" | "binary";
  // not implemented
  background: string;
  width: number;
  height: number;
};

import { getMatches } from '@tauri-apps/api/cli'

const defaults: Options = {
  elements: [],
  style: [],
  layout: { name: "grid" },
  format: "png",
  quality: 85,
  resolvesTo: "base64uri",
  background: "transparent",
  width: 200,
  height: 200,
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const matches = await getMatches();
    invoke("println", { str: JSON.stringify(matches.args)})


    let data: Options = await invoke("get_options").then((x) =>
      JSON.parse(x as string)
    );
    data = { ...defaults, ...data };

    const cy = cytoscape({
      container: document.getElementById("cy"),
      ...data,
    });

    // cy.promiseOn("ready")
    //   .then(async () => {

    //   })
    //   .catch(async () => {
    //     await exit(1);
    //   });

    // cy.data(data.elements)
    // cy.style(data.style)
    cy.layout(data.layout).run();

    let res: Promise<"string">;
    switch (data.format) {
      case "jpeg": {
        const b64 = cy
          .jpeg({ quality: data.quality })
          .replace(`data:image/${data.format};base64,`, "");
        res = invoke("on_layoutstop", {
          res: b64,
        });
        break;
      }
      case "png": {
        const b64 = cy.png().replace(`data:image/${data.format};base64,`, "");
        res = invoke("on_layoutstop", {
          res: b64,
        });
        break;
      }
      case "json": {
        const b64 = JSON.stringify(cy.json());
        res = invoke("on_layoutstop", {
          res: b64,
        });
        break;
      }
    }

    await res;
    await exit(0);
  } catch (e) {
    await exit(1);
  }
});
