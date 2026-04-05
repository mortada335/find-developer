import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  Briefcase,
  Globe2,
  ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";
import TrustedBySection from "@/components/layout/TrustedBySection";
import HowItWorksSection from "@/components/layout/HowItWorksSection";
import NewsletterSection from "@/components/layout/NewsletterSection";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 9;

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

  const filteredDevelopers = useMemo(() => {
    return mockDevelopers.filter((dev) => {
      if (filters.search &&
          !dev.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !dev.skills.some((s) => s.toLowerCase().includes(filters.search.toLowerCase())))
        return false;
      if (filters.jobTitle && dev.jobTitle !== filters.jobTitle) return false;
      if (filters.location && dev.location !== filters.location) return false;
      if (filters.availability && dev.availabilityType !== filters.availability) return false;
      if (filters.skills.length > 0 && !filters.skills.some((skill) => dev.skills.includes(skill))) return false;
      return true;
    });
  }, [filters]);

  const totalDevelopers = mockDevelopers.length;
  const featuredDevelopers = mockDevelopers.filter((d) => d.isFeatured);
  const totalPages = Math.ceil(filteredDevelopers.length / ITEMS_PER_PAGE);
  const paginatedDevelopers = filteredDevelopers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedDevelopers = mockDevelopers.filter((d) => selectedIds.includes(d.id));

  return (
    <>
      <HeroSection
        badge="Developer Marketplace"
        title="Find the right developer for your project"
        subtitle="Browse elite vetted developers, filter by skills and experience, and scale your engineering team with confidence."
      />

      {/* Trusted By */}
      <TrustedBySection />

      {/* Platform Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Developers", value: `${totalDevelopers}+`, color: "text-primary" },
            { icon: Briefcase, label: "Jobs Posted", value: "120+", color: "text-blue-500" },
            { icon: Globe2, label: "Countries", value: "22", color: "text-violet-500" },
            { icon: Star, label: "Avg Rating", value: "4.9", color: "text-yellow-500" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass hover:border-primary/30 transition-colors text-center">
                <CardContent className="py-8">
                  <stat.icon className={`h-7 w-7 mx-auto mb-3 ${stat.color}`} />
                  <p className="text-3xl md:text-4xl font-black">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Featured Developers */}
      {featuredDevelopers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">Featured</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top developers this month</h2>
            </div>
            <Button asChild variant="ghost" className="text-primary gap-1 hidden md:flex">
              <Link to="/recommended">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredDevelopers.map((dev, i) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <DeveloperCard developer={dev} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Developers Section */}
      <Section className="h-auto min-h-0 gap-0 max-w-6xl mx-auto py-12">
        <div className="flex items-center justify-between mb-8 w-full">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">Browse</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">All developers</h2>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, skills, or tech stack..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
              className="pl-12 bg-transparent border-none text-base focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start gap-2 px-2 w-full sm:w-auto">
            <span className="text-sm text-muted-foreground font-semibold px-2 border-r border-border/50 hidden md:inline-block">
              {filteredDevelopers.length} Profiles
            </span>
            <Button
              variant={selectedIds.length >= 2 ? "default" : "outline"}
              size="sm"
              onClick={() => selectedIds.length >= 2 ? setShowCompare(true) : null}
              className={`gap-2 rounded-xl transition-all ${selectedIds.length >= 2 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-background"}`}
              disabled={selectedIds.length < 2}
            >
              <GitCompare className="h-4 w-4" />
              Compare ({selectedIds.length})
            </Button>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 rounded-xl bg-background"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden w-full mb-6">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </motion.div>
        )}

        {/* Grid */}
        {paginatedDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {paginatedDevelopers.map((dev) => (
              <motion.div
                key={dev.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl transition-all duration-200 ${
                  selectedIds.includes(dev.id)
                    ? "ring-2 ring-primary ring-offset-4 ring-offset-background"
                    : ""
                }`}
              >
                <DeveloperCard
                  developer={dev}
                  selectionControl={
                    <label className="cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(dev.id)}
                        onChange={() => toggleSelect(dev.id)}
                        className="sr-only peer"
                      />
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center border-2 transition-all shadow-sm ${
                        selectedIds.includes(dev.id)
                          ? "bg-primary border-primary shadow-primary/30"
                          : "bg-background/80 backdrop-blur-md border-muted-foreground/30 group-hover:border-primary/50"
                      }`}>
                        {selectedIds.includes(dev.id) && (
                          <svg className="h-4 w-4 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </label>
                  }
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-border border-dashed w-full">
            <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No developers found.</p>
            <Button variant="link" className="text-primary font-medium"
              onClick={() => handleFilterChange({ search: "", jobTitle: "", skills: [], location: "", availability: "" })}>
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-8 w-full">
            <Pagination>
              <PaginationContent className="bg-background/50 backdrop-blur-md rounded-full shadow-sm border border-border/50 p-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`rounded-full ${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}`}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-full cursor-pointer ${page === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={`rounded-full ${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="flex justify-center pt-6 w-full">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp className="h-4 w-4 mr-2" /> Back to Top
          </Button>
        </div>

        {showCompare && selectedDevelopers.length >= 2 && (
          <CompareModal developers={selectedDevelopers} onClose={() => setShowCompare(false)} />
        )}
      </Section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
};

export default Home;