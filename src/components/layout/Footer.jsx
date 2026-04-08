import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Developers", to: "/" },
    { label: "Job Board", to: "/jobs" },
    { label: "Hackathons", to: "/hackathons" },
    { label: "Analytics", to: "/charts" },
  ],
  Resources: [
    { label: "Blog", to: "/blogs" },
    { label: "Badges", to: "/badges" },
    { label: "Testimonials", to: "/testimonials" },
    { label: "Services", to: "/services" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Privacy Policy", to: "/about" },
    { label: "Terms of Service", to: "/about" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold tracking-tight">DevConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              The premier marketplace connecting companies with elite, vetted developers worldwide. Find your next hire in minutes, not months.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 mt-10 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
