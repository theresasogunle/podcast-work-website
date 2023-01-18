import { Grid } from "@madebywild/styled-grid";
import tw, { styled } from "twin.macro";
import type { BaseColor } from "~/interfaces";

type MonthBackgroundColor = BaseColor;

export const MonthContainer = styled(Grid.Item)<{ $variant: MonthBackgroundColor }>`
  ${tw`bg-black text-white z-10 uppercase h-full lg:h-auto font-bold text-24 lg:text-32 flex items-center justify-center lg:mr-120 lg:px-40 self-center`}
  ${({ $variant }) => $variant === "black" && tw`bg-white text-black`}
`;
