import TaskCard from "./TaskCard";
import { COLUMN_NAMES } from "../constants/kanbanData";
import { useBoard } from "../context/useBoard";

export default function Column({ columnId, tasks }) {
  const { handleDragOver, handleDrop, addTask } = useBoard();

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnId)}
      className="flex flex-col rounded-xl bg-slate-200/60 p-4 shadow-inner min-h-[500px]"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-700">
          {COLUMN_NAMES[columnId] || columnId}
        </h2>
        <span className="rounded-full bg-slate-300 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={columnId} />
        ))}
      </div>

      <button
        onClick={() => addTask(columnId)}
        className="mt-4 flex w-full items-center justify-center rounded-lg border border-dashed border-slate-400 p-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-500 hover:bg-slate-300/50 hover:text-slate-800"
      >
        + Add Card
      </button>
    </div>
  );
}