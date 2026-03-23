import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import DeveloperCard from "@/components/developer/DeveloperCard";
import FilterPanel from "@/components/developer/FilterPanel";
import CompareModal from "@/components/developer/CompareModal";
import { mockDevelopers } from "@/data/mock";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ArrowUp,
  Users,
  Star,
  Search,
  SlidersHorizontal,
  GitCompare,
  Mail,
} from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [filters, setFilters] = useState({
    search: "",
    jobTitle: "",
    skills: [],
    location: "",
    availability: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter developers
  const filteredDevelopers = useMemo(() => {
    return mockDevelopers.filter((dev) => {
      if (
        filters.search &&
        !dev.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !dev.skills.some((s) =>
          s.toLowerCase().includes(filters.search.toLowerCase())
        )
      )
        return false;
      if (filters.jobTitle && dev.jobTitle !== filters.jobTitle) return false;
      if (filters.location && dev.location !== filters.location) return false;
      if (
        filters.availability &&
        dev.availabilityType !== filters.availability
      )
        return false;
      if (
        filters.skills.length > 0 &&
        !filters.skills.some((skill) => dev.skills.includes(skill))
      )
        return false;
      return true;
    });
  }, [filters]);

  // Counts
  const totalDevelopers = mockDevelopers.length;
  const recommendedCount = mockDevelopers.filter(
    (d) => d.isRecommended
  ).length;

  // Pagination
  const totalPages = Math.ceil(filteredDevelopers.length / ITEMS_PER_PAGE);
  const paginatedDevelopers = filteredDevelopers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Toggle developer selection for compare
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedDevelopers = mockDevelopers.filter((d) =>
    selectedIds.includes(d.id)
  );

  return (
    <>
      <HeroSection
        badge="Find developers"
        title="Find the right developer for your project"
        subtitle="Browse vetted developers, filter by skills and experience, and connect with the best match for your team."
      />
      <Section className="h-auto min-h-0 gap-0">
      {/* Subscription CTA Banner */}
      <div className="w-full py-8 md:py-10 page-enter">
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-amber-600/5 dark:from-amber-500/10 dark:to-amber-600/10">
          <CardContent className="pt-6 text-center space-y-3">
            <h2 className="text-xl md:text-2xl font-bold">
              Unlock direct contact details & CVs
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Subscribers get access to developer phone numbers and resumes —
              connect faster with the right talent for your team.
            </p>
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
            >
              <a href="mailto:mortadaahmad56@gmail.com?subject=Get+Access">
                <Mail className="h-4 w-4 mr-2" />
                Get access — contact mortadaahmad56@gmail.com
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in">
        <Card className="overflow-hidden">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Users className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500">
                {totalDevelopers}
              </p>
              <p className="text-sm text-muted-foreground">
                Developers in the system
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Star className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500">
                {recommendedCount}
              </p>
              <p className="text-sm text-muted-foreground">
                Recommended developers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div
        id="free-developers-section"
        className="w-full space-y-6 pb-12"
      >
        {/* Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or skills..."
              value={filters.search}
              onChange={(e) =>
                handleFilterChange({ ...filters, search: e.target.value })
              }
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
              {filteredDevelopers.length} developers
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectedIds.length >= 2 ? setShowCompare(true) : null}
              className="gap-1.5"
              disabled={selectedIds.length < 2}
            >
              <GitCompare className="h-4 w-4" />
                Compare ({selectedIds.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-1.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        )}

        {/* Developer Grid */}
        {paginatedDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedDevelopers.map((dev) => (
              <div
                key={dev.id}
                className={`relative rounded-xl transition-all duration-150 ${
                  selectedIds.includes(dev.id)
                    ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-background"
                    : ""
                }`}
              >
                {/* Selection checkbox — custom dark-mode-aware */}
                <label className="absolute top-3 left-3 z-10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(dev.id)}
                    onChange={() => toggleSelect(dev.id)}
                    className="sr-only peer"
                  />
                  <div className={`h-5 w-5 rounded flex items-center justify-center border transition-colors duration-150 ${
                    selectedIds.includes(dev.id)
                      ? "bg-amber-500 border-amber-500"
                      : "bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-600"
                  }`}>
                    {selectedIds.includes(dev.id) && (
                      <svg className="h-3 w-3 text-black" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </label>
                <DeveloperCard developer={dev} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No developers found matching your filters.
            </p>
            <Button
              variant="link"
              className="text-purple-600 dark:text-purple-400"
              onClick={() =>
                handleFilterChange({
                  search: "",
                  jobTitle: "",
                  skills: [],
                  location: "",
                  availability: "",
                })
              }
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Back to Top */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            Back to Top
          </Button>
        </div>
      </div>

      {/* Compare Modal */}
      {showCompare && selectedDevelopers.length >= 2 && (
        <CompareModal
          developers={selectedDevelopers}
          onClose={() => setShowCompare(false)}
        />
      )}
    </Section>
    </>
  );
};

export default Home;