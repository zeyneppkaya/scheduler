import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, err) => {
    if (err) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(prevHistory => [...newHistory, newMode]);
      setMode(newMode);
    } else {
      setHistory(prevHistory => [...prevHistory, newMode]);
      setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back, setMode }
}

export default useVisualMode;


