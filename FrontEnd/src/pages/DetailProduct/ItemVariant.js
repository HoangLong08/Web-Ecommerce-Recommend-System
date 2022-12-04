import React from "react";
import "./ItemVariant.css";

function ItemVariant({ title, price, active, handleClick }) {
  return (
    <div
      className={active ? "item-variant item-variant-active" : "item-variant"}
      onClick={handleClick}
    >
      <strong>{title}</strong>
      <p>{price}</p>
    </div>
  );
}

export default ItemVariant;
