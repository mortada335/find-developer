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
} from "lucide-react";
import BadgeChip from "./BadgeChip";

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
  } = developer;

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-purple-400/30 card-animated">
      {/* ── Header: Avatar + Name (fixed height) ── */}
      <CardHeader className="pb-0 shrink-0">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Link to={`/developers/${slug}`} className="shrink-0">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-purple-500/50 transition-colors">
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

          {/* Name + Job Title */}
          <div className="flex-1 min-w-0">
            <Link to={`/developers/${slug}`}>
              <CardTitle className="text-base hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate">
                {name}
              </CardTitle>
            </Link>
            <p className="text-sm text-muted-foreground mt-0.5 truncate">
              {jobTitle}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* ── Content: grows to fill available space ── */}
      <CardContent className="space-y-3 flex-1">
        {/* Phone */}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            {phone}
          </a>
        )}

        {/* Salary — HR only */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Offer by HR only</span>
        </Link>

        {/* Bio — fixed 3-line clamp */}
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
              className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline"
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

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 min-h-[1.5rem]">
          {badges.map((badge) => (
            <BadgeChip key={badge} badgeSlug={badge} />
          ))}
        </div>
      </CardContent>

      {/* ── Footer: always pinned to bottom ── */}
      <CardFooter className="flex-col gap-2 shrink-0 mt-auto">
        <Button
          asChild
          variant="outline"
          className="w-full btn-animated dark:border-purple-500/30 dark:hover:bg-purple-500/10 dark:hover:text-purple-400 transition-all"
        >
          <Link to={`/developers/${slug}`}>View Full Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeveloperCard;
