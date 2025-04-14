import React, { useState } from "react";

export default function Counter() {
  const [cont, setCont] = useState(0);

  const handleClick = () => {
    setCont(cont + 1);
  };

  return (
    <>
      <h2 className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent text-3xl font-bold pb-10">
        Counter
      </h2>
      <button className="buttons" onClick={handleClick}>
        Count: {cont}
      </button>
      <button className="buttons mt-4" onClick={() => setCont(0)}>
        Reset Count
      </button>
    </>
  );
}
