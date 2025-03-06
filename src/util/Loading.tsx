import { useState, useEffect } from "react";
import "./Loading.css";

export const Loading = () => {
  const [index, setIndex] = useState(0);
  const pattern = [0, 1, 3, 2];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = pattern.indexOf(prevIndex);
        return pattern[(newIndex + 1) % pattern.length];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      <div className="loading-container">
        <div className="loading">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`square ${i === index ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
