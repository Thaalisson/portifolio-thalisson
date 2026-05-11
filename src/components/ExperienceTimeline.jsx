import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const jobs = [
  {
    id: 1,
    company: "Opid Technologies",
    role: { en: "Software Developer", pt: "Desenvolvedor de Software" },
    period: { en: "May 2022 – Present · 4 years", pt: "Mai 2022 – Presente · 4 anos" },
    location: "London, ON, Canada 🇨🇦",
    isCurrent: true,
    relocation: { en: "Relocated from Brazil 🇧🇷", pt: "Relocado do Brasil 🇧🇷" },
    achievements: {
      en: [
        "Built a No-Code Page & UI Builder (React.js, React Native, TypeScript, Tailwind CSS) — reduced layout creation time by 50% and dev rework by 35%",
        "Designed and maintained backend services and REST APIs, improving issue resolution time by 15%",
        "Built reporting features that increased data visibility and decision-making speed by 25%",
        "Reduced overall rework by 30% through Clean Architecture and cross-functional collaboration",
        "Applied API-driven architecture integrating backend services with React-based frontends",
      ],
      pt: [
        "Construiu plataforma No-Code de UI Builder (React.js, React Native, TypeScript, Tailwind CSS) — reduziu criação de layouts em 50% e retrabalho em 35%",
        "Projetou e manteve serviços backend e REST APIs, melhorando tempo de resolução em 15%",
        "Criou features de relatórios que aumentaram visibilidade de dados e velocidade de decisão em 25%",
        "Reduziu retrabalho em 30% através de Clean Architecture e colaboração cross-funcional",
        "Aplicou arquitetura API-driven integrando serviços backend com frontends React",
      ],
    },
    tech: ["C#", ".NET Core", "React.js", "TypeScript", "SQL Server", "Clean Arch"],
  },
  {
    id: 2,
    company: "MFMti",
    role: { en: "Software Developer", pt: "Desenvolvedor de Software" },
    period: { en: "Oct 2013 – May 2022 · 8.5 years", pt: "Out 2013 – Mai 2022 · 8,5 anos" },
    location: "São Paulo, SP, Brazil 🇧🇷",
    isCurrent: false,
    clients: ["Claro", "Boticário", "Jequiti", "PAN Bank"],
    achievements: {
      en: [
        "CRM System (Claro): Increased credit recovery rate by 65% — C#, SQL Server, ASP.NET",
        "Billing Platform (Jequiti): Improved billing efficiency by 34% — ASP.NET MVC, REST APIs",
        "Scheduling System (TFT Global): Improved workforce efficiency by 40% through backend services",
        "Migrated legacy VB6/ASP systems to .NET Core, reducing downtime by 20%",
        "Optimized complex SQL queries and stored procedures, improving database performance by 30%",
        "Built RESTful APIs and Web Services, reducing integration response times by 20%",
      ],
      pt: [
        "Sistema CRM (Claro): Aumentou taxa de recuperação de crédito em 65% — C#, SQL Server, ASP.NET",
        "Plataforma de Cobrança (Jequiti): Melhorou eficiência em 34% — ASP.NET MVC, REST APIs",
        "Sistema de Agendamento (TFT Global): Melhorou eficiência operacional em 40%",
        "Migrou sistemas legados VB6/ASP para .NET Core, reduzindo downtime em 20%",
        "Otimizou queries SQL complexas e stored procedures, melhorando performance em 30%",
        "Construiu APIs RESTful e Web Services, reduzindo tempos de resposta em 20%",
      ],
    },
    tech: ["C#", ".NET", "ASP.NET MVC", "SQL Server", "VB6", "REST APIs"],
  },
];

export default function ExperienceTimeline() {
  const { t, language } = useLanguage();

  return (
    <section
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
      id="experience"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-primary/20 bg-primary/10 text-primary mb-4">
            {t("experience.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-primary">
            {t("experience.title")}
          </h2>
          <p className="text-muted-foreground text-base mt-3 max-w-2xl">{t("experience.subtitle")}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="relative pl-14 mb-12 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div
                className={`absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 z-10 ${
                  job.isCurrent
                    ? "bg-primary border-primary"
                    : "bg-background border-border"
                }`}
              >
                {job.isCurrent && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-primary">
                        {job.company}
                      </h3>
                      {job.isCurrent && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                          {language === "en" ? "Current" : "Atual"}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{job.role[language]}</p>
                  </div>

                  <div className="text-right text-sm shrink-0">
                    <div className="flex items-center gap-1 text-muted-foreground justify-end">
                      <Calendar size={13} />
                      <span>{job.period[language]}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground justify-end mt-1">
                      <MapPin size={13} />
                      <span>{job.location}</span>
                    </div>
                    {job.relocation && (
                      <p className="text-xs text-primary mt-1">{job.relocation[language]}</p>
                    )}
                  </div>
                </div>

                {job.clients && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="text-xs text-muted-foreground">
                      {language === "en" ? "Clients:" : "Clientes:"}
                    </span>
                    {job.clients.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 text-xs rounded-full border border-border text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="space-y-2 mb-5">
                  {job.achievements[language].map((achievement, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
