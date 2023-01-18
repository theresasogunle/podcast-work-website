import { css } from "twin.macro";

export const TilesStyle = css`
  background-size: var(--cell-width) var(--cell-height);
  background-position: -1px -1px;
  background-image: linear-gradient(to right, var(--border-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
`;
