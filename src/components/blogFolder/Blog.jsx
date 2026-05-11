import { motion } from "framer-motion";
import {
  Layers,
  GitBranch,
  Boxes,
  Braces,
  Cpu,
  Database,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = {
  "clean-architecture": Layers,
  "dependency-injection": GitBranch,
  ddd: Boxes,
  dotnet: Braces,
  react: Cpu,
  sql: Database,
};

export default function Blog() {
  const { t, language } = useLanguage();
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
        {safeTopics.map((topic, index) => {
          const Icon = iconMap[topic.id] || Layers;
          return (
            <motion.article
              key={topic.id}
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
              </div>

              <h3 className="text-base font-bold mb-1 text-primary">
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{topic.subtitle}</p>

              <p className="text-sm text-foreground/75 leading-relaxed flex-1 mb-4">
                {topic.applied}
              </p>

              <div className="rounded-xl border border-border bg-black/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {topic.example.label}
                </div>
                <pre className="text-xs text-primary/80 overflow-auto whitespace-pre-wrap">
{topic.example.code}
                </pre>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
