import { Mail, MapPin, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="contact"
      className="py-28 px-6 bg-background text-foreground transition-colors duration-500"
    >
      <div className="max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase font-semibold text-primary mb-4"
        >
          {language === "en" ? "Contact" : "Contato"}
        </motion.p>

        {/* Title — inline style bypasses global h2 color conflict */}
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-5"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {t("contact.title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-12"
        >
          {t("contact.subtitle")}
        </motion.p>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="rounded-2xl border border-border/50 bg-primary/[0.03] px-8 py-10 mb-10"
        >
          <a
            href={`mailto:${t("contact.emailValue")}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-85"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Send size={13} />
            {language === "en" ? "Send Email" : "Enviar Email"}
          </a>
        </motion.div>

        {/* Location + LinkedIn */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary shrink-0" />
            <span>{t("contact.locationValue")}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border/60" />
          <a
            href="https://linkedin.com/in/thalisson"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
          >
            <Linkedin size={14} className="text-primary shrink-0" />
            linkedin.com/in/thalisson
          </a>
        </motion.div>
      </div>
    </section>
  );
}
