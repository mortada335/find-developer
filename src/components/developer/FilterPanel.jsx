import { useState } from "react";
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
} from "lucide-react";
import { filterOptions } from "@/data/mock";

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <Card className="border-dashed border-border/50 glass">
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Filters</CardTitle>
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="text-xs bg-primary/10 text-primary"
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
                        ? "bg-primary hover:bg-primary/80 text-primary-foreground border-primary"
                        : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
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
