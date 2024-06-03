import React from "react";
import "./Loader.css";

const PizzaLoader: React.FC = () => {
  return (
    <div className="pizza-loader">
      <div className="slice">
        <div className="cheese"></div>
        <div className="pepperoni pepperoni1"></div>
        <div className="pepperoni pepperoni2"></div>
        <div className="pepperoni pepperoni3"></div>
        <div className="pepperoni pepperoni4"></div>
      </div>
      <div className="bite"></div>
    </div>
  );
};

export default PizzaLoader;
