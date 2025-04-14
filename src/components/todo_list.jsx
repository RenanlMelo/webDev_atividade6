import { useReducer, useState } from "react";
import "./components.css";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          progress: "On Going",
          isEditing: false,
          done: false,
        },
      ];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              done: !todo.done,
              progress: todo.done ? "On Going" : "Done",
            }
          : todo
      );
    case "edit":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isEditing: true } : todo
      );
    case "update":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, isEditing: false }
          : todo
      );
    case "cancelEdit":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isEditing: false } : todo
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function Todo_list() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch({ type: "add", payload: input });
    setInput("");
  };

  const handleUpdate = (id) => {
    if (!editText.trim()) return;
    dispatch({ type: "update", payload: { id, text: editText } });
  };

  return (
    <div>
      <h2 className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent text-[1.5vw] font-bold pb-10">
        To-Do List
      </h2>
      <div className="flex gap-5">
        <input
          className="bg-[#242429] border-b border-[#777] pl-[1.25vw] text-[1vw] text-[#ccc]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <button className="buttons col-start-2" onClick={handleAdd}>
          ADD
        </button>
      </div>

      <ul className="mt-10 p-0 grid">
        {todos.map((todo) => (
          <div key={todo.id} className="border-t border-[#585872]">
            <li className="grid grid-cols-[12fr,1fr] grid-rows-[.5fr,.5fr,.5fr] gap-[10px] pt-[1rem] pb-[1rem] ">
              {todo.isEditing ? (
                <input
                  className="text-[#ccc] bg-[#242429] border border-[#585872] text-[1.2rem] w-full p-[7px_10px]"
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdate(todo.id);
                    if (e.key === "Escape")
                      dispatch({ type: "cancelEdit", payload: todo.id });
                  }}
                />
              ) : (
                <p
                  className={`relative text-start m-0 text-[1.2rem] w-fit p-[7px_10px_4px_10px] col-start-1 row-start-1 ${
                    todo.done ? "line_through" : "text-[#ccc]"
                  }`}
                >
                  {todo.text}
                </p>
              )}
              {todo.isEditing && (
                <div className="flex gap-x-5 col-start-1 row-start-2 col-span-2 pl-[10px]">
                  <button
                    className="buttons col-start-2"
                    onClick={() => handleUpdate(todo.id)}
                  >
                    SAVE
                  </button>
                  <button
                    className="buttons col-start-2"
                    onClick={() =>
                      dispatch({ type: "cancelEdit", payload: todo.id })
                    }
                  >
                    CANCEL EDIT
                  </button>
                </div>
              )}
              <button
                className="buttons col-start-2"
                onClick={() => {
                  setEditText(todo.text);
                  dispatch({ type: "edit", payload: todo.id });
                }}
              >
                EDIT
              </button>

              <button
                className="buttons col-start-2 row-start-2"
                onClick={() => dispatch({ type: "delete", payload: todo.id })}
              >
                REMOVE
              </button>

              <button
                className="buttons col-start-2 row-start-3"
                onClick={() => dispatch({ type: "toggle", payload: todo.id })}
              >
                {todo.done ? "UNDO" : "DONE"}
              </button>

              <p className="text-[#ccc] text-start m-0 text-[1.2rem] w-full p-[7px_0_4px_10px] col-start-1 row-start-3 font-semibold">
                Status: {todo.progress}
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
