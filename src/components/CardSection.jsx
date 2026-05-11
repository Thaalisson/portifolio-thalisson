import { motion } from "framer-motion";
import {
  FaCubes,
  FaUsers,
  FaChartLine,
  FaHeartbeat,
  FaCalendarAlt,
  FaGlobe,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    id: "nocode",
    title: { en: "No-Code UI Builder Platform", pt: "Plataforma No-Code UI Builder" },
    company: "Opid Technologie",
    icon: FaCubes,
    metric: "↓ 50% layout time · ↓ 35% rework",
    description: {
      en: "Visual page builder via JSON configurations using React.js, React Native (Expo), TypeScript, and Tailwind CSS. Real-time preview and versioned layouts for non-technical users.",
      pt: "Builder visual de páginas via configurações JSON com React.js, React Native (Expo), TypeScript e Tailwind CSS. Preview em tempo real e layouts versionados para usuários não técnicos.",
    },
    tech: ["React.js", "React Native", "TypeScript", "Tailwind CSS"],
    type: "enterprise",
  },
  {
    id: "crm",
    title: { en: "CRM System", pt: "Sistema CRM" },
    company: "Claro · MFMti",
    icon: FaUsers,
    metric: "↑ 65% recovery rate",
    description: {
      en: "Enterprise CRM for credit recovery in the telecom industry. Billing, scheduling, and recovery flows across high-volume data pipelines for one of Brazil's largest carriers.",
      pt: "CRM enterprise para recuperação de crédito no setor de telecom. Fluxos de cobrança, agendamento e recuperação em pipelines de alto volume para uma das maiores operadoras do Brasil.",
    },
    tech: ["C#", "ASP.NET", "SQL Server", "VBScript"],
    type: "enterprise",
  },
  {
    id: "billing",
    title: { en: "Billing Platform", pt: "Plataforma de Cobrança" },
    company: "Jequiti · MFMti",
    icon: FaChartLine,
    metric: "↑ 34% billing efficiency",
    description: {
      en: "Billing and credit recovery system for cosmetics retail. REST API orchestration, payment processing, and reporting modules with PAN Bank integration.",
      pt: "Sistema de cobrança e recuperação de crédito para varejo de cosméticos. Orquestração de REST APIs, processamento de pagamentos e módulos de relatório com integração PAN Bank.",
    },
    tech: ["ASP.NET MVC", "REST APIs", "SQL Server", "C#"],
    type: "enterprise",
  },
  {
    id: "shiva",
    title: "S.H.I.V.A",
    company: "Freelance · BrayLab",
    icon: FaHeartbeat,
    metric: { en: "Active B2B SaaS · NR-1 / NR-17", pt: "SaaS B2B ativo · NR-1 / NR-17" },
    description: {
      en: "SaaS platform for occupational health & compliance. Features 3D office visualization (Three.js), Neuromap, PDF report generation, multi-tenant auth, and AI-driven training plans.",
      pt: "Plataforma SaaS para saúde ocupacional e conformidade. Visualização 3D do escritório (Three.js), Neuromap, geração de PDF, auth multi-tenant e planos de capacitação com IA.",
    },
    tech: ["React 19", "TypeScript", "Three.js", "Tailwind CSS 4", "Recharts"],
    link: "https://app-shiva.braylab.com.br",
    type: "live",
  },
  {
    id: "scheduling",
    title: { en: "Scheduling System", pt: "Sistema de Agendamento" },
    company: "TFT Global · MFMti",
    icon: FaCalendarAlt,
    metric: "↑ 40% workforce efficiency",
    description: {
      en: "Backend scheduling service for workforce management. Automated assignment logic, conflict resolution, and real-time shift optimization.",
      pt: "Serviço backend de agendamento de força de trabalho. Lógica de atribuição automatizada, resolução de conflitos e otimização de turnos em tempo real.",
    },
    tech: ["C#", ".NET", "SQL Server", "REST APIs"],
    type: "enterprise",
  },
  {
    id: "erivan",
    title: { en: "Website · Psicologa Erivan", pt: "Site · Psicóloga Erivan" },
    company: "Freelance",
    icon: FaGlobe,
    metric: { en: "Live website", pt: "Site no ar" },
    description: {
      en: "Professional website for a psychologist. Smooth animations, responsive layout, and clean bilingual content.",
      pt: "Site profissional para psicóloga. Animações suaves, layout responsivo e conteúdo bilíngue limpo.",
    },
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://psicologaerivan.com.br/#home",
    type: "live",
  },
];

export default function CardSection() {
  const { t, language } = useLanguage();

  return (
    <section
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
      id="projects"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-primary/20 bg-primary/10 text-primary mb-4">
            {language === "en" ? "Work" : "Trabalhos"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-primary">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground text-base mt-3 max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const title =
              typeof project.title === "object" ? project.title[language] : project.title;
            const desc = project.description[language];
            const metric =
              typeof project.metric === "object" ? project.metric[language] : project.metric;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <project.icon size={20} className="text-primary" />
                  </div>
                  {project.type === "live" ? (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                      {language === "en" ? "Live" : "No ar"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full border border-border text-muted-foreground">
                      Enterprise
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold mb-0.5 text-primary">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{project.company}</p>
                <p className="text-sm font-semibold text-primary mb-3">{metric}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    {language === "en" ? "Visit Project" : "Visitar Projeto"}
                    <FaExternalLinkAlt size={11} />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    {language === "en"
                      ? "Confidential · Enterprise project"
                      : "Confidencial · Projeto enterprise"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
