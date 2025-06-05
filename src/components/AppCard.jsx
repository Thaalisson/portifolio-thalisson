import { motion } from "framer-motion";

export default function AppCard({ title, description, icon, delay = 0, link }) {
  const CardContent = (
    <motion.div
      className="
        group rounded-2xl p-6 w-full max-w-xs cursor-pointer
        bg-card text-foreground border border-border
        shadow-md hover:shadow-xl transition-all duration-300 ease-snappy
        hover:-translate-y-1 hover:scale-[1.02]
      "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="text-4xl mb-4 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div
        className="text-sm inline-block px-4 py-2 rounded-md font-semibold
        bg-accent text-accent-foreground group-hover:brightness-110 transition"
      >
        {link ? "Visit Project" : "Try as Client"}
      </div>
    </motion.div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-xs"
    >
      {CardContent}
    </a>
  ) : (
    <div onClick={() => alert("No link provided.")}>{CardContent}</div>
  );
}
