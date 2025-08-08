import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { windowStore } from "../store/store";
import type { WindowData } from "../store/store";


interface WindowProps extends WindowData {}

const Window: React.FC<WindowProps> = observer(({ id, x, y, bgColor }) => {
  const [pos, setPos] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);

  function onMouseDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    windowStart.current = { ...pos };
  }

  function onMouseMove(e: MouseEvent<Document>) {
    if (!dragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    const newX = windowStart.current.x + deltaX;
    const newY = windowStart.current.y + deltaY;

    setPos({ x: newX, y: newY });
  }

  function onMouseUp() {
    if (dragging) {
      setDragging(false);
      windowStore.moveWindow(id, pos.x, pos.y);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove as any);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove as any);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, pos.x, pos.y, id]);

  return (
    <div
      className="fixed w-[200px] h-[200px] rounded shadow-lg select-none"
      style={{ left: pos.x, top: pos.y, zIndex: dragging ? 1000 : "auto" }}
    >
     
      <div
        className="bg-gray-400 p-2 cursor-move flex justify-between items-center rounded-t"
        onMouseDown={onMouseDown}
      >
        <span>Window</span>
        <button
          onClick={() => windowStore.removeWindow(id)}
          className="bg-red-500 text-white px-2 rounded hover:bg-red-700"
          type="button"
        >
          X
        </button>
      </div>

      <div
        className="w-full h-full rounded-b"
        style={{ backgroundColor: bgColor }}
      />
    </div>
  );
});

export default Window;
