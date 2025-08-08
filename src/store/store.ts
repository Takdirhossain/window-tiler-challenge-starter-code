import { makeAutoObservable } from "mobx";

export interface WindowData {
  id: number;
  x: number;
  y: number;
  bgColor: string;
}

class WindowStore {
  windows: WindowData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private getRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  }

  private getRandomPosition(): { x: number; y: number } {
    const x = Math.floor(Math.random() * (window.innerWidth - 220));
    const y = Math.floor(window.innerHeight * Math.random() * 0.8);
    return { x, y };
  }

  addWindow() {
    const { x, y } = this.getRandomPosition();
    const bgColor = this.getRandomColor();
    this.windows.push({
      id: Date.now(),
      x,
      y,
      bgColor,
    });
  }

  removeWindow(id: number) {
    this.windows = this.windows.filter((w) => w.id !== id);
  }

  moveWindow(id: number, x: number, y: number) {
    const win = this.windows.find((w) => w.id === id);
    if (win) {
      win.x = x;
      win.y = y;
    }
  }
}

export const windowStore = new WindowStore();
