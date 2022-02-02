import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "../stylesheets/slidinglogos.css";
import logoone from '../images/logo1.png'
import logotwo from '../images/logo2.png'
import logothree from '../images/logo3.png'
import logofour from '../images/logo4.png'
import logofive from '../images/logo5.png'

const breakPoints = [
  { width: 1, itemsToShow: 3 },
  { width: 550, itemsToShow: 4 },
  { width: 768, itemsToShow: 5 },
  { width: 1200, itemsToShow: 7 },
];

export default function SlidingLogos() {
  return (
    <>
      <div className="sliding">
        <Carousel enableAutoPlay breakPoints={breakPoints}>
          <Item><img src={logoone} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logotwo} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logothree} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logofour} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logofive} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logoone} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logotwo} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logothree} alt="" className="item-img" width={175} height={47}/></Item>
          <Item><img src={logofour} alt="" className="item-img" width={175} height={47}/></Item>
        </Carousel>
      </div>
    </>
  );
}