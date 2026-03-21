import Section from "@/components/layout/Section";
import HeroSection from "@/components/layout/HeroSection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockHackathons } from "@/data/mock";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  ArrowRight,
} from "lucide-react";

const statusColors = {
  upcoming:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  active:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  completed:
    "bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20",
};

const statusLabels = {
  upcoming: "Upcoming",
  active: "Active Now",
  completed: "Completed",
};

const Hackathons = () => {
  return (
    <>
      <HeroSection
        badge="Hackathons"
        title="Hackathons"
        subtitle="Discover hackathons we've participated in or supported. Events, projects, and outcomes."
      />
      <Section className="h-auto min-h-0">

      {/* Summary Stats */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {mockHackathons.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total Hackathons
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-5 w-5 mx-auto text-amber-500 mb-2" />
            <p className="text-2xl font-bold text-amber-500">
              {mockHackathons.filter((h) => h.status === "upcoming").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-5 w-5 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold text-green-500">
              {mockHackathons.reduce(
                (sum, h) => sum + h.participantsCount,
                0
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total Participants
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {mockHackathons.filter((h) => h.status === "completed").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Hackathon Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {mockHackathons.map((hackathon) => (
          <Card
            key={hackathon.id}
            className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-purple-400/30 card-animated"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-lg">
                    {hackathon.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {hackathon.location}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 ${statusColors[hackathon.status]}`}
                >
                  {statusLabels[hackathon.status]}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {hackathon.description}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>
                  {new Date(hackathon.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  –{" "}
                  {new Date(hackathon.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Participants */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 shrink-0" />
                <span>
                  {hackathon.participantsCount} / {hackathon.maxParticipants}{" "}
                  participants
                </span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden ml-1">
                  <div
                    className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all"
                    style={{
                      width: `${(hackathon.participantsCount / hackathon.maxParticipants) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Prizes */}
              <div className="flex flex-wrap gap-1.5">
                {hackathon.prizes.map((prize) => (
                  <Badge
                    key={prize}
                    variant="outline"
                    className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  >
                    <Trophy className="h-3 w-3 mr-1" />
                    {prize}
                  </Badge>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {hackathon.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              {hackathon.status === "upcoming" ? (
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white btn-glow">
                  Register Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button variant="outline" className="w-full btn-animated">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
    </>
  );
};

export default Hackathons;
