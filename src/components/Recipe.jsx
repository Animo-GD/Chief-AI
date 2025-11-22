import React from "react";

export default function Recipe({ recipe }) {
  return (
    <div className="recipe">
      <div dangerouslySetInnerHTML={{ __html: recipe }}></div>
    </div>
  );
}
