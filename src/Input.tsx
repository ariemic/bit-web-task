export default function Input({
  onAdd,
  taskName,
  setTaskName,
}: {
  onAdd: () => void;
  taskName: string;
  setTaskName: (taskName: string) => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="relative flex w-96 items-center px-2 py-1">
      <input
        className="w-full rounded-full px-2 py-1 text-xl placeholder-stone-800 ring-4"
        placeholder="What do you need to do?"
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        className="absolute right-0 rounded-e-full bg-blue-400 px-2 py-1 text-lg font-semibold uppercase text-stone-50"
        onClick={onAdd}
      >
        add
      </button>
    </div>
  );
}
