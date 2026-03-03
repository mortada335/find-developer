import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Section from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BadgeChip from "@/components/developer/BadgeChip";
import { mockDevelopers } from "@/data/mock";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  Clock,
  FileText,
  ExternalLink,
  Quote,
  Tag,
  Box,
} from "lucide-react";

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
            className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
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
    availabilityType,
    location,
    phone,
    email,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    badges = [],
    projects = [],
    recommendations = [],
  } = developer;

  return (
    <Section className="h-auto min-h-0">
      <div className="w-full max-w-4xl mx-auto py-8 space-y-6">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to developers
          </Link>
        </Button>

        {/* Main Profile Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-purple-500/30 shrink-0">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
                <p className="text-lg text-muted-foreground">{jobTitle}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {location}
                    </span>
                  )}
                  {experienceYears != null && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {experienceYears} years experience
                    </span>
                  )}
                  {availabilityType && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {availabilityType}
                    </Badge>
                  )}
                </div>

                {/* Badges */}
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {badges.map((badge) => (
                      <BadgeChip key={badge} badgeSlug={badge} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6 space-y-6">
            {/* Contact Links */}
            <div className="flex flex-wrap gap-3">
              {email && (
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${email}`}>
                    <Mail className="h-4 w-4 mr-1.5" />
                    Email
                  </a>
                </Button>
              )}
              {phone && (
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${phone}`}>
                    <Phone className="h-4 w-4 mr-1.5" />
                    {phone}
                  </a>
                </Button>
              )}
              {portfolioUrl && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4 mr-1.5" />
                    Portfolio
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
                    GitHub
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

            {/* Salary */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>Expected Salary: Offer by HR only</span>
            </div>

            {/* Bio */}
            {bio && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  About
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Tag className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-purple-500/5 border-purple-500/20 text-purple-700 dark:text-purple-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Projects */}
        {projects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Box className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project, i) => (
                <Card key={i} className="border-dashed">
                  <CardContent className="pt-6 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium">{project.title}</h4>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 text-sm shrink-0"
                        >
                          Visit
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Quote className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, i) => (
                <Card
                  key={i}
                  className="border-dashed bg-muted/30 dark:bg-muted/10"
                >
                  <CardContent className="pt-6 space-y-3">
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
            </CardContent>
          </Card>
        )}

        {/* Download CV (mock) */}
        <Card>
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Download CV</h3>
              <p className="text-sm text-muted-foreground">
                Get the full resume for {name}
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Download CV
            </Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default DeveloperProfile;
