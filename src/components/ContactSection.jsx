import { Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold tracking-tight">{t("contact.title")}</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <Mail className="text-primary" />
              <div className="text-sm">
                <div className="uppercase tracking-[0.2em] text-[0.7rem] text-muted-foreground">
                  {t("contact.emailLabel")}
                </div>
                <a className="text-base hover:text-primary transition" href={`mailto:${t("contact.emailValue")}`}>
                  {t("contact.emailValue")}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-primary" />
              <div className="text-sm">
                <div className="uppercase tracking-[0.2em] text-[0.7rem] text-muted-foreground">
                  {t("contact.locationLabel")}
                </div>
                <span className="text-base">{t("contact.locationValue")}</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-card border border-border rounded-xl p-6 space-y-4 shadow-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert(t("contact.form.success"));
            }}
          >
            <input
              type="text"
              placeholder={t("contact.form.name")}
              className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              placeholder={t("contact.form.email")}
              className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <textarea
              placeholder={t("contact.form.message")}
              className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition"
            >
              <Send size={16} />
              {t("contact.form.button")}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
