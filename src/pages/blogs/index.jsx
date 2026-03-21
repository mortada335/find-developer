import { useState, useMemo } from "react";
import Section from "@/components/layout/Section";
import HeroSection from "@/components/layout/HeroSection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockBlogs } from "@/data/mock";
import { FileText, User, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ITEMS_PER_PAGE = 6;

const BlogCard = ({ blog }) => {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-purple-400/30 card-animated">
      {/* Featured Image Placeholder */}
      <div className="w-full h-48 bg-muted flex items-center justify-center overflow-hidden">
        {blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FileText className="h-12 w-12 text-muted-foreground/50" />
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {blog.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
          {blog.excerpt}
        </p>

        <Separator />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3 w-3" />
            {blog.author.name}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    return mockBlogs.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [currentPage]);

  return (
    <>
      <HeroSection
        badge="Developer blog"
        title="Blog"
        subtitle="Articles and posts from our developers. Read about their experience, tips, and insights."
      />
      <Section className="h-auto min-h-0">
      {/* Blog Grid */}
      <div className="w-full space-y-6 pb-12">
        {paginatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
      </div>
    </Section>
    </>
  );
};

export default Blogs;
