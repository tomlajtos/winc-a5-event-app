import { createContext, useContext, useState } from "react";
import { Logger } from "../util/Logger";

export const ResizeContext = createContext({});
ResizeContext.displayName = "ResizeContext";

export const ResizeContextProvider = ({ children }) => {
  const bp1 = 768; // brake point 1
  const bp2 = 1024; // brake point 2
  const wiW = window.innerWidth;
  const initLayout = bp1 - wiW > 0 ? "min" : bp2 - wiW <= 0 ? "full" : "mid";
  const [menuLayout, setMenuLayout] = useState(initLayout);
  // const [docWidth, setDocWidth] = useState(window.innerWidth);

  const resizeObserver = new ResizeObserver((entry) => {
    const width = Math.round(entry[0].borderBoxSize[0].inlineSize);
    const fallbackWidth = Math.round(entry[0].contentRect.width);
    const layout = bp1 - width > 0 ? "min" : bp2 - width <= 0 ? "full" : "mid";

    // console.log("layout:", layout, "w", width);

    if (width) {
      setMenuLayout(layout);
    } else if (fallbackWidth) {
      setMenuLayout(layout);
    } else {
      return;
    }
  });

  resizeObserver.observe(document.querySelector("#root"));

  return (
    <ResizeContext.Provider value={{ menuLayout }}>
      <Logger
        type="render"
        target="context"
        name="Resize.Context.Provider"
        level={1}
      />
      {children}
    </ResizeContext.Provider>
  );
};

export const useResizeData = () => {
  const context = useContext(ResizeContext);
  if (!context) {
    throw new Error("useResizeData must be used within ResizeContext");
  }
  return context;
};
