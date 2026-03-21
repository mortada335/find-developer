import Section from "@/components/layout/Section";
import HeroSection from "@/components/layout/HeroSection";
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
    <>
      <HeroSection
        badge="Badge catalog"
        title="Explore all badges"
        subtitle="Badges represent skills, achievements, and certifications earned by our developers. Browse the full catalog below."
      />
      <Section className="h-auto min-h-0">

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
    </>
  );
};

export default Badges;
