import React, { useState } from "react";

import Game from "./tic_tac_toe";
import Todo_list from "./todo_list";
import Counter from "./counter";
import Cep from "./CEP_searcher";
import Calculator from "./calculator";

export default function Header() {
  const [active, setActive] = useState(null);
  const items = [
    {
      id: 1,
      name: "Tic Tac Toe",
      component: <Game />,
    },
    {
      id: 2,
      name: "To-Do List",
      component: <Todo_list />,
    },
    {
      id: 3,
      name: "Counter",
      component: <Counter />,
    },
    {
      id: 4,
      name: "CEP Seracher",
      component: <Cep />,
    },
    {
      id: 5,
      name: "Calculator",
      component: <Calculator />,
    },
  ];

  return (
    <>
      <header className="grid grid-cols-[1fr_4fr_1fr]  items-center justify-center px-12 py-10 text-white bg-[#121218] min-w-[99.5vw]">
        <h1 className="text-3xl uppercase font-bold">Joguinhos</h1>
        <nav className="flex justify-center">
          <ul className="flex gap-x-8 text-xl text-[#ccc] ">
            {items.map((item) =>
              item.id === active ? (
                <li className="underline underline-offset-4 decoration-2 decoration-[#ffc107] text-[#ffc107]">
                  {item.name}
                </li>
              ) : (
                <li
                  onClick={() => setActive(item.id)}
                  key={item.id}
                  className="cursor-pointer decoration-1 hover:text-[#eee] hover:underline underline-offset-4 decoration-[#eee] duration-75"
                >
                  {item.name}
                </li>
              )
            )}
          </ul>
        </nav>
      </header>
      <main className="px-48 py-16">
        {items.find((item) => item.id === active)?.component}
      </main>
    </>
  );
}
