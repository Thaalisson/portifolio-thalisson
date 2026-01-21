import { motion } from "framer-motion";

export default function AppCard({ title, description, icon, delay = 0, link }) {
  const clickable = Boolean(link);

  const CardContent = (
    <motion.div
      className="
        group rounded-2xl p-6 w-full h-full flex flex-col justify-between
        max-w-xs bg-card/80 text-foreground border border-border
        shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 ease-snappy
        hover:-translate-y-1 hover:scale-[1.02] min-h-[320px]
      "
      role={clickable ? "link" : "presentation"}
      style={{ cursor: clickable ? "pointer" : "default" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      <div>
        <div className="text-4xl mb-4 text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      </div>

      <div
        className="text-sm inline-block px-4 py-2 rounded-md font-semibold
        bg-primary/10 text-primary group-hover:bg-primary/20 transition self-start mt-auto"
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
      className="w-full max-w-xs h-full"
    >
      {CardContent}
    </a>
  ) : (
    <div className="w-full max-w-xs h-full" aria-disabled="true">
      {CardContent}
    </div>
  );
}
