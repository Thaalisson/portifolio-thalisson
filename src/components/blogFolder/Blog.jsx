import { motion } from "framer-motion";
import {
  Layers,
  GitBranch,
  Boxes,
  Braces,
  Cpu,
  Database,
  BookOpen,
  ArrowRight,
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
  const { t } = useLanguage();
  const topics = t("study.topics");
  const safeTopics = Array.isArray(topics) ? topics : [];

  return (
    <section className="py-20 px-6 bg-background text-foreground transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            {t("study.eyebrow")}
          </div>
          <h2 className="text-4xl font-bold mt-4">{t("study.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-4">
            {t("study.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {safeTopics.map((topic, index) => {
            const Icon = iconMap[topic.id] || Layers;
            return (
              <motion.article
                key={topic.id}
                className="group bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
                </div>

                <h3 className="text-xl font-semibold mt-4">{topic.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{topic.subtitle}</p>

                <p className="text-sm mt-4 text-foreground/90">{topic.applied}</p>

                <div className="mt-4 rounded-xl border border-border bg-black/60 p-4">
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
    </section>
  );
}
