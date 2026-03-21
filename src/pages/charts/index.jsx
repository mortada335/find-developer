import { useMemo } from "react";
import Section from "@/components/layout/Section";
import HeroSection from "@/components/layout/HeroSection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockChartData } from "@/data/mock";
import { MapPin, Clock, DollarSign, Briefcase, Users } from "lucide-react";

// Reusable horizontal bar chart
const HorizontalBarChart = ({ data, maxCount, colorClass = "bg-purple-600 dark:bg-purple-500" }) => {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground truncate mr-2">
              {item.label}
            </span>
            <span className="font-medium shrink-0">{item.count}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
              style={{
                width: `${(item.count / maxCount) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const Charts = () => {
  const {
    developersByLocation,
    developersByAvailabilityType,
    averageSalaryByExperience,
    developersByJobTitle,
  } = mockChartData;

  // Summary stats
  const totalDevelopers = useMemo(() => {
    return developersByLocation.reduce((sum, item) => sum + item.count, 0);
  }, [developersByLocation]);

  const topLocation = developersByLocation[0];
  const topJobTitle = developersByJobTitle[0];
  const topAvailability = developersByAvailabilityType[0];

  // Max values for bar scaling
  const maxLocation = Math.max(...developersByLocation.map((d) => d.count));
  const maxAvailability = Math.max(
    ...developersByAvailabilityType.map((d) => d.count)
  );
  const maxSalary = Math.max(
    ...averageSalaryByExperience.map((d) => d.salary)
  );
  const maxJobTitle = Math.max(...developersByJobTitle.map((d) => d.count));

  return (
    <>
      <HeroSection
        badge="Statistics"
        title="Developer charts"
        subtitle="Explore developer distribution by location, availability type, experience, and job title."
      />
      <Section className="h-auto min-h-0">

      <div className="w-full space-y-6 pb-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {totalDevelopers}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Total Developers
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {topLocation?.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Top Location
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Briefcase className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {topJobTitle?.label.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Top Job Title
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {topAvailability?.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Top Availability
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Developers by Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Developers by Location
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <HorizontalBarChart
                data={developersByLocation}
                maxCount={maxLocation}
              />
            </CardContent>
          </Card>

          {/* Developers by Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Developers by Availability Type
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <HorizontalBarChart
                data={developersByAvailabilityType}
                maxCount={maxAvailability}
                colorClass="bg-emerald-600 dark:bg-emerald-500"
              />
            </CardContent>
          </Card>

          {/* Average Salary by Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Average Salary by Experience (IQD)
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              {/* Vertical bar chart */}
              <div className="flex items-end gap-2 h-48">
                {averageSalaryByExperience.map((item) => (
                  <div
                    key={item.years}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {(item.salary / 1000000).toFixed(1)}M
                    </span>
                    <div
                      className="w-full bg-amber-500 dark:bg-amber-400 rounded-t transition-all duration-500 min-h-[4px]"
                      style={{
                        height: `${(item.salary / maxSalary) * 100}%`,
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {item.years}y
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Developers by Job Title */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Developers by Job Title
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <HorizontalBarChart
                data={developersByJobTitle}
                maxCount={maxJobTitle}
                colorClass="bg-blue-600 dark:bg-blue-500"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
    </>
  );
};

export default Charts;
