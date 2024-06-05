import React from "react";
import "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="hamburger">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
    </div>
  );
};

export default Loader;
