import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log(history, mode)

  const transition = (newMode, replace) => {
    if (replace) {
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory.pop()
        return [...newHistory, newMode]
      });
      setMode(newMode);
    } else {
      setHistory(prevHistory => [...prevHistory, newMode]);
      setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory(prevHistory => {
        prevHistory = [...history];
        prevHistory.pop();
        return prevHistory;
      })
    }
  }
  return { mode, transition, back, setMode }
}

export default useVisualMode;


