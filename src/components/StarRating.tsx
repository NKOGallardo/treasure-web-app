import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviews,
  size = "sm",
}: {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
}) {
  return (
    <div className={cn("stars", size === "md" && "stars--md")}>
      <div className="stars__row">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < Math.round(rating) ? "star-on" : "star-off"}
          />
        ))}
      </div>
      <span className="stars__count">
        {rating.toFixed(1)}
        {reviews !== undefined && ` (${reviews})`}
      </span>
    </div>
  );
}
