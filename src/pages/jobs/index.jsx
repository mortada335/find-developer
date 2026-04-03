import { useState, useMemo } from "react";
import { mockJobs } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/layout/HeroSection";
import {
  Search, MapPin, Briefcase, DollarSign, Clock,
  Bookmark, BookmarkCheck, CheckCircle, Users, Wifi,
} from "lucide-react";
import { motion } from "framer-motion";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { applyToJob, toggleSaveJob, isJobSaved, hasApplied } = useApp();

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      if (search && !job.title.toLowerCase().includes(search.toLowerCase()) &&
          !job.company.toLowerCase().includes(search.toLowerCase()) &&
          !job.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
        return false;
      if (typeFilter && job.type !== typeFilter) return false;
      return true;
    });
  }, [search, typeFilter]);

  const formatSalary = (min, max) => {
    const fmt = (n) => `$${(n / 1000).toFixed(0)}K`;
    return `${fmt(min)} – ${fmt(max)}`;
  };

  return (
    <>
      <HeroSection
        badge="Opportunities"
        title="Find your next dream developer job"
        subtitle="Browse curated positions from top companies. Every listing is verified and up-to-date."
      />

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 bg-muted/30 p-3 rounded-2xl border border-border/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-transparent border-none text-base focus-visible:ring-0 shadow-none h-12"
            />
          </div>
          <div className="flex flex-wrap gap-2 px-2 items-center justify-center sm:justify-start w-full sm:w-auto mt-2 sm:mt-0">
            {["", "Full-time", "Contract", "Part-time"].map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className={`rounded-xl text-xs ${typeFilter === type ? "bg-primary text-primary-foreground" : "bg-background"}`}
              >
                {type || "All"}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-medium">
          {filteredJobs.length} positions available
        </p>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job, i) => {
            const applied = hasApplied(job.id);
            const saved = isJobSaved(job.id);

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass hover:border-primary/30 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Company Logo */}
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-14 h-14 rounded-xl border border-border/50 shrink-0"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors pr-8">{job.title}</h3>
                            <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
                          </div>
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className="shrink-0 p-2 rounded-full hover:bg-muted transition-colors"
                          >
                            {saved ? (
                              <BookmarkCheck className="h-5 w-5 text-primary fill-primary" />
                            ) : (
                              <Bookmark className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" />
                            {job.type}
                          </span>
                          {job.remote && (
                            <span className="inline-flex items-center gap-1.5 text-primary">
                              <Wifi className="h-3.5 w-3.5" />
                              Remote OK
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                            <DollarSign className="h-3.5 w-3.5" />
                            {formatSalary(job.salaryMin, job.salaryMax)}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap items-center gap-2 mt-4">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs font-medium bg-muted/50">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/30">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {job.applicants} applicants
                            </span>
                          </div>

                          <Button
                            size="sm"
                            disabled={applied}
                            onClick={() => applyToJob(job.id)}
                            className={`rounded-xl gap-2 ${applied ? "bg-primary/20 text-primary border border-primary/30" : "bg-primary text-primary-foreground shadow-sm"}`}
                            variant={applied ? "outline" : "default"}
                          >
                            {applied ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Applied
                              </>
                            ) : (
                              "Apply Now"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
            <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No jobs match your search.</p>
            <Button variant="link" className="text-primary mt-2" onClick={() => { setSearch(""); setTypeFilter(""); }}>
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default Jobs;
