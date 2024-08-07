import React from "react";
import starFilledIcon from "../Assets/images/star-filled.svg";
import starIcon from "../Assets/images/star.svg";

const StarsList = ({ rate = 0 }) => {
  return (
    <div className="stars">
      {Array(Math.round(rate))
        .fill(0)
        .map(() => {
          return (
            <img key={Math.random()} src={starFilledIcon} alt="filled star" />
          );
        })}
      {Array(5 - Math.round(rate))
        .fill(0)
        .map(() => {
          return <img key={Math.random()} src={starIcon} alt="star" />;
        })}
    </div>
  );
};

export default StarsList;
