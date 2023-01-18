import tw, { styled, css } from "twin.macro";
import { keyframes } from "styled-components";
import { useRouter } from "next/router";
import { ColorStyle } from "~/styles/ColorStyle";
import { Link } from "~/components/Link";
import { usePodcastByDay } from "~/contexts/Podcast";
import { formatDate } from "~/utils/common";
import type { BaseColor, PodcastState } from "~/interfaces";
import PlaySVG from "~/assets/play.svg";
import PauseSVG from "~/assets/pause.svg";

type Variant = BaseColor;

interface Props {
  variant: Variant;
  day: string;
  text?: string;
}

const blinkAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const IconContainer = styled.div<{ $hide: boolean }>`
  ${tw`absolute left-6 bottom-6`}

  @media (hover: hover) {
    transition: transform 350ms ease;
  }

  svg {
    width: 2.5rem;
  }

  ${({ $hide }) => $hide && "transform: translateY(calc(100% + 2px))"}
`;

const Container = styled(Link)<{ $variant: Variant; $disableNoise: boolean; $state: PodcastState }>`
  ${tw`relative flex items-center justify-center h-full w-full overflow-hidden`}
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  &:before {
    ${tw`content absolute h-10 w-10 z-10 top-8 left-8 rounded-full`}
    animation: ${blinkAnimation} 1.5s infinite;
  }

  ${({ $state }) => {
    switch ($state) {
      case "playing":
        return css`
          &:before {
            ${tw`content absolute h-10 w-10 z-10 top-8 left-8 rounded-full`}
            animation-play-state: playing;
          }
        `;
      case "played":
        return css`
          &:before {
            ${tw`hidden`}
          }
        `;
      case "paused":
        return css`
          &:before {
            ${tw`content absolute left-0  top-0 z-10 h-12 w-12 rounded-none `}
            clip-path: polygon(0 0, 0% 100%, 100% 0);
            animation: none;
          }
        `;
    }
  }}

  &:before {
    background-color: currentColor;
  }

  @media (hover: hover) {
    &:hover {
      ${IconContainer} {
        ${tw`transform translate-y-0`}
      }
    }
  }

  ${ColorStyle}
`;

const DayText = tw.div`text-60 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`;

const Text = tw.p`absolute bottom-8 text-16 font-serif right-8`;

export const Day: React.FC<Props> = ({ day, text, variant, ...rest }) => {
  const router = useRouter();
  const date = new Date(day);
  const contextDay = usePodcastByDay(date);

  return (
    <Container
      id={day}
      aria-label={`Day ${day}`}
      $variant={variant}
      $disableNoise
      $state={contextDay?.state}
      href={`/#t=${day}`}
      {...rest}
    >
      <IconContainer $hide={contextDay?.state !== "playing"}>
        {contextDay?.state === "playing" ? <PauseSVG /> : <PlaySVG />}
      </IconContainer>
      <DayText>{date.getDate()}</DayText>
      <Text>{formatDate(date, router.locale, { weekday: "long" })}</Text>
    </Container>
  );
};
