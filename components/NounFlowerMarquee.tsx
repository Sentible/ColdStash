import React from "react";
import NounFlower from "./NounFlower";

export default function NounFlowerMarquee() {
  const numberOfItems = 15;
  const items = Array.from({ length: numberOfItems }, (_, index) => (
    <NounFlower key={index} />
  ));

  return <div className="svg-row">{items}</div>;
}
