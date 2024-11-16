import React from "react";

const CenterLoader = () => {
  return (
    <div
      style={{ background: "rgba(255,255,255,0.5)" }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="loader-lg"></div>
    </div>
  );
};

export default CenterLoader;
