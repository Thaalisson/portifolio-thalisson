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
    company: "Opid Technologies",
    icon: FaCubes,
    metric: "↓ 50% layout time · ↓ 35% rework",
    description: {
      en: "JSON-driven visual page builder using C#, ASP.NET Core, React, React Native/Expo, TypeScript, and reusable UI components. Clean Architecture and domain modules on the backend, Claude-assisted Markdown documentation, and automated tests with complete simulated database scenarios.",
      pt: "Builder visual de páginas orientado a JSON com C#, ASP.NET Core, React, React Native/Expo, TypeScript e componentes de UI reutilizáveis. Clean Architecture e módulos de domínio no backend, documentação em Markdown assistida por Claude, e testes automatizados com cenários completos de banco de dados simulados.",
    },
    tech: ["React.js", "React Native", "TypeScript", ".NET Core", "Clean Arch"],
    type: "enterprise",
  },
  {
    id: "crm",
    title: { en: "CRM System", pt: "Sistema CRM" },
    company: "Claro · MFMti",
    icon: FaUsers,
    metric: "↑ 65% recovery rate",
    description: {
      en: "Enterprise CRM for credit recovery at Claro (América Móvil) — one of Latin America's largest carriers. CNAB billing integrations, scheduling flows, and recovery pipelines processing millions of records. Delivered in 3 months.",
      pt: "CRM enterprise para recuperação de crédito na Claro (América Móvil) — uma das maiores operadoras da América Latina. Integrações de cobrança CNAB, fluxos de agendamento e pipelines de recuperação processando milhões de registros. Entregue em 3 meses.",
    },
    tech: ["C#", "ASP.NET", "SQL Server", "CNAB", "VBScript"],
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
    title: "SHIVA Mental Health",
    company: "DriveData (Freelance)",
    icon: FaHeartbeat,
    metric: { en: "Multi-tenant white-label SaaS · NR-01", pt: "SaaS multi-tenant white-label · NR-01" },
    description: {
      en: "Multi-tenant, white-label SaaS platform for workplace psychosocial risk management aligned with Brazil's NR-01 regulation. Executive risk dashboards, assessment campaigns, training paths, and an employee portal, with i18n in Portuguese, English, and Italian. Structured the React/TypeScript frontend using Vertical Slice Architecture and contributed to the n8n-to-.NET API migration, standardized API contracts, JWT identity flows, CI/CD, and LLM-generated assessment insights.",
      pt: "Plataforma SaaS multi-tenant e white-label para gestão de riscos psicossociais no trabalho, alinhada à NR-01. Dashboards executivos de risco, campanhas de avaliação, trilhas de treinamento e portal do colaborador, com internacionalização em Português, Inglês e Italiano. Estruturou o frontend React/TypeScript com Vertical Slice Architecture e contribuiu para a migração incremental de API n8n para .NET, contratos de API padronizados, fluxos de identidade JWT, CI/CD e insights de avaliação gerados por LLM.",
    },
    tech: ["React", "TypeScript", ".NET", "n8n", "JWT", "CI/CD"],
    link: "https://shivaapp.com.br",
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
