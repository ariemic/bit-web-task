import { useState } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");

  interface User {
    name: string;
    id: number;
  }

  type task = "done" | "inProgress" | "notStarted";

  const user: User = {
    name: "Ariel",
    id: 0,
  };

  function getUserName(user: User): void {
    setName(user.name);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">{`Hello ${name}`}</h1>
      <button
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
        onClick={() => getUserName(user)}
      >
        ...
      </button>
    </>
  );
}
