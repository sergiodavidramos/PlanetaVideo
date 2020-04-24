import React from "react";
import '../assets/styles/components/Carousel.scss'

const Carousel = ({ children }) => (
  <section className="carousel scrollesp">
    <div className="corousel__container">{children}</div>
  </section>
);
export default Carousel;
