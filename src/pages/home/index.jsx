import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import DeveloperCard from "@/components/developer/DeveloperCard";
import FilterPanel from "@/components/developer/FilterPanel";
import { mockDevelopers } from "@/data/mock";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUp } from "lucide-react";

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

  // Filter developers
  const filteredDevelopers = useMemo(() => {
    return mockDevelopers.filter((dev) => {
      if (
        filters.search &&
        !dev.name.toLowerCase().includes(filters.search.toLowerCase())
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

  return (
    <Section className="h-auto min-h-0 gap-0">
      {/* Hero Section */}
      <div
        id="hero"
        className="w-full flex flex-col gap-4 items-center justify-center py-16 md:py-24 page-enter"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent gradient-text-animated animate-fade-in">
          Find Your Perfect Developer
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl animate-slide-up">
          Discover talented developers ready to bring your projects to life
        </p>
        <Link to="/register">
          <Button className="mt-2 btn-glow animate-pulse-glow bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white transition duration-200">
            Register as Developer
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div
        id="free-developers-section"
        className="w-full space-y-6 pb-12"
      >
        {/* Filters */}
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

        {/* Section Header */}
        <div>
          <h2 className="text-xl font-semibold">All Developers</h2>
          <p className="text-sm text-muted-foreground">
            Browse all registered developers
          </p>
        </div>

        {/* Developer Grid */}
        {paginatedDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedDevelopers.map((dev) => (
              <DeveloperCard key={dev.id} developer={dev} />
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
    </Section>
  );
};

export default Home;