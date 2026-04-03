import { Search, MessageSquare, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse our curated pool of vetted developers. Filter by skills, experience, location, and availability to find your perfect match.",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    icon: MessageSquare,
    title: "Connect",
    description: "Send messages directly to developers. Review detailed profiles, endorsements, project portfolios, and proven track records.",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: Handshake,
    title: "Hire",
    description: "Found the right fit? Initiate the hiring process seamlessly. From contract to full-time, we support every engagement model.",
    color: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Hire in three simple steps
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border/50 z-0" />
              )}

              <div className={`relative z-10 mx-auto w-20 h-20 rounded-2xl flex items-center justify-center border ${step.color} mb-6 transition-transform group-hover:scale-110`}>
                <step.icon className="h-8 w-8" />
              </div>

              <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                Step {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
