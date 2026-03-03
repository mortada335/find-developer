import Section from "@/components/layout/Section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBadgeDetails } from "@/data/mock";
import {
  Mic,
  Rocket,
  BatteryFull,
  UsersRound,
  BarChart3,
  Star,
  Users,
} from "lucide-react";

// Map badge slugs to icons
const badgeIcons = {
  "soft-skills": Mic,
  "experience-validated": Rocket,
  "passion-developer": BatteryFull,
  "platform-contributor": UsersRound,
  "platform-marketer": BarChart3,
  "the-founder": Star,
};

const Badges = () => {
  return (
    <Section className="h-auto min-h-0">
      {/* Header */}
      <div className="w-full py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Developer Badges
        </h1>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto animate-slide-up">
          Earn badges to showcase your achievements and stand out on the
          platform
        </p>
      </div>

      {/* Badge Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {mockBadgeDetails.map((badge) => {
          const Icon = badgeIcons[badge.slug] || Star;
          return (
            <Card
              key={badge.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-lg card-animated"
              style={{
                borderColor: `${badge.color}30`,
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${badge.color}15`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: badge.color }}
                    />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base">{badge.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="mt-1 text-xs"
                      style={{
                        borderColor: `${badge.color}40`,
                        color: badge.color,
                        backgroundColor: `${badge.color}08`,
                      }}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {badge.developersCount}{" "}
                      {badge.developersCount === 1
                        ? "developer"
                        : "developers"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default Badges;
