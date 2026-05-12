import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let idCounter = 0;

export default function MermaidDiagram({ chart, expanded = false }) {
  const ref = useRef();
  const [id] = useState(() => `mermaid-${++idCounter}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        background: "transparent",
        primaryColor: "#1e293b",
        primaryTextColor: "#f1f5f9",
        primaryBorderColor: "#334155",
        lineColor: "#475569",
        secondaryColor: "#0f172a",
        tertiaryColor: "#0f172a",
        edgeLabelBackground: "#0f172a",
        clusterBkg: "#0f172a",
        clusterBorder: "#334155",
        titleColor: "#f1f5f9",
        nodeTextColor: "#f1f5f9",
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        fontSize: expanded ? "15px" : "12px",
      },
      flowchart: { curve: "basis", padding: expanded ? 24 : 16 },
    });

    mermaid.render(id, chart).then(({ svg }) => {
      if (ref.current) {
        ref.current.innerHTML = svg;
        const svgEl = ref.current.querySelector("svg");
        if (svgEl) {
          svgEl.style.maxWidth = "100%";
          svgEl.style.height = "auto";
          svgEl.removeAttribute("height");
        }
      }
    }).catch(() => {});
  }, [chart, expanded, id]);

  return <div ref={ref} className="w-full overflow-auto" />;
}
