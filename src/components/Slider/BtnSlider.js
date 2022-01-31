import React from "react";
import "./Slider.css";


export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);

  const leftArrow = "fas fa-chevron-left";
  const rightArrow = "fas fa-chevron-right";

  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <i className={direction === "next" ? rightArrow : leftArrow}></i>
    </button>
  );
}
