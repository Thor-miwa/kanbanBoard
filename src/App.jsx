import Header from "./components/Header";
import Column from "./components/Column";
import { BoardProvider } from "./context/BoardContext";
import { useBoard } from "./context/useBoard";

function KanbanContent() {
  const { board } = useBoard();

  return (
    <div className="min-h-screen bg-slate-100 p-8 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <Header />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(board).map(([columnId, tasks]) => (
            <Column key={columnId} columnId={columnId} tasks={tasks} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BoardProvider>
      <KanbanContent />
    </BoardProvider>
  );
}