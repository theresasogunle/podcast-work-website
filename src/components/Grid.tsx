import { styled, css } from "twin.macro";
import { motion } from "framer-motion";
import { ColorStyle } from "~/styles/ColorStyle";
import { TilesStyle } from "~/styles/TilesStyle";
import type { BaseColor } from "~/interfaces";
import { useGridContext } from "~/contexts/Grid";

type BackgroundColor = BaseColor;

interface Props {
  variant: BackgroundColor;
  as?: React.FC | keyof JSX.IntrinsicElements;
  roundValues?: boolean;
  hasTiles?: boolean;
}

export const GridHelper = css<{ $cellWidth?: number; $cellHeight?: number; $offsetX?: number; $offsetY?: number }>`
  ${({ $cellWidth }) =>
    $cellWidth &&
    css`
      width: calc(var(--cell-width) * ${$cellWidth});
    `}

  ${({ $cellHeight }) =>
    $cellHeight &&
    css`
      height: calc(var(--cell-height) * ${$cellHeight});
    `}

  ${({ $offsetX = 0, $offsetY = 0 }) => css`
    transform: translate3d(calc(var(--cell-width) * ${$offsetX}), calc(var(--cell-height) * ${$offsetY}), 0px);
  `}
`;

const StyledGrid = styled(motion.div)<{ $variant: BackgroundColor; $hasTiles: boolean }>`
  position: relative;
  ${ColorStyle}

  ${({ $hasTiles }) => $hasTiles && TilesStyle}
`;

export const Grid: React.FC<Props> = ({ variant, as, roundValues, hasTiles = true, ...props }) => {
  const { cellWidth, cellHeight } = useGridContext();

  const roundedCustomProperties = {
    "--cell-height": Math.round(cellHeight) + "px",
    "--cell-width": Math.round(cellWidth) + "px",
  };

  return (
    <StyledGrid
      $variant={variant}
      data-grid
      as={as}
      // @ts-ignore
      style={roundValues ? roundedCustomProperties : undefined}
      $hasTiles={hasTiles}
      {...props}
    />
  );
};
