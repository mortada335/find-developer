import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, Menu, User, LogOut } from "lucide-react";
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

const navLinks = [
  { to: "/blogs", label: "Blogs" },
  { to: "/recommended", label: "Recommended" },
  { to: "/services", label: "Services" },
  { to: "/special-needs-developers", label: "Special Needs" },
];

const NavLink = ({ to, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-sm font-medium transition-colors hover:text-primary nav-link-animated ${
      active ? "text-primary" : "text-muted-foreground"
    }`}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left: Brand + GitHub */}
        <div className="flex items-center gap-3">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Dev<span className="text-primary">Connect</span>
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com"
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

        {/* Right: Auth + ModeToggle (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                >
                  <div className="h-7 w-7 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="max-w-[120px] truncate font-medium text-foreground">
                    {user?.name}
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-animated text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="btn-animated">
                  <Link to="/register">Register</Link>
                </Button>
                <Button asChild size="sm" className="btn-glow">
                  <Link to="/admin/login">Login</Link>
                </Button>
              </>
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
                  Dev<span className="text-primary">Connect</span>
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

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-7 w-7 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="font-medium truncate">
                        {user?.name}
                      </span>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full btn-animated"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full btn-animated">
                      <Link to="/register" onClick={() => setOpen(false)}>
                        Register
                      </Link>
                    </Button>
                    <Button asChild className="w-full btn-glow">
                      <Link to="/admin/login" onClick={() => setOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </>
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
