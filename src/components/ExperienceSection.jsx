import {
  Braces,
  Code,
  Database,
  GitBranch,
  FileCode,
  TerminalSquare,
  Settings2,
  LayoutDashboard,
  Layers,
  ClipboardList,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const skills = [
  {
    icon: Braces,
    title: ".NET & C#",
    description:
      ".NET 8 / Core / Framework, MVC, Minimal APIs, DI, Background Services, EF Core",
  },
  {
    icon: Code,
    title: "Classic ASP / Web API",
    description:
      "Classic ASP (VBScript), ASP.NET Web API 2, RESTful APIs, Swagger, JSON serialization",
  },
  {
    icon: Layers,
    title: "Architecture & Patterns",
    description:
      "Modular Monolith, DDD Light, CQRS, Clean Arch, Multi-Tenant, Multi-DB",
  },
  {
    icon: Database,
    title: "Databases",
    description:
      "SQL Server (T-SQL), PostgreSQL, MySql, Stored Procedures, LINQ, EF Migrations",
  },
  {
    icon: FileCode,
    title: "Frontend",
    description:
      "React.js (Hooks, Context, Redux), Tailwind CSS, Framer Motion, Responsive UI, SPA with APIs",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description:
      "GitHub, GitFlow, Bitbucket, AWS CodeCommit, Team Foundation Server (TFS)",
  },
  {
    icon: TerminalSquare,
    title: "Languages",
    description:
      "C# (expert), JavaScript, Python 2.7/3.x, VB6 (legacy), scripting & automation",
  },
  {
    icon: Settings2,
    title: "IDEs / Tools",
    description:
      "Visual Studio 2022/2019, VS Code, GitLens, Postman, Swagger UI",
  },
  {
    icon: ClipboardList,
    title: "Agile & PM",
    description:
      "Scrum, Kanban, Jira, cross-functional team coordination",
  },
  {
    icon: LayoutDashboard,
    title: "Domain Knowledge / CRM",
    description:
      "Billing, Scheduling, Credit Recovery, JSON orchestration, AppBundle engine, white-label arch",
  },
  {
    icon: UserCheck,
    title: "Soft Skills",
    description:
      "Tech Leadership, Mentorship, Systemic Thinking, Autonomy, Problem Solving, Product Vision",
  },
];

export default function SkillsGridSection() {
  const { t, language } = useLanguage();

  return (
    <section
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
      id="skills"
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
            {language === "en" ? "Stack" : "Stack"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-primary">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-base mt-3 max-w-3xl">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <skill.icon className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-base font-bold mb-1 text-primary">
                  {skill.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
