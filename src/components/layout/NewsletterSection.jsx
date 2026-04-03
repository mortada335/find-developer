import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const { subscribeNewsletter, newsletter } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    subscribeNewsletter(email);
  };

  if (newsletter.subscribed) {
    return (
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center glass rounded-3xl p-12 border border-primary/20"
        >
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You're subscribed!</h3>
          <p className="text-muted-foreground">
            We'll send the latest developer news and platform updates to{" "}
            <span className="font-medium text-foreground">{newsletter.email}</span>
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 background-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Stay in the loop
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Get weekly curated developer profiles, job listings, and platform updates delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="h-12 rounded-xl bg-background/80 backdrop-blur-sm text-base border-border/50"
            />
            {error && <p className="text-destructive text-xs mt-1 text-left">{error}</p>}
          </div>
          <Button
            type="submit"
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg shadow-primary/20"
          >
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
