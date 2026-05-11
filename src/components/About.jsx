import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t, language } = useLanguage();
  const dev = t("developer");
  const highlights = t("about.highlights");

  const role = dev.role[language];
  const loves = dev.loves[language];
  const greet = dev.greet[language];

  return (
    <section id="about" className="py-24 px-6 bg-background text-foreground transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-12">

          {/* Left Text Content */}
          <div className="md:w-[58%] space-y-6">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-primary/20 bg-primary/10 text-primary"
            >
              {t("about.title")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ color: "hsl(var(--primary))" }}
            >
              {t("about.heading")}
            </motion.h2>

            {Array.isArray(highlights) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-2"
              >
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-medium uppercase tracking-[0.15em] border border-primary/30 text-primary rounded-full bg-primary/5"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t("about.paragraph1")}
              <br /><br />
              {t("about.paragraph2")}
              <br /><br />
              {t("about.paragraph3")}
            </motion.p>
          </div>

          {/* Right Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 md:mt-0 md:w-[42%]"
          >
            <div className="relative">
              <div
                style={{
                  position: "absolute",
                  inset: "-4px",
                  borderRadius: "1rem",
                  backgroundColor: "hsl(var(--primary) / 0.22)",
                  transform: "rotate(3deg)",
                  zIndex: 0,
                }}
              />
              <div
                className="relative bg-black rounded-2xl overflow-hidden aspect-[4/5] border border-border"
                style={{ zIndex: 1 }}
              >
                <div className="p-8 text-white text-base">
                  <div className="mb-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="overflow-auto">
                    <code>
                      <span className="text-primary">const</span>{" "}
                      <span className="text-white">developer</span> = {"{"}
                      <br />{"  "}
                      <span className="text-primary">name</span>:{" "}
                      <span className="text-primary">'{dev.name}'</span>,
                      <br />{"  "}
                      <span className="text-primary">role</span>:{" "}
                      <span className="text-primary">'{role}'</span>,
                      <br />{"  "}
                      <span className="text-primary">loves</span>: [
                      <br />{"    "}
                      <span className="text-primary">'{loves[0]}'</span>,
                      <br />{"    "}
                      <span className="text-primary">'{loves[1]}'</span>,
                      <br />{"    "}
                      <span className="text-primary">'{loves[2]}'</span>
                      <br />{"  "}],
                      <br />{"  "}
                      <span className="text-primary">greet</span>:{" "}
                      <span className="text-primary">function</span>() {"{"}
                      <br />{"    "}
                      <span className="text-primary">return</span>{" "}
                      <span className="text-primary">'{greet}'</span>;
                      <br />{"  }"}
                      <br />
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
