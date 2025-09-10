import React from "react";

export default function ScrollArrow() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 animate-bounce text-white opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}