import { createContext, useContext, useEffect } from "react";
import { useGridData } from "~/hooks/useGridData";

interface State {
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  getCol: (col: number) => number;
  getRow: (row: number) => number;
}

const Context = createContext({} as State);

export const GridContextProvider: React.FC = ({ children }) => {
  const { rows, cols, cellWidth, cellHeight, getRow, getCol } = useGridData();

  useEffect(() => {
    document.documentElement.style.setProperty("--cell-width", `${cellWidth}px`);
    document.documentElement.style.setProperty("--cell-height", `${cellHeight}px`);

    return () => {
      document.documentElement.style.removeProperty("--cell-width");
      document.documentElement.style.removeProperty("--cell-height");
    };
  }, [cellWidth, cellHeight]);

  return (
    <Context.Provider
      value={{
        rows,
        cols,
        cellWidth,
        cellHeight,
        getRow,
        getCol,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGridContext = (roundValues?: boolean) => {
  const { cellWidth, cellHeight, ...context } = useContext(Context);

  return {
    cellWidth: roundValues ? Math.round(cellWidth) : cellWidth,
    cellHeight: roundValues ? Math.round(cellHeight) : cellHeight,
    ...context,
  };
};
