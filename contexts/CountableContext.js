import { createContext, useEffect, useRef, useState } from "react";
import { loadCountables, saveCountables } from "../storage/CountableStorage";

export const CountableContext = createContext({});

export const CountableProvider = ({ children }) => {
  const [countables, setCountables] = useState([]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };

  const isLoaded = useRef(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      isLoaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    saveCountables(countables);
  }, [countables]);

  return (
    <CountableContext value={{ countables, changeCount, addNewCountable }}>
      {children}
    </CountableContext>
  );
};
