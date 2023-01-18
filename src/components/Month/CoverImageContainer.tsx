import tw, { styled, css } from "twin.macro";
import { Grid } from "@madebywild/styled-grid";
import { NoiseStyle } from "~/styles/NoiseStyle";
import type { BaseColor } from "~/interfaces";

type MonthBackgroundColor = BaseColor;

export const CoverImageContainer = styled(Grid.Item)<{
  $hasHover: boolean;
  $variant: MonthBackgroundColor;
  $decreasePadding?: boolean;
}>`
  ${tw`relative flex p-24 md:p-32 flex-col overflow-hidden`}

  ${({ $variant }) => $variant === "white" && NoiseStyle}

  ${({ $hasHover }) =>
    $hasHover &&
    css`
      img {
        transition: transform 600ms ease;
      }

      &:hover img {
        transform: scale(1.04);
      }
    `}

  ${({ $decreasePadding }) => ($decreasePadding ? tw`md:p-10` : tw`md:p-32`)}
`;
