import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BadgeChip from "./BadgeChip";
import { badgeInfo } from "@/data/mock";
import {
  X,
  User,
  Briefcase,
  MapPin,
  Clock,
  Globe,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const CompareModal = ({ developers, onClose }) => {
  if (!developers || developers.length < 2) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background border rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
          <h2 className="text-lg font-bold">
            Compare Developers ({developers.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Comparison Grid */}
        <div className="p-4 overflow-x-auto">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${developers.length}, minmax(220px, 1fr))`,
            }}
          >
            {developers.map((dev) => (
              <Card key={dev.id} className="overflow-hidden">
                <CardHeader className="pb-3 text-center">
                  {/* Avatar */}
                  <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-purple-500/30 mb-2">
                    {dev.avatar ? (
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-base">{dev.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{dev.jobTitle}</p>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  {/* Experience */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>{dev.experienceYears} years experience</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{dev.location}</span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4 shrink-0" />
                    <span className="capitalize">{dev.availabilityType}</span>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="font-medium mb-1.5">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {dev.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div>
                    <p className="font-medium mb-1.5">Badges</p>
                    <div className="flex flex-wrap gap-1">
                      {dev.badges.length > 0 ? (
                        dev.badges.map((badge) => (
                          <BadgeChip key={badge} badgeSlug={badge} />
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          No badges
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {dev.portfolioUrl && (
                      <a
                        href={dev.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <Globe className="h-3 w-3" />
                        Portfolio
                      </a>
                    )}
                    {dev.githubUrl && (
                      <a
                        href={dev.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Github className="h-3 w-3" />
                        GitHub
                      </a>
                    )}
                    {dev.linkedinUrl && (
                      <a
                        href={dev.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="h-3 w-3" />
                        LinkedIn
                      </a>
                    )}
                    {dev.email && (
                      <a
                        href={`mailto:${dev.email}`}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-3 w-3" />
                        Email
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
