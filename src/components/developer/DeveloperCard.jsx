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
  Phone,
  Mail,
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

const DeveloperCard = ({ developer }) => {
  const {
    slug,
    name,
    avatar,
    jobTitle,
    bio,
    phone,
    email,
    badges = [],
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    isRecommended,
    availabilityType,
    availability,
    experience,
    location,
    recommendations = [],
  } = developer;

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-amber-500/30 dark:hover:border-amber-400/30 card-animated relative">
      {/* Top colored line accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

      {/* ── Header: Badge Icons Row + Recommended ── */}
      <CardHeader className="pb-0 shrink-0 pt-5">
        <div className="flex items-start justify-between mb-3">
          {/* Badge Icons Row */}
          <div className="flex items-center gap-1.5">
            {badges.map((badgeSlug) => {
              const config = badgeConfig[badgeSlug];
              if (!config) return null;
              const IconComp = config.icon;
              return (
                <div
                  key={badgeSlug}
                  className="h-8 w-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${config.color}20` }}
                  title={badgeSlug.replace(/-/g, ' ')}
                >
                  <IconComp className="h-4 w-4" style={{ color: config.color }} />
                </div>
              );
            })}
            {badges.length === 0 && (
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-slate-500/10">
                <Code2 className="h-4 w-4 text-slate-400" />
              </div>
            )}
          </div>

          {/* Recommended Label */}
          {isRecommended && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-medium text-amber-500">Recommended</span>
            </div>
          )}
        </div>

        {/* Avatar + Name */}
        <div className="flex items-start gap-4">
          <Link to={`/developers/${slug}`} className="shrink-0">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-colors">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-7 w-7 text-muted-foreground" />
              )}
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link to={`/developers/${slug}`}>
              <CardTitle className="text-base hover:text-amber-500 dark:hover:text-amber-400 transition-colors truncate">
                {name}
              </CardTitle>
            </Link>
            <span className="inline-block text-xs mt-1 px-2 py-0.5 rounded border border-border text-muted-foreground">
              {jobTitle}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* ── Content ── */}
      <CardContent className="space-y-3 flex-1">
        {/* Availability Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {availability && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {availability}
            </span>
          )}
          {availabilityType && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {availabilityType}
            </span>
          )}
        </div>

        {/* Experience, Location & Recommendations */}
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          {experience && (
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              {experience} years experience
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
          )}
          {(recommendations.length > 0 || isRecommended) && (
            <span className="inline-flex items-center gap-1.5 text-amber-500">
              <ThumbsUp className="h-3.5 w-3.5" />
              {recommendations.length + (isRecommended ? 1 : 0)} Recommendation{recommendations.length + (isRecommended ? 1 : 0) !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
          {bio || "\u00A0"}
        </p>

        {/* Links Row */}
        <div className="flex items-center gap-2 flex-wrap min-h-[1.25rem]">
          {portfolioUrl && (
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400 hover:underline"
            >
              <Globe className="h-3 w-3" />
              Portfolio
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-3 w-3" />
              LinkedIn
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-3 w-3" />
              Email
            </a>
          )}
        </div>
      </CardContent>

      {/* ── Footer ── */}
      <CardFooter className="flex-col gap-2 shrink-0 mt-auto">
        <Button
          asChild
          variant="outline"
          className="w-full btn-animated dark:border-amber-500/30 dark:hover:bg-amber-500/10 dark:hover:text-amber-400 transition-all"
        >
          <Link to={`/developers/${slug}`}>View Full Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeveloperCard;
