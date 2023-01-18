import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";
import { up } from "~/utils/screens";
import { BASE_CELL_SIZE } from "~/hooks/useGridData";

const CustomStyles = createGlobalStyle`
  html {
    ${tw`bg-white text-black cursor-default leading-none min-h-full`}
  }

  body {
    ${tw`font-sans text-16 md:text-base antialiased overscroll-none`}
  }

  [data-scrollbar] {
    ${tw`h-full`}
  }

  .scroll-content,
  .scroll-content > div {
    ${tw`h-full`}
  }

  :root {
    --frame-size: 20px;
    --cell-width: ${BASE_CELL_SIZE}px;
    --cell-height: ${BASE_CELL_SIZE}px;

    ${up("md")} {
      --frame-size: 24px;
      font-size: min(1.1vh, 10px);
    }
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);
