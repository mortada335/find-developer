import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import { CheckCircle, UserPlus } from "lucide-react";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    jobTitle: "",
    phone: "",
    bio: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
  });

  const jobTitles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "IT Support",
    "Data Analytics",
    "Scrum Master",
    "QA Engineer",
    "Software Engineer",
    "Solutions Architect",
    "Product Manager",
    "Technical Lead",
  ];

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section className="h-auto min-h-0">
        <div className="w-full max-w-lg mx-auto py-24 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Registration Successful!</h1>
          <p className="text-muted-foreground">
            Your profile has been submitted for review. You&apos;ll be notified
            once it&apos;s approved.
          </p>
          <Button
            asChild
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section className="h-auto min-h-0">
      <div className="w-full max-w-2xl mx-auto py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            Register as Developer
          </h1>
          <p className="text-muted-foreground text-lg mt-3">
            Join our platform and get discovered by clients and employers
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Developer Profile
            </CardTitle>
            <CardDescription>
              Fill in your details to create your developer profile
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      placeholder="e.g., John Doe"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password *</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Confirm Password *
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={form.passwordConfirm}
                      onChange={(e) =>
                        updateField("passwordConfirm", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title *</label>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={form.jobTitle}
                      onChange={(e) => updateField("jobTitle", e.target.value)}
                      required
                    >
                      <option value="">Select job title</option>
                      {jobTitles.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      placeholder="07XX XXXX XXX"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                    placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                    value={form.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              {/* Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Online Profiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn URL</label>
                    <Input
                      placeholder="https://linkedin.com/in/..."
                      value={form.linkedinUrl}
                      onChange={(e) =>
                        updateField("linkedinUrl", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <Input
                      placeholder="https://github.com/..."
                      value={form.githubUrl}
                      onChange={(e) => updateField("githubUrl", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio URL</label>
                  <Input
                    placeholder="https://yourportfolio.com"
                    value={form.portfolioUrl}
                    onChange={(e) =>
                      updateField("portfolioUrl", e.target.value)
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/admin/login"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Register;
