import { motion } from "framer-motion";

const logos = [
  { name: "NovaTech", color: "#6366f1" },
  { name: "ScaleStream", color: "#10b981" },
  { name: "CloudForge", color: "#0ea5e9" },
  { name: "LaunchPad", color: "#8b5cf6" },
  { name: "HealthFirst", color: "#f43f5e" },
  { name: "LangBridge", color: "#ec4899" },
  { name: "Orbital", color: "#f97316" },
  { name: "FinBridge", color: "#14b8a6" },
];

const TrustedBySection = () => {
  return (
    <section className="py-16 px-4 border-y border-border/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map(({ name, color }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: color }}
              >
                {name.charAt(0)}
              </div>
              <span className="text-lg font-semibold text-muted-foreground">{name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedBySection;
