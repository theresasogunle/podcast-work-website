import tw, { css } from "twin.macro";
import { NoiseStyle } from "~/styles/NoiseStyle";
import { BaseColor } from "~/interfaces";

type Color = BaseColor;

export const ColorStyle = css<{ $variant: Color; $disableNoise?: boolean }>`
  --border-color: currentColor;

  ${({ $variant, $disableNoise }) => {
    switch ($variant) {
      case "red":
        return css`
          ${!$disableNoise && NoiseStyle}
          ${tw`bg-red text-black`}
        `;
      case "black":
        return css`
          ${!$disableNoise && NoiseStyle}
          ${tw`text-white bg-black`}
          --border-color: rgba(255, 255, 255, 0.3);
        `;
      case "white":
        return css`
          ${tw`bg-white text-black`}
          &:before {
            ${tw`bg-red`}
          }
        `;
    }
  }}
`;
