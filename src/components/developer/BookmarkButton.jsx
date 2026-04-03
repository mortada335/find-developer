import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const BookmarkButton = ({ developerId, className }) => {
  const { toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(developerId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(developerId);
      }}
      className={cn(
        "p-2 rounded-full transition-all duration-200",
        bookmarked
          ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/30"
          : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 border border-border/50",
        className
      )}
      title={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
    >
      <Heart
        className={cn("h-4 w-4 transition-all", bookmarked && "fill-rose-500")}
      />
    </button>
  );
};

export default BookmarkButton;
