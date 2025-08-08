import React from "react";
import { observer } from "mobx-react-lite";
import { windowStore } from "./store/store";
import Window from "./components/Window";

const App: React.FC = observer(() => {
  return (
    <div>
      <button
        onClick={() => windowStore.addWindow()}
        className="fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        type="button"
      >
        + Add Window
      </button>

      {windowStore.windows.map(({ id, x, y, bgColor }) => (
        <Window key={id} id={id} x={x} y={y} bgColor={bgColor} />
      ))}
    </div>
  );
});

export default App;
