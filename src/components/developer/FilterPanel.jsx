import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { filterOptions } from "@/data/mock";

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleSkill = (skill) => {
    const current = filters.skills || [];
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    updateFilter("skills", updated);
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      jobTitle: "",
      skills: [],
      location: "",
      availability: "",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.jobTitle ||
    (filters.skills && filters.skills.length > 0) ||
    filters.location ||
    filters.availability;

  // Generate the AI prompt based on current filters
  const aiPrompt = useMemo(() => {
    const parts = [];
    if (filters.jobTitle) parts.push(`Job Title: ${filters.jobTitle}`);
    if (filters.skills && filters.skills.length > 0)
      parts.push(`Skills: ${filters.skills.join(", ")}`);
    if (filters.location) parts.push(`Location: ${filters.location}`);
    if (filters.availability)
      parts.push(`Availability: ${filters.availability}`);

    const filterDesc =
      parts.length > 0
        ? parts.join(". ") + "."
        : "(No filters applied – use the link below to browse all developers.)";

    const params = new URLSearchParams({
      minExperience: "0",
      maxExperience: "50",
      expected_salary_from: "0",
      expected_salary_to: "0",
    });

    return `Search for developers on https://devconnect.com according to the following company requirements: ${filterDesc} Use this URL: https://www.devconnect.com/?${params.toString()}`;
  }, [filters]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-base">Filters</CardTitle>
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400"
              >
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <CardDescription className="text-xs hidden sm:block">
              Filter developers by various criteria
            </CardDescription>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4 pt-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Row: Job Title + Location + Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Job Title
              </label>
              <select
                value={filters.jobTitle}
                onChange={(e) => updateFilter("jobTitle", e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="">All Job Titles</option>
                {filterOptions.jobTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="">All Locations</option>
                {filterOptions.locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => updateFilter("availability", e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="">All Types</option>
                {filterOptions.availabilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Skills
            </label>
            <div className="flex flex-wrap gap-1.5">
              {filterOptions.skills.map((skill) => {
                const isActive = (filters.skills || []).includes(skill);
                return (
                  <Badge
                    key={skill}
                    variant={isActive ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      isActive
                        ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                        : "hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* AI Prompt */}
          <div className="rounded-lg border border-dashed p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <h4 className="text-sm font-medium">AI Prompt</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Copy this prompt to ask an AI assistant to search for developers on
              devconnect.com. Add filters above, then copy the prompt below.
            </p>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
              {aiPrompt}
            </pre>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPrompt}
              className="gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Prompt
                </>
              )}
            </Button>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear all filters
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default FilterPanel;
