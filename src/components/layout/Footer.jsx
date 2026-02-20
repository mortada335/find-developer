import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Donation */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            If You find this platform useful, you can support us by sponsoring
            us or donating to us. Qi Card Number is{" "}
            <span className="font-semibold text-foreground">5862997060</span>
          </p>
          <p className="mt-1">
            We will use the money to improve by marketing the platform and add
            new features.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-lg font-bold tracking-tight">
              Find<span className="text-primary">Developer</span>
            </Link>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ht3aa/find-developer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/about"
              className="hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/charts"
              className="hover:text-foreground transition-colors"
            >
              Charts
            </Link>
            <Link
              to="/badges"
              className="hover:text-foreground transition-colors"
            >
              Badges
            </Link>
            <Link
              to="/plans"
              className="hover:text-foreground transition-colors"
            >
              Plans
            </Link>
            <Link
              to="/services"
              className="hover:text-foreground transition-colors"
            >
              Services
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 FindDeveloper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
