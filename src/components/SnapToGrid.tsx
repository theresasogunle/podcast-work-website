import { useEffect, useRef } from "react";
import { useGridContext } from "~/contexts/Grid";

interface Props {
  snapWidth?: boolean;
  snapHeight?: boolean;
  snapPosition?: boolean;
  roundValues?: boolean;
}

export const SnapToGrid: React.FC<Props> = ({
  snapWidth = true,
  snapHeight = true,
  snapPosition = true,
  roundValues = false,
  ...rest
}) => {
  const { cellWidth, cellHeight } = useGridContext(roundValues);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    /* Clear all styles from the element before request the element bounds */

    wrapperRef.current.removeAttribute("style");

    if (snapWidth || snapHeight) {
      /** BEGIN SIZE */

      /*
        The desidered size is easily obtained once we know the cell size
        and element width and height;

        The two steps need to be applied individually since
        changing the width can affect the desidered height of the element
      */

      let bounds = wrapperRef.current.getBoundingClientRect();

      if (snapWidth) {
        /** BEGIN WIDTH */

        // Subtract 1px for border style
        const width = cellWidth * Math.ceil(bounds.width / cellWidth) - 1;

        wrapperRef.current.style.setProperty("width", `${width}px`);

        /** END WIDTH */
      }

      if (snapHeight) {
        /** BEGIN HEIGHT */

        bounds = wrapperRef.current.getBoundingClientRect();

        // Subtract 1px for border style
        const height = cellHeight * Math.ceil(bounds.height / cellHeight) - 1;

        wrapperRef.current.style.setProperty("height", `${height}px`);

        /** END HEIGHT */
      }

      /** END SIZE */
    }

    if (snapPosition) {
      /** BEGIN OFFSET */

      /*
      The offset is obtained with the difference between the current position
      and the desidered position.

      getBoundingClientRect returns the bounds based on the top left browser window,
      so we need to subtract the parent bounds.
    */

      const bounds = wrapperRef.current.getBoundingClientRect();

      let x = bounds.x;
      let y = bounds.y;

      const closestGrid = wrapperRef.current.closest("[data-grid]");

      if (closestGrid) {
        const parentBounds = closestGrid.getBoundingClientRect();
        x -= parentBounds.x;
        y -= parentBounds.y;
      }

      const nearestCell = {
        x: Math.round(x / cellWidth),
        y: Math.round(y / cellHeight),
      };

      const offset = {
        x: cellWidth * nearestCell.x - x,
        y: cellHeight * nearestCell.y - y,
      };

      wrapperRef.current.style.setProperty("transform", `translate3d(${offset.x}px, ${offset.y}px, 0)`);

      /** END OFFSET */
    }
  }, [cellWidth, cellHeight, snapWidth, snapHeight, snapPosition]);

  return <div ref={wrapperRef} {...rest} />;
};
