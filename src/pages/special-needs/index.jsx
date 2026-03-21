import { useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import DeveloperCard from "@/components/developer/DeveloperCard";
import { mockDevelopers } from "@/data/mock";
import { ArrowLeft, Accessibility } from "lucide-react";

const SpecialNeeds = () => {
  const specialNeedsDevelopers = useMemo(() => {
    return mockDevelopers.filter((dev) => dev.isSpecialNeeds);
  }, []);

  return (
    <Section className="h-auto min-h-0">
      {/* Header */}
      <div className="w-full py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium">
          <Accessibility className="h-4 w-4" />
          Inclusive Opportunities
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Special Needs Developers
        </h1>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
          Talented developers with disabilities who bring unique perspectives
          and exceptional skills to every project
        </p>
      </div>

      {/* Developer Grid */}
      <div className="w-full space-y-6 pb-12">
        {specialNeedsDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialNeedsDevelopers.map((dev) => (
              <DeveloperCard key={dev.id} developer={dev} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Accessibility className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">
              No special needs developers registered yet.
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              We're committed to promoting inclusive hiring. If you're a
              developer with special needs, we encourage you to register and
              showcase your talents.
            </p>
            <Button
              asChild
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
            >
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        )}

        {/* Back link */}
        <div className="flex justify-center">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all developers
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default SpecialNeeds;
