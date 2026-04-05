import { motion } from "framer-motion";
import { Sparkles, Code2, ChevronDown } from "lucide-react";

const HeroSection = ({ badge, title, subtitle }) => {
  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center items-center py-20 lg:py-32 background-gradient" style={{ minHeight: '80vh' }}>
      
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-float" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-60 animate-float" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        {/* Badge Pill */}
        {badge && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 glass px-4 py-2 rounded-full border border-primary/30"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight max-w-4xl leading-[1.1]"
        >
          {title.split('developer').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i !== arr.length - 1 && (
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                  developer
                </span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl font-light"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-muted-foreground animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
          <ChevronDown className="h-5 w-5 opacity-75" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
