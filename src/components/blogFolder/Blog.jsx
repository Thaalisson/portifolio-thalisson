import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Layers,
  GitBranch,
  Boxes,
  Braces,
  Cpu,
  Database,
  Code2,
  GitMerge,
  Maximize2,
  X,
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
  "clean-architecture": `flowchart LR
    CTL["🌐 Controllers\n& Presenters"]
    APP["⚙️ Application\nUse Cases"]
    DOM(["💎 Domain\nEntities · Rules"])
    INF["🗄️ Infrastructure\nEF Core · SQL"]

    CTL -->|calls| APP
    APP -->|uses| DOM
    INF -. implements\nIRepository .-> APP

    style DOM fill:#25c163,color:#000,stroke:#25c163,stroke-width:2px
    style APP fill:#1e293b,color:#f1f5f9,stroke:#25c163,stroke-width:1.5px
    style CTL fill:#0f172a,color:#94a3b8,stroke:#334155
    style INF fill:#0f172a,color:#94a3b8,stroke:#334155`,

  "multi-tenant": `flowchart TD
    REQ(["📡 HTTP Request"])
    MW["🔑 Tenant Middleware\nresolve X-Tenant-Id"]
    CTX["TenantContext.Current"]
    DB["🛡️ DbContext\n.HasQueryFilter(tenantId)"]
    A[("🏢 Tenant A")]
    B[("🏢 Tenant B")]
    C[("🏢 Tenant C")]

    REQ --> MW --> CTX --> DB
    DB --> A & B & C

    style MW fill:#25c163,color:#000,stroke:#25c163,stroke-width:2px
    style DB fill:#1e293b,color:#f1f5f9,stroke:#25c163,stroke-width:1.5px
    style CTX fill:#0f172a,color:#94a3b8,stroke:#334155
    style A fill:#0f172a,color:#94a3b8,stroke:#334155
    style B fill:#0f172a,color:#94a3b8,stroke:#334155
    style C fill:#0f172a,color:#94a3b8,stroke:#334155`,

  "cqrs": `flowchart LR
    API["🌐 .NET API"]

    subgraph W ["  ✏️ Write Side  "]
      direction TB
      CMD["Command Bus"]
      H["Handler"]
      WDB[("SQL Server")]
      EVT(["Event Bus"])
      CMD --> H --> WDB
      H --> EVT
    end

    subgraph R ["  📖 Read Side  "]
      direction TB
      PRJ["Projector"]
      RDB[("Read Model")]
      QRY["Query Bus"]
      EVT2(["Event Bus"])
      EVT2 --> PRJ --> RDB
      QRY --> RDB
    end

    API -->|command| CMD
    API -->|query| QRY
    EVT -.->|propagates| EVT2

    style CMD fill:#25c163,color:#000,stroke:#25c163,stroke-width:2px
    style QRY fill:#25c163,color:#000,stroke:#25c163,stroke-width:2px
    style H fill:#1e293b,color:#f1f5f9,stroke:#25c163,stroke-width:1.5px
    style PRJ fill:#1e293b,color:#f1f5f9,stroke:#334155`,
};

function DiagramModal({ chart, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <GitBranch size={15} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">{title}</span>
              <span className="text-xs text-muted-foreground">— Architecture Diagram</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Diagram */}
          <div className="p-8 bg-black/40">
            <MermaidDiagram chart={chart} expanded />
          </div>

          <p className="text-center text-xs text-muted-foreground pb-4">
            Press <kbd className="px-1.5 py-0.5 rounded border border-border text-[10px]">Esc</kbd> or click outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TopicCard({ topic, index, onExpandDiagram }) {
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
        <div
          className="relative rounded-xl border border-border bg-black/40 p-4 cursor-zoom-in group/diagram"
          onClick={() => onExpandDiagram(diagramMap[topic.id], topic.title)}
        >
          <button className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-background/60 border border-border/60 text-muted-foreground opacity-0 group-hover/diagram:opacity-100 transition-opacity duration-200 hover:text-primary">
            <Maximize2 size={13} />
          </button>
          <MermaidDiagram chart={diagramMap[topic.id]} />
          <p className="text-center text-[10px] text-muted-foreground mt-2 opacity-0 group-hover/diagram:opacity-100 transition-opacity duration-200">
            Click to expand
          </p>
        </div>
      )}
    </motion.article>
  );
}

export default function Blog() {
  const { t } = useLanguage();
  const topics = t("study.topics");
  const safeTopics = Array.isArray(topics) ? topics : [];
  const [modal, setModal] = useState(null);

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
          <TopicCard
            key={topic.id}
            topic={topic}
            index={index}
            onExpandDiagram={(chart, title) => setModal({ chart, title })}
          />
        ))}
      </div>

      {modal && (
        <DiagramModal
          chart={modal.chart}
          title={modal.title}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
