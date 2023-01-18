import { useWindowSize } from "~/hooks/useWindowSize";
import { usePropertyValue } from "~/hooks/usePropertyValue";
import { up } from "~/utils/screens";
import { useMediaQuery } from "~/hooks/useMediaQuery";

const RELATIVE_NUMBER_OF_COLS = 20;
const RELATIVE_NUMBER_OF_ROWS = 11;
export const BASE_CELL_SIZE = 60;

export const useGridData = () => {
  const { width, height } = useWindowSize();
  const frameSize = usePropertyValue("--frame-size");

  const isXs = useMediaQuery(up("xs"));
  const isSm = useMediaQuery(up("sm"));
  const isMd = useMediaQuery(up("md"));

  let rows = 0;
  let cellHeight = 0;
  let cols = 0;
  let cellWidth = 0;

  if (isMd) {
    rows = 12;
    cellHeight = height ? (height - frameSize * 2) / rows : BASE_CELL_SIZE;
    cols = width ? Math.floor(width / cellHeight) : RELATIVE_NUMBER_OF_COLS;
    cellWidth = width ? (width - frameSize * 2) / cols : BASE_CELL_SIZE;
  } else if (isSm) {
    cols = 10;
    cellWidth = width ? (width - frameSize * 2) / cols : BASE_CELL_SIZE;
    rows = width ? Math.floor(height / cellWidth) : RELATIVE_NUMBER_OF_COLS;
    cellHeight = height ? (height - frameSize * 2) / rows : BASE_CELL_SIZE;
  } else if (isXs) {
    cols = 8;
    cellWidth = width ? (width - frameSize * 2) / cols : BASE_CELL_SIZE;
    rows = width ? Math.floor(height / cellWidth) : RELATIVE_NUMBER_OF_COLS;
    cellHeight = height ? (height - frameSize * 2) / rows : BASE_CELL_SIZE;
  } else {
    cols = 6;
    cellWidth = width ? (width - frameSize * 2) / cols : BASE_CELL_SIZE;
    rows = width ? Math.floor(height / cellWidth) : RELATIVE_NUMBER_OF_COLS;
    cellHeight = height ? (height - frameSize * 2) / rows : BASE_CELL_SIZE;
  }

  const getRow = (row: number) => Math.round((row / RELATIVE_NUMBER_OF_ROWS) * rows);

  const getCol = (col: number) => Math.round((col / RELATIVE_NUMBER_OF_COLS) * cols);

  return {
    cols,
    rows,
    getRow,
    getCol,
    cellWidth: Number(cellWidth.toFixed(2)),
    cellHeight: Number(cellHeight.toFixed(2)),
  };
};
