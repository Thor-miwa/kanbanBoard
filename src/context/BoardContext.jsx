import { useState, useEffect } from "react";
import { INITIAL_DATA } from "../constants/kanbanData";
import { BoardContext } from "./BoardContextValue";

export function BoardProvider({ children }) {
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem("kanban-board");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(board));
  }, [board]);

  const handleDragStart = (e, taskId, sourceColumn) => {
    setDraggedItem({ taskId, sourceColumn });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { taskId, sourceColumn } = draggedItem;
    if (sourceColumn === targetColumn) return;

    setBoard((prev) => {
      const sourceList = [...prev[sourceColumn]];
      const targetList = [...prev[targetColumn]];

      const taskIndex = sourceList.findIndex((t) => t.id === taskId);
      const [movedTask] = sourceList.splice(taskIndex, 1);

      targetList.push(movedTask);

      return {
        ...prev,
        [sourceColumn]: sourceList,
        [targetColumn]: targetList,
      };
    });

    setDraggedItem(null);
  };

  const addTask = (columnId) => {
    const title = prompt("Enter task title:");
    if (!title?.trim()) return;

    const newTask = { id: Date.now().toString(), title: title.trim() };
    setBoard((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }));
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        handleDragStart,
        handleDragOver,
        handleDrop,
        addTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
