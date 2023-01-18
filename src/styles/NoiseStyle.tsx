import tw, { css } from "twin.macro";

export const NoiseStyle = css`
  &:after {
    ${tw`content absolute inset-0 w-full h-full opacity-10 pointer-events-none`}
    background: url("/images/noise.gif") repeat 0 0;
    background-size: 100px;
  }
`;
