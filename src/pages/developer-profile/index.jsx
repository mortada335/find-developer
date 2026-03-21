import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockDevelopers } from "@/data/mock";
import {
  ArrowLeft,
  User,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  MessageCircle,
  ThumbsUp,
  Mic,
  Rocket,
  BatteryFull,
  UsersRound,
  BarChart3,
  Star,
} from "lucide-react";

// Badge icon config — matching find-developer.com colored icons row
const badgeConfig = {
  "soft-skills": { icon: Mic, color: "#3b82f6" },
  "experience-validated": { icon: Rocket, color: "#22c55e" },
  "passion-developer": { icon: BatteryFull, color: "#eab308" },
  "platform-contributor": { icon: UsersRound, color: "#a855f7" },
  "platform-marketer": { icon: BarChart3, color: "#ec4899" },
  "the-founder": { icon: Star, color: "#f97316" },
};

const DeveloperProfile = () => {
  const { slug } = useParams();

  const developer = useMemo(() => {
    return mockDevelopers.find((dev) => dev.slug === slug);
  }, [slug]);

  if (!developer) {
    return (
      <Section className="h-auto min-h-0">
        <div className="w-full py-24 text-center space-y-4">
          <h1 className="text-2xl font-bold">Developer Not Found</h1>
          <p className="text-muted-foreground">
            The developer profile you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            asChild
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            <Link to="/">Browse Developers</Link>
          </Button>
        </div>
      </Section>
    );
  }

  const {
    name,
    avatar,
    jobTitle,
    bio,
    skills = [],
    experienceYears,
    experience,
    availability,
    availabilityType,
    location,
    email,
    githubUrl,
    linkedinUrl,
    badges = [],
    recommendations = [],
    isRecommended,
  } = developer;

  const expDisplay = experienceYears ?? experience ?? null;
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";
  const recCount = recommendations.length + (isRecommended ? 1 : 0);

  return (
    <Section className="h-auto min-h-0">
      <div className="w-full max-w-5xl mx-auto py-8 space-y-6">
        {/* Back to Search */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>

        {/* ── Profile Header ── */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar with initials fallback */}
          <div className="h-20 w-20 rounded-full bg-amber-500/20 flex items-center justify-center overflow-hidden shrink-0 text-2xl font-bold text-amber-500">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <p className="text-lg text-muted-foreground">{jobTitle}</p>

            {/* Badge Icons */}
            {badges.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {badges.map((badgeSlug) => {
                  const config = badgeConfig[badgeSlug];
                  if (!config) return null;
                  const IconComp = config.icon;
                  return (
                    <div
                      key={badgeSlug}
                      className="h-8 w-8 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: `${config.color}20` }}
                      title={badgeSlug.replace(/-/g, " ")}
                    >
                      <IconComp
                        className="h-4 w-4"
                        style={{ color: config.color }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <Card className="border-border/50">
          <CardContent className="py-4 px-6">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {expDisplay != null && (
                <span className="inline-flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{expDisplay} Years Experience</span>
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{location} Location</span>
                </span>
              )}
              {availability && (
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-green-500 font-medium">
                    {availability} Status
                  </span>
                </span>
              )}
              {recCount > 0 && (
                <span className="inline-flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {recCount} Recommendation{recCount !== 1 ? "s" : ""}
                  </span>
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (left, 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            {bio && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold">About</h2>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </div>
            )}

            {/* Get In Touch */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Get In Touch</h2>
              <div className="flex flex-wrap gap-3">
                {email && (
                  <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${email}`}>
                      <Mail className="h-4 w-4 mr-1.5" />
                      Send Email
                    </a>
                  </Button>
                )}
                {githubUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1.5" />
                      GitHub Profile
                    </a>
                  </Button>
                )}
                {linkedinUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 mr-1.5" />
                      LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Skills & Technologies */}
            {skills.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-amber-500 hover:bg-amber-600 text-black border-amber-500"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">
                Recommendations ({recCount})
              </h2>
              {recommendations.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <Card
                      key={i}
                      className="border-dashed bg-muted/30 dark:bg-muted/10"
                    >
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <p className="text-sm italic text-muted-foreground">
                          &ldquo;{rec.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {rec.recommenderName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {rec.recommenderTitle}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Link
                  to="#"
                  className="text-amber-500 hover:underline text-sm"
                >
                  Login to Recommend
                </Link>
              )}
            </div>
          </div>

          {/* ── Quick Info Sidebar (right, 1/3) ── */}
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Quick Info
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Role</p>
                    <p className="font-semibold">{jobTitle}</p>
                  </div>
                  {expDisplay != null && (
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-semibold">{expDisplay} Years</p>
                    </div>
                  )}
                  {location && (
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-semibold">{location}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Availability</p>
                    <p className="font-semibold text-green-500">
                      {availability || availabilityType || "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {email && (
                    <Button
                      asChild
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      <a href={`mailto:${email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Now
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Login to Chat
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Recommend
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DeveloperProfile;
