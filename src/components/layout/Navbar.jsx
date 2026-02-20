import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
  { to: "/blogs", label: "Blogs" },
  { to: "/recommended", label: "Recommended" },
  { to: "/services", label: "Services"},
  { to: "/special-needs-developers", label: "Special Needs" },
];

const authLinks = [
  { to: "/register", label: "Register" },
  { to: "/admin/login", label: "Login" },
];

const NavLink = ({ to, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-sm font-medium transition-colors hover:text-primary ${
      active ? "text-primary" : "text-muted-foreground"
    }`}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left: Brand + GitHub */}
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

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} label={label} active={pathname === to} />
          ))}
        </div>

        {/* Right: Auth links + ModeToggle (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {authLinks.map(({ to, label }) =>
              label === "Register" ? (
                <Button key={to} asChild variant="outline" size="sm">
                  <Link to={to}>{label}</Link>
                </Button>
              ) : (
                <Button key={to} asChild size="sm">
                  <Link to={to}>{label}</Link>
                </Button>
              ),
            )}
          </div>

          <ModeToggle />

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  Find<span className="text-primary">Developer</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 px-4 pt-4">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    label={label}
                    active={pathname === to}
                    onClick={() => setOpen(false)}
                  />
                ))}

                <div className="my-2 h-px bg-border" />

                {authLinks.map(({ to, label }) =>
                  label === "Register" ? (
                    <Button
                      key={to}
                      asChild
                      variant="outline"
                      className="w-full"
                    >
                      <Link to={to} onClick={() => setOpen(false)}>
                        {label}
                      </Link>
                    </Button>
                  ) : (
                    <Button key={to} asChild className="w-full">
                      <Link to={to} onClick={() => setOpen(false)}>
                        {label}
                      </Link>
                    </Button>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
