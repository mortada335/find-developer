import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, Menu, User, LogOut, Code2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Developers" },
  { to: "/jobs", label: "Jobs" },
  { to: "/hackathons", label: "Hackathons" },
  { to: "/blogs", label: "Blog" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/charts", label: "Analytics" },
];

const NavLinkDesktop = ({ to, label, active }) => (
  <Link
    to={to}
    className="relative px-3 py-1.5 text-sm font-medium transition-colors"
  >
    {active && (
      <motion.div
        layoutId="active-nav-pill"
        className="absolute inset-0 bg-primary/10 rounded-full"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
    <span className={`relative z-10 ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
      {label}
    </span>
  </Link>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 pointer-events-none flex justify-center">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`pointer-events-auto flex h-14 items-center justify-between px-5 w-full max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg shadow-black/5 dark:shadow-primary/5"
            : "bg-background/50 backdrop-blur-md border border-transparent"
        }`}
      >
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="text-base font-bold tracking-tight hidden sm:inline">
            DevConnect
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(({ to, label }) => (
            <NavLinkDesktop key={to} to={to} label={label} active={pathname === to} />
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Notification bell */}
                <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm px-2 py-1 hover:bg-muted rounded-full transition-colors"
                >
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <span className="max-w-[100px] truncate font-medium text-foreground">
                    {user?.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link to="/admin/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
            <div className="w-px h-4 bg-border mx-1" />
            <ModeToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <ModeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    DevConnect
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1 mt-8">
                  {navLinks.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`text-sm px-4 py-2.5 rounded-lg transition-colors ${pathname === to ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      {label}
                    </Link>
                  ))}

                  <div className="my-4 h-px bg-border/50" />

                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm px-4 py-2.5">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium truncate">{user?.name}</span>
                      </Link>
                      <Button variant="outline" className="mx-4 mt-2" onClick={() => { handleLogout(); setOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3 px-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/admin/login" onClick={() => setOpen(false)}>Sign In</Link>
                      </Button>
                      <Button asChild className="w-full bg-primary">
                        <Link to="/register" onClick={() => setOpen(false)}>Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
