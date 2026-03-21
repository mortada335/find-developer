import { useState } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import Section from "@/components/layout/Section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      // Redirect to intended page or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section className="h-auto min-h-0">
      <div className="w-full max-w-md mx-auto py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Login to access your developer dashboard
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
              <LogIn className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error */}
              {error && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => updateField("remember", e.target.checked)}
                    className="rounded border-input"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Login;
