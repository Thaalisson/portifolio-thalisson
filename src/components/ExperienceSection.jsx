import { FaCode, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section
      className="
        py-24 px-6
        bg-background text-foreground
        transition-colors duration-500
      "
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Professional Highlights
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            className="rounded-xl border border-border p-6 shadow-xl bg-card/50 backdrop-blur"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaCode className="text-xl text-accent-foreground" />
              <h3 className="text-xl font-semibold">Stack & Expertise</h3>
            </div>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>.NET (Framework 4.8+, Core 2.0, ASP.NET MVC)</li>
              <li>React.js, Tailwind CSS, JavaScript</li>
              <li>SQL Server, PostgreSQL, DuckDB</li>
              <li>REST APIs, Microservices, ADO.NET</li>
              <li>Docker, GitHub, CI/CD, AWS CodeCommit</li>
            </ul>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border p-6 shadow-xl bg-card/50 backdrop-blur"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaRocket className="text-xl text-accent-foreground" />
              <h3 className="text-xl font-semibold">Career Impact</h3>
            </div>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>+65% recovery via CRM (Claro BR)</li>
              <li>+34% billing efficiency (Jequiti)</li>
              <li>+40% scheduling optimization</li>
              <li>+25% faster deliveries using Agile (Scrum/Kanban)</li>
              <li>+30% issue resolution rate (cross-team support)</li>
            </ul>
          </motion.div>
        </div>

        <motion.p
          className="mt-16 text-center text-sm italic text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Passionate about building scalable, efficient systems and learning new technologies.
        </motion.p>
      </div>
    </section>
  );
}
