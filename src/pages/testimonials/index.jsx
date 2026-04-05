import { mockTestimonials } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <>
      <HeroSection
        badge="Testimonials"
        title="What our clients say about DevConnect"
        subtitle="Hear from companies who've built world-class teams through our platform."
      />

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full glass hover:border-primary/30 transition-all">
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="h-8 w-8 text-primary/30 mb-4 shrink-0" />

                  <p className="text-foreground/90 leading-relaxed flex-1 text-base italic">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-1 mt-6 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full border border-border/50"
                    />
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonials;
