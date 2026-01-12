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
  return (
    <section
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
      id="skills"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-base max-w-3xl mb-12"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          I architect scalable applications using a modern and complete stack, combining clean code, DevOps practices, and product thinking.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <skill.icon className="text-green-500 mt-1 flex-shrink-0" size={28} />
              <div>
                <h3 className="text-lg font-bold">{skill.title}</h3>
                <p className="text-base text-muted-foreground leading-snug">
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
