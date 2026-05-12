import { motion } from "framer-motion";
import { useState } from "react";
import {
  Layers,
  GitBranch,
  Boxes,
  Braces,
  Cpu,
  Database,
  Code2,
  GitMerge,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import MermaidDiagram from "../MermaidDiagram";

const iconMap = {
  "clean-architecture": Layers,
  "multi-tenant": Boxes,
  "cqrs": GitMerge,
  dotnet: Braces,
  react: Cpu,
  sql: Database,
};

const diagramMap = {
  "clean-architecture": `graph TD
    API["API / Controllers"] --> UC["Use Cases"]
    UC --> D["Domain (Entities)"]
    UC --> IP["IRepository (Port)"]
    INF["Infrastructure (EF Core)"] -. implements .-> IP
    style D fill:#25c163,color:#000,stroke:#25c163
    style UC fill:#1e293b,color:#f8fafc,stroke:#25c163`,

  "multi-tenant": `graph TD
    C([Client]) --> GW["API Gateway"]
    GW --> TM["Tenant Middleware"]
    TM --> R["Tenant Resolver"]
    R --> A[("Tenant A\nData")]
    R --> B[("Tenant B\nData")]
    R --> C2[("Tenant C\nData")]
    style TM fill:#25c163,color:#000,stroke:#25c163
    style R fill:#1e293b,color:#f8fafc,stroke:#25c163`,

  "cqrs": `graph LR
    CL([Client]) --> API[".NET API"]
    API --> CMD["CommandBus"]
    API --> QRY["QueryBus"]
    CMD --> H["Handler"]
    H --> WDB[("Write DB\nSQL Server")]
    H --> EB["Event Bus"]
    EB --> PRJ["Projector"]
    PRJ --> RDB[("Read DB\nFast Model")]
    QRY --> RDB
    style CMD fill:#25c163,color:#000,stroke:#25c163
    style QRY fill:#25c163,color:#000,stroke:#25c163`,
};

function TopicCard({ topic, index }) {
  const [tab, setTab] = useState("code");
  const Icon = iconMap[topic.id] || Layers;
  const hasDiagram = !!diagramMap[topic.id];

  return (
    <motion.article
      className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {hasDiagram && (
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/40 border border-border/60">
            <button
              onClick={() => setTab("code")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                tab === "code"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 size={11} />
              Code
            </button>
            <button
              onClick={() => setTab("diagram")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                tab === "diagram"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GitBranch size={11} />
              Diagram
            </button>
          </div>
        )}
      </div>

      <h3 className="text-base font-bold mb-1 text-primary">{topic.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{topic.subtitle}</p>
      <p className="text-sm text-foreground/75 leading-relaxed flex-1 mb-4">{topic.applied}</p>

      {tab === "code" || !hasDiagram ? (
        <div className="rounded-xl border border-border bg-black/60 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {topic.example.label}
          </div>
          <pre className="text-xs text-primary/80 overflow-auto whitespace-pre-wrap">
{topic.example.code}
          </pre>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-black/40 p-4">
          <MermaidDiagram chart={diagramMap[topic.id]} />
        </div>
      )}
    </motion.article>
  );
}

export default function Blog() {
  const { t } = useLanguage();
  const topics = t("study.topics");
  const safeTopics = Array.isArray(topics) ? topics : [];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-primary/20 bg-primary/10 text-primary mb-4">
          {t("study.eyebrow")}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-primary">
          {t("study.title")}
        </h2>
        <p className="text-muted-foreground text-base mt-3 max-w-2xl">
          {t("study.subtitle")}
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {safeTopics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </div>
  );
}
