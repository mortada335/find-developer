import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  MapPin,
  ThumbsUp,
  Star,
  Mic,
  Rocket,
  BatteryFull,
  UsersRound,
  BarChart3,
  Code2,
  DollarSign,
} from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import { sanitizeUrl } from "@/lib/security";

// Badge icon config
const badgeConfig = {
  "soft-skills": { icon: Mic, color: "#0ea5e9" },
  "experience-validated": { icon: Rocket, color: "#10b981" },
  "passion-developer": { icon: BatteryFull, color: "#8b5cf6" },
  "platform-contributor": { icon: UsersRound, color: "#06b6d4" },
  "platform-marketer": { icon: BarChart3, color: "#6366f1" },
  "the-founder": { icon: Star, color: "#14b8a6" },
};

const DeveloperCard = ({ developer, selectionControl }) => {
  const {
    id,
    slug,
    name,
    avatar,
    jobTitle,
    bio,
    badges = [],
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    isRecommended,
    availabilityType,
    availability,
    experience,
    experienceYears,
    location,
    hourlyRate,
    recommendations = [],
    endorsements = {},
  } = developer;

  const expYears = experience || experienceYears;
  const topEndorsements = Object.entries(endorsements)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border hover:border-primary/40 glass relative">
      {/* Top line accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Controls */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {selectionControl}
        </div>
        <div className="pointer-events-auto">
          <BookmarkButton developerId={id} />
        </div>
      </div>

      {/* Header */}
      <CardHeader className="pb-0 shrink-0 pt-12">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
          {/* Badge Icons Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {badges.map((badgeSlug) => {
              const config = badgeConfig[badgeSlug];
              if (!config) return null;
              const IconComp = config.icon;
              return (
                <div
                  key={badgeSlug}
                  className="h-7 w-7 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: `${config.color}15`, border: `1px solid ${config.color}30` }}
                  title={badgeSlug.replace(/-/g, " ")}
                >
                  <IconComp className="h-3.5 w-3.5" style={{ color: config.color }} />
                </div>
              );
            })}
            {badges.length === 0 && (
              <div className="h-7 w-7 rounded-lg flex items-center justify-center bg-slate-500/10 border border-slate-500/20">
                <Code2 className="h-3 w-3 text-slate-400" />
              </div>
            )}
          </div>

          {/* Recommended */}
          {isRecommended && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30">
              <Star className="h-2.5 w-2.5 text-blue-500 fill-blue-500" />
              <span className="text-[9px] font-bold tracking-wide text-blue-500 uppercase">Top</span>
            </div>
          )}
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <Link to={`/developers/${slug}`} className="shrink-0 relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors" />
            <div className="relative h-14 w-14 rounded-full bg-card flex items-center justify-center overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors z-10 shadow-sm">
              {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-7 w-7 text-muted-foreground" />
              )}
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link to={`/developers/${slug}`}>
              <CardTitle className="text-lg font-bold hover:text-primary transition-colors truncate">
                {name}
              </CardTitle>
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                {jobTitle}
              </span>
              {hourlyRate && (
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
                  <DollarSign className="h-3 w-3" />{hourlyRate}/hr
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 flex-1 mt-3">
        {/* Availability */}
        <div className="flex items-center gap-2 flex-wrap">
          {availability && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              {availability}
            </span>
          )}
          {availabilityType && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              {availabilityType}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-sm text-foreground/80">
          {expYears && (
            <span className="inline-flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-primary opacity-80" />
              {expYears} years experience
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary opacity-80" />
              {location}
            </span>
          )}
          {(recommendations.length > 0 || isRecommended) && (
            <span className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400 font-medium">
              <ThumbsUp className="h-3.5 w-3.5" />
              {recommendations.length + (isRecommended ? 1 : 0)} Recommendations
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-12">
          {bio || "\u00A0"}
        </p>

        {/* Top Endorsements */}
        {topEndorsements.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {topEndorsements.map(([skill, count]) => (
              <span key={skill} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/50">
                {skill} <span className="text-primary font-bold">+{count}</span>
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 flex-wrap min-h-6 pt-1">
          {portfolioUrl && (
            <a href={sanitizeUrl(portfolioUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              <Globe className="h-3 w-3" /> Portfolio
            </a>
          )}
          {githubUrl && (
            <a href={sanitizeUrl(githubUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-3 w-3" /> GitHub
            </a>
          )}
          {linkedinUrl && (
            <a href={sanitizeUrl(linkedinUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-3 w-3" /> LinkedIn
            </a>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex-col gap-2 shrink-0 mt-auto pt-4 border-t border-border/50">
        <Button asChild variant="ghost" className="w-full bg-primary/5 hover:bg-primary/20 text-primary transition-all font-semibold rounded-xl">
          <Link to={`/developers/${slug}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeveloperCard;
