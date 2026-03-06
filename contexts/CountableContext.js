import { createContext, useEffect, useRef, useReducer } from "react";
import { loadCountables, saveCountables } from "../storage/CountableStorage";

export const CountableContext = createContext({});

export const CountableProvider = ({ children }) => {
  const countablesReducer = (countables, action) => {
    switch (action.type) {
      case "addedNew": {
        return [...countables, { name: action.name, count: 0 }];
      }
      case "changedCount": {
        const newState = [...countables];
        newState[action.index].count += action.amount;
        return newState;
      }
      case "loaded": {
        return action.countables;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  };

  const [countables, dispatch] = useReducer(countablesReducer, []);

  const changeCount = (amount, index) => {
    dispatch({
      type: "changedCount",
      amount,
      index,
    });
  };

  const addNewCountable = (name) => {
    dispatch({
      type: "addedNew",
      name,
    });
  };

  const isLoaded = useRef(false);

  useEffect(() => {
    loadCountables().then((result) => {
      dispatch({
        type: "loaded",
        countables: result,
      });
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
