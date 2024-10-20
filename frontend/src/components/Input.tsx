import { useEffect, useState } from "react";

export default function Input({
  onAdd,
  taskName,
  setTaskName,
}: {
  onAdd: () => void;
  taskName: string;
  setTaskName: (taskName: string) => void;
}) {
  const [placeholder, setPlaceholder] = useState<string>(
    "What do you need to do?",
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 640) {
        setPlaceholder("Add a task");
      } else {
        setPlaceholder("What do you need to do?");
      }
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    return () => {
      window.removeEventListener("resize", updatePlaceholder);
    };
  }, []);

  return (
    <div className="relative mb-3 flex max-w-96 items-center px-2 py-1">
      <input
        className="min-w-60 overflow-x-auto rounded-full px-2 py-1 pr-16 text-lg placeholder-stone-800 ring-4 sm:w-96 sm:text-xl"
        placeholder={placeholder}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        className="absolute right-0 h-full rounded-e-full bg-blue-400 px-2 py-1 text-base font-semibold uppercase text-stone-50 sm:text-lg"
        onClick={onAdd}
      >
        add
      </button>
    </div>
  );
}
