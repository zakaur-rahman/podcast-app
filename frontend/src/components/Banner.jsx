import React from "react";

const Banner = () => {
  return (
    <div
      className="relative w-full h-50vh mb-6 flex flex-col items-center justify-center"
      style={{
        background:
          "url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000",
      }}
    >
      <h1 className="text-6xl text-white mb-4">PODCAST</h1>
      <h2 className="text-lg bg-white p-2">
        Infuse Life into Your Imagination
      </h2>
    </div>
  );
};

export default Banner;
