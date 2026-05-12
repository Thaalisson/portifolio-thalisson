import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "../context/ThemeContext";

let idCounter = 0;

export default function MermaidDiagram({ chart }) {
  const ref = useRef();
  const { theme } = useTheme();
  const [id] = useState(() => `mermaid-${++idCounter}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      themeVariables: {
        primaryColor: "#25c163",
        primaryTextColor: theme === "dark" ? "#f8fafc" : "#0f172a",
        primaryBorderColor: "#25c163",
        lineColor: theme === "dark" ? "#4b5563" : "#94a3b8",
        background: theme === "dark" ? "#0f172a" : "#ffffff",
        nodeBorder: "#25c163",
        clusterBkg: theme === "dark" ? "#1e293b" : "#f1f5f9",
      },
      fontFamily: "inherit",
    });

    mermaid.render(id, chart).then(({ svg }) => {
      if (ref.current) ref.current.innerHTML = svg;
    }).catch(() => {});
  }, [chart, theme, id]);

  return <div ref={ref} className="w-full overflow-auto" />;
}
