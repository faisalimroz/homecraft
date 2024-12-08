"use client";
import { FaStar } from "react-icons/fa";
import React from "react";

interface RatingProps {
  rating: number; // Rating value between 0 and 5
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star

  // Generate an array of stars
  const starsArray = Array(5).fill(false).map((_, index) => {
    if (index < fullStars) return "full";
    if (index === fullStars && hasHalfStar) return "half";
    return "empty";
  });

  return (
    <div className="relative flex items-center">
      {starsArray.map((star, index) => (
        <div key={index} className="relative">
          <FaStar
            className={`mr-1 ${star === "full" ? "text-yellow-500" : "text-gray-300"}`}
            style={{ width: "1.2em", height: "1.2em" }}
          />
          {star === "half" && (
            <FaStar
              className="absolute top-0 left-0 text-yellow-500"
              style={{ width: "1.2em", height: "1.2em", clipPath: "inset(0 50% 0 0)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Rating;
