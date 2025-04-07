import React from "react";

const Pattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-blue-700 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 2 === 0 
                  ? "bg-blue-500/80 animate-pulse" 
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <p className="text-white/80 mb-5">{subtitle}</p>
      </div>
    </div>
  );
};

export default Pattern;