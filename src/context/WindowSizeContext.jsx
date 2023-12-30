import { createContext, useContext, useState, useEffect } from "react";
import { Logger } from "../util/Logger";

export const WindowSizeContext = createContext({});
WindowSizeContext.displayName = "WindowSizeContext";

export const WindowSizeContextProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    (() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    })();
  }, []);

  if (windowSize) {
    return (
      <WindowSizeContext.Provider value={windowSize}>
        <Logger
          type="render"
          target="context"
          name="Window.Size.Context.Provider"
          level={0}
        />
        {/* <Logger */}
        {/*   type="value" */}
        {/*   name="WindowSizeContextProvider > windowSize" */}
        {/*   value={windowSize} */}
        {/* /> */}
        {children}
      </WindowSizeContext.Provider>
    );
  }
};

export const useWindowSize = () => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error("useWindowSize must be used within WindowSizeContext");
  }
  return context;
};
