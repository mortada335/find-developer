import { useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import DeveloperCard from "@/components/developer/DeveloperCard";
import { mockDevelopers } from "@/data/mock";
import { ArrowLeft, ThumbsUp } from "lucide-react";

const Recommended = () => {
  const recommendedDevelopers = useMemo(() => {
    return mockDevelopers.filter((dev) => dev.isRecommended);
  }, []);

  return (
    <Section className="h-auto min-h-0">
      {/* Header */}
      <div className="w-full py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium">
          <ThumbsUp className="h-4 w-4" />
          Recommended by our team
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Recommended Developers
        </h1>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
          Hand-picked developers who have been vetted and recommended by our
          team for their exceptional skills and professionalism
        </p>
      </div>

      {/* Developer Grid */}
      <div className="w-full space-y-6 pb-12">
        {recommendedDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedDevelopers.map((dev) => (
              <DeveloperCard key={dev.id} developer={dev} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No recommended developers available at this time.
            </p>
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

export default Recommended;
