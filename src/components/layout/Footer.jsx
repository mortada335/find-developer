import { Link } from "react-router-dom";
import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/50">
      <div className="max-w-[1440px] mx-auto px-6 py-8 space-y-6">
        {/* Top: Logo + Nav Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-lg font-bold tracking-tight">
              Dev<span className="text-primary">Connect</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-foreground transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              to="/blogs"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/badges"
              className="hover:text-foreground transition-colors"
            >
              Badges
            </Link>
            <Link
              to="/hackathons"
              className="hover:text-foreground transition-colors"
            >
              Hackathons
            </Link>
            <a
              href="mailto:mortadaahmad56@gmail.com?subject=Support"
              className="hover:text-foreground transition-colors"
            >
              Support
            </a>
            <Link
              to="/admin/login"
              className="hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="hover:text-foreground transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Support Us Section — */}
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <span className="text-amber-500 font-semibold">Support us</span>
          </div>
          <p className="text-sm text-muted-foreground flex-1 text-center sm:text-left">
            Love what we&apos;re building? Help us keep DevConnect free and growing. Every
            sponsorship or donation makes a real difference — thank you for believing in our mission.
          </p>
          <div className="shrink-0 px-4 py-2 border border-border rounded font-mono text-sm">
            Qi card: <span className="font-bold">6896338032</span>
          </div>
        </div>

        {/* Bottom: copyright + social icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © 2026 DevConnect. All rights reserved. Support:{" "}
            <a href="mailto:mortadaahmad56@gmail.com" className="hover:text-foreground transition-colors font-medium">
              mortadaahmad56@gmail.com
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mortada335"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mortada-ahmad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://t.me/MortadaAhmedDev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Telegram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
