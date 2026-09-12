import { useBoard } from "../context/useBoard";

export default function TaskCard({ task, columnId }) {
  const { handleDragStart } = useBoard();

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task.id, columnId)}
      className="cursor-grab rounded-lg bg-white p-4 shadow-sm border border-slate-200 transition-all hover:shadow-md active:cursor-grabbing hover:border-slate-300"
    >
      <p className="text-sm font-medium text-slate-800">{task.title}</p>
    </div>
  );
}