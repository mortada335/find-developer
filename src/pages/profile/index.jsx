import { useState } from "react";
import { Navigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Briefcase,
  Phone,
  Globe,
  Github,
  Linkedin,
  Pencil,
  Save,
  X,
  Loader2,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sanitizeUrl } from "@/lib/security";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const startEditing = () => {
    setForm({
      name: user.name || "",
      jobTitle: user.jobTitle || "",
      phone: user.phone || "",
      bio: user.bio || "",
      linkedinUrl: user.linkedinUrl || "",
      githubUrl: user.githubUrl || "",
      portfolioUrl: user.portfolioUrl || "",
    });
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setForm({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      setEditing(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Section className="h-auto min-h-0">
      <div className="w-full max-w-3xl mx-auto py-12 md:py-16 space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-muted-foreground text-lg mt-3">
            Manage your developer profile
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden animate-slide-up">
          <CardHeader className="relative">
            {/* Purple gradient banner */}
            <div className="absolute inset-0 h-24 bg-linear-to-r from-purple-600/20 to-purple-800/20 dark:from-purple-400/10 dark:to-purple-600/10" />

            <div className="relative pt-8 flex flex-col sm:flex-row items-center sm:items-end gap-4">
              {/* Avatar */}
              <div className="h-20 w-20 rounded-full bg-purple-500/10 border-4 border-background flex items-center justify-center shadow-lg">
                <User className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-base flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Briefcase className="h-4 w-4" />
                  {user.jobTitle || "Developer"}
                </CardDescription>
              </div>

              {!editing && (
                <Button
                  variant="outline"
                  onClick={startEditing}
                  className="btn-animated gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email (read-only) */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  {editing ? (
                    <Input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="h-7 mt-0.5 text-sm"
                      placeholder="Your phone number"
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {user.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium">{memberSince}</p>
                </div>
              </div>

              {/* Job Title */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Job Title</p>
                  {editing ? (
                    <Input
                      value={form.jobTitle}
                      onChange={(e) => updateField("jobTitle", e.target.value)}
                      className="h-7 mt-0.5 text-sm"
                      placeholder="Your job title"
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {user.jobTitle || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Bio */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Bio
              </h3>
              {editing ? (
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-sm leading-relaxed">
                  {user.bio || "No bio provided yet."}
                </p>
              )}
            </div>

            <Separator />

            {/* Links */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Online Profiles
              </h3>
              <div className="space-y-3">
                {/* LinkedIn */}
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-blue-600 shrink-0" />
                  {editing ? (
                    <Input
                      value={form.linkedinUrl}
                      onChange={(e) =>
                        updateField("linkedinUrl", e.target.value)
                      }
                      className="text-sm"
                      placeholder="https://linkedin.com/in/..."
                    />
                  ) : user.linkedinUrl ? (
                    <a
                      href={sanitizeUrl(user.linkedinUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {user.linkedinUrl}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not linked
                    </span>
                  )}
                </div>

                {/* GitHub */}
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 shrink-0" />
                  {editing ? (
                    <Input
                      value={form.githubUrl}
                      onChange={(e) => updateField("githubUrl", e.target.value)}
                      className="text-sm"
                      placeholder="https://github.com/..."
                    />
                  ) : user.githubUrl ? (
                    <a
                      href={sanitizeUrl(user.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {user.githubUrl}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not linked
                    </span>
                  )}
                </div>

                {/* Portfolio */}
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-600 shrink-0" />
                  {editing ? (
                    <Input
                      value={form.portfolioUrl}
                      onChange={(e) =>
                        updateField("portfolioUrl", e.target.value)
                      }
                      className="text-sm"
                      placeholder="https://yourportfolio.com"
                    />
                  ) : user.portfolioUrl ? (
                    <a
                      href={sanitizeUrl(user.portfolioUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {user.portfolioUrl}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not linked
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge) => (
                      <Badge
                        key={badge}
                        className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Edit Actions */}
            {editing && (
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-animated bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelEditing}
                  className="btn-animated"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Profile;
