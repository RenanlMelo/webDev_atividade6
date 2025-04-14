import React, { useState } from "react";

export default function Calculator() {
  const [num, setNum] = useState("0");

  const handleButtonClick = (value) => {
    if (value === "C" || value === "CE") {
      setNum("0");
    } else if (value === "⌫") {
      setNum(num.length <= 1 || num === "Erro" ? "0" : num.slice(0, -1));
    } else if (value === "=") {
      try {
        const expression = num.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(expression);
        setNum(result.toString());
      } catch {
        setNum("Erro");
      }
    } else if (value === "1/x") {
      try {
        const result = 1 / parseFloat(num);
        setNum(result.toString());
      } catch {
        setNum("Erro");
      }
    } else if (value === "x²") {
      try {
        const result = Math.pow(parseFloat(num), 2);
        setNum(result.toString());
      } catch {
        setNum("Erro");
      }
    } else if (value === "²√x") {
      try {
        const result = Math.sqrt(parseFloat(num));
        setNum(result.toString());
      } catch {
        setNum("Erro");
      }
    } else if (value === "%") {
      try {
        const result = parseFloat(num) / 100;
        setNum(result.toString());
      } catch {
        setNum("Erro");
      }
    } else if (value === "+/-") {
      if (num === "0" || num === "Erro") return;
      setNum(num.startsWith("-") ? num.slice(1) : "-" + num);
    } else {
      if (num === "0" || num === "Erro") {
        setNum(value === "." ? "0." : value);
      } else {
        if (value === "." && num.includes(".")) return;
        setNum(num + value);
      }
    }
  };

  const renderButton = (value) => (
    <button
      key={value}
      onClick={() => handleButtonClick(value)}
      className="w-[75px] h-[50px] bg-[#2c2c2f] text-white rounded-md text-lg hover:bg-[#3a3a3e] transition duration-200"
    >
      {value}
    </button>
  );

  return (
    <div>
      <h2 className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent text-3xl font-bold pb-10">
        Calculator
      </h2>
      <div className="grid grid-rows-[1fr_5fr] gap-5 p-12 rounded-2xl bg-[#1f1f22] shadow-[inset_5px_5px_7px_rgba(255,255,255,0.125),5px_5px_12px_rgba(0,0,0,0.5)] w-max">
        <input
          id="display"
          type="text"
          value={num}
          readOnly
          dir="rtl"
          className="text-right text-[2.5rem] h-[50px] rounded-md px-4 bg-[#2c2c2f] text-white overflow-x-auto pointer-events-none select-none w-[312px] focus:outline-transparent"
          style={{ caretColor: "transparent" }}
        />

        <div className="grid gap-1">
          {[
            ["%", "CE", "C", "⌫"],
            ["1/x", "x²", "²√x", "÷"],
            ["7", "8", "9", "×"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["+/-", "0", ".", "="],
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-1">
              {row.map((btn) => renderButton(btn))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
