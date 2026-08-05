import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const jobs = [
  {
    id: 1,
    company: "Opid Technologies",
    role: { en: "Software Developer", pt: "Desenvolvedor de Software" },
    period: { en: "May 2022 – Present · 4+ years", pt: "Mai 2022 – Presente · 4+ anos" },
    location: "Tillsonburg, ON, Canada 🇨🇦",
    isCurrent: true,
    relocation: { en: "Relocated from Brazil 🇧🇷", pt: "Relocado do Brasil 🇧🇷" },
    achievements: {
      en: [
        "Develop full-stack capabilities for enterprise SaaS and no-code products using C#, ASP.NET Core, React, React Native/Expo, TypeScript, SQL, and REST APIs",
        "Design modular backends with Clean Architecture and business-domain modules, organizing frontend code into reusable, domain-focused components, services, hooks, types, and tests",
        "Built a JSON-driven UI platform with reusable components, real-time preview, and versioned layouts — reduced UI creation time by 50% and development rework by 35%",
        "Use Claude Code and ChatGPT to review diffs, validate API contracts, generate tests and edge cases, and maintain architecture, runbook, and feature documentation in Markdown — personally review and validate AI-generated code before implementation",
        "Create automated tests with complete simulated database scenarios to validate business rules, API behavior, error handling, and regressions",
        "Partner with developers, product stakeholders, and business teams to clarify requirements, surface risks early, optimize APIs and queries, and deliver maintainable increments",
      ],
      pt: [
        "Desenvolve capacidades full-stack para produtos SaaS enterprise e no-code usando C#, ASP.NET Core, React, React Native/Expo, TypeScript, SQL e REST APIs",
        "Projeta backends modulares com Clean Architecture e módulos de domínio de negócio, organizando o frontend em componentes, services, hooks, types e testes reutilizáveis e orientados a domínio",
        "Construiu plataforma de UI orientada a JSON com componentes reutilizáveis, preview em tempo real e layouts versionados — reduziu tempo de criação de UI em 50% e retrabalho de desenvolvimento em 35%",
        "Usa Claude Code e ChatGPT para revisar diffs, validar contratos de API, gerar testes e edge cases, e manter documentação de arquitetura, runbooks e features em Markdown — revisa e valida pessoalmente código gerado por IA antes da implementação",
        "Cria testes automatizados com cenários completos de banco de dados simulados para validar regras de negócio, comportamento de API, tratamento de erros e regressões",
        "Colabora com desenvolvedores, stakeholders de produto e times de negócio para esclarecer requisitos, identificar riscos cedo, otimizar APIs e queries, e entregar incrementos sustentáveis",
      ],
    },
    tech: ["C#", ".NET Core", "React.js", "TypeScript", "SQL Server", "Clean Arch", "Claude Code"],
  },
  {
    id: 2,
    company: "MFMti",
    role: { en: "Senior Software Developer", pt: "Desenvolvedor de Software Sênior" },
    period: { en: "Oct 2013 – May 2022 · 8.5 years", pt: "Out 2013 – Mai 2022 · 8,5 anos" },
    location: "São Paulo, SP, Brazil 🇧🇷",
    isCurrent: false,
    clients: ["Claro", "Boticário", "Jequiti", "PAN Bank"],
    achievements: {
      en: [
        "Led 4-person production support team — defined SLAs, triaged critical incidents by severity, assigned tasks by developer expertise, and ran client-facing meetings on issue criticality",
        "CRM System (Claro): Increased credit recovery rate by 65% — C#, SQL Server, ASP.NET",
        "Billing Platform (Jequiti): Improved billing efficiency by 34% — ASP.NET MVC, REST APIs",
        "Scheduling System (TFT Global): Improved workforce efficiency by 40% through backend services",
        "Migrated legacy VB6/ASP systems to .NET Core, reducing downtime by 20%",
        "Optimized complex SQL queries and stored procedures, improving database performance by 30%",
      ],
      pt: [
        "Liderou equipe de 4 pessoas de suporte a produção — definiu SLAs, triou incidentes críticos por severidade, delegou tarefas por expertise e conduziu reuniões com clientes sobre criticidade",
        "Sistema CRM (Claro): Aumentou taxa de recuperação de crédito em 65% — C#, SQL Server, ASP.NET",
        "Plataforma de Cobrança (Jequiti): Melhorou eficiência em 34% — ASP.NET MVC, REST APIs",
        "Sistema de Agendamento (TFT Global): Melhorou eficiência operacional em 40%",
        "Migrou sistemas legados VB6/ASP para .NET Core, reduzindo downtime em 20%",
        "Otimizou queries SQL complexas e stored procedures, melhorando performance em 30%",
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
