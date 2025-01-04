"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
export default function Sidebar({
  className,
  recentSearch,
}: {
  className?: string;
  recentSearch?: any[];
}) {
  const [visibleBadges, setVisibleBadges] = useState(0);

  useEffect(() => {
    const calculateBadges = () => {
      const screenHeight = window.innerHeight;
      const badgeHeight = 43 + 12;
      const count = Math.floor(screenHeight / badgeHeight);
      setVisibleBadges(count);
    };

    calculateBadges();
    window.addEventListener("resize", calculateBadges);

    return () => window.removeEventListener("resize", calculateBadges);
  }, []);
  console.log(recentSearch);
  const modifyRecentSearch =
    (recentSearch ?? []).length > visibleBadges
      ? recentSearch?.slice(0, visibleBadges)
      : recentSearch;
  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {Array.from({ length: visibleBadges - 2 }).map((_, index) => (
        <Badge
          key={index}
          text={modifyRecentSearch?.[index]?.text}
          src={modifyRecentSearch?.[index]?.src}
        />
      ))}
    </div>
  );
}
