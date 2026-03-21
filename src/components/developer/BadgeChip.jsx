import { Badge } from "@/components/ui/badge";
import { badgeInfo } from "@/data/mock";
import { Link } from "react-router-dom";
import {
  Award,
  CheckCircle,
  Heart,
  Star,
  Crown,
  Megaphone,
} from "lucide-react";

const badgeIcons = {
  "soft-skills": Heart,
  "experience-validated": CheckCircle,
  "platform-contributor": Star,
  "platform-marketer": Megaphone,
  "passion-developer": Award,
  "the-founder": Crown,
};

const BadgeChip = ({ badgeSlug }) => {
  const info = badgeInfo[badgeSlug];
  if (!info) return null;

  const Icon = badgeIcons[badgeSlug];

  return (
    <Link to="/badges">
      <Badge
        variant="outline"
        className={`${info.color} gap-1 cursor-pointer hover:opacity-80 transition-opacity`}
      >
        {Icon && <Icon className="h-3 w-3" />}
        {info.label}
      </Badge>
    </Link>
  );
};

export default BadgeChip;
