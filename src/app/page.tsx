"use client";

import { useState } from "react";
import { TodoObject } from "./models/Todo";
import { v4 as uuid } from "uuid";

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [storeTodo, setStoreTodo] = useState<TodoObject[]>([]);

  const addTodo = () => {
    if (todo) {
      setStoreTodo([{ id: uuid(), value: todo, done: false }, ...storeTodo]);
      setTodo("");
      console.log("Stored", storeTodo);
    }
  };

  const markTodo = (id: string) => {
    setStoreTodo(
      storeTodo.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <>
      <header className="bg-slate-950 px-3 py-1 ">
        <h1 className="text-[18px]">Todo</h1>
      </header>

      <main className="p-4">
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="px-2 py-1 rounded-sm text-slate-900 outline-none"
          value={todo}
        />

        <button
          onClick={() => addTodo()}
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold ml-5 py-1 px-4 rounded"
        >
          Add
        </button>

        <ul className="mt-5">
          {storeTodo.map((todo, idx) => (
            <li
              onClick={() => markTodo(todo.id)}
              className={`rounded-sm border-2 w-80 mt-2 p-1 hover:bg-slate-500 ${
                todo.done ? "line-through" : "no-underline"
              }`}
              key={idx}
            >
              {todo.value}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
