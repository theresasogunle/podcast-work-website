import tw, { styled, css } from "twin.macro";
import { Link } from "~/components/Link";
import type { BaseColor } from "~/interfaces";
import CloseSVG from "~/assets/close.svg";
import ArrowSVG from "~/assets/arrow.svg";
import PlaySVG from "~/assets/play.svg";
import PauseSVG from "~/assets/pause.svg";
import PrevSVG from "~/assets/prev.svg";
import NextSVG from "~/assets/next.svg";
import BurgerSVG from "~/assets/burger.svg";
import MoreSVG from "~/assets/more.svg";
import PlusSVG from "~/assets/plus.svg";
import MinusSVG from "~/assets/minus.svg";

type State = "idle" | "active";

type Variant = BaseColor | "grey";

type Control = "play" | "pause" | "prev" | "next";

type Icon = "burger" | "close" | "more" | "arrow" | "plus" | "minus" | Control;

type Mode = "dark" | "light";

interface Props {
  onClick?: () => void;
  href?: string;
  variant: Variant;
  icon: Icon;
  text?: string;
  state?: State;
  mode?: Mode;
}

const ButtonContent = styled.div<{ $mode: Mode }>`
  ${tw`inline-flex items-center justify-center uppercase relative w-full h-full pointer-events-none`}
  z-index: 1;
  ${({ $mode }) => ($mode === "light" ? tw`text-white` : tw`text-black`)};
`;

const HoverState = css`
  &:before {
    opacity: 0;
  }

  &:after {
    opacity: 0;
  }

  ${ButtonContent} {
    transform: translate(5px, 5px);
  }
`;

const ActiveState = css`
  ${ButtonContent} {
    box-shadow: inset 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const StyledButton = styled.button<{ $variant: Variant; $state: State }>`
  ${tw`text-white select-none w-full h-full`}
  -webkit-tap-highlight-color: transparent;
  transform: translate(-5px, -5px);

  &:before {
    ${tw`content absolute left-0`}
    right: -5px;
    bottom: -5px;
    height: 5px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 5px 100%);
  }

  &:after {
    ${tw`content absolute top-0`}
    bottom: -5px;
    right: -5px;
    width: 5px;
    clip-path: polygon(0 0, 100% 5px, 100% 100%, 0 94%);
  }

  @media (hover: hover) {
    &:hover {
      ${HoverState}
    }
  }

  ${({ $state, $variant }) =>
    $state === "active" &&
    css`
      ${HoverState}
      ${$variant !== "white" && ActiveState}
    `}

  ${({ $variant, $state }) => {
    switch ($variant) {
      case "red":
        return css`
          ${ButtonContent} {
            ${tw`bg-red`}
          }
          &:before {
            background-color: #750000;
          }
          &:after {
            background-color: #ae0000;
          }
        `;
      case "grey":
        return css`
          ${ButtonContent} {
            ${tw`bg-grey`}
          }
          &:before {
            ${tw`bg-black`}
          }
          &:after {
            ${tw`bg-black`}
          }
        `;
      case "white":
        return css`
          ${ButtonContent} {
            ${tw`bg-white text-black`}
          }
          &:before {
            background-color: #bbbbbb;
          }
          &:after {
            background-color: #e8e8e8;
          }
        `;
    }
  }}
`;

const TextContainer = tw.div`mr-8 text-14 md:text-16`;

const IconContainer = styled.div<{ $isArrow: boolean }>`
  ${tw`pointer-events-none`}
  ${({ $isArrow }) => $isArrow && tw`rotate-90 md:rotate-0`}
`;

const icons = {
  burger: <BurgerSVG />,
  close: <CloseSVG />,
  more: <MoreSVG />,
  arrow: <ArrowSVG />,
  play: <PlaySVG />,
  pause: <PauseSVG />,
  prev: <PrevSVG />,
  next: <NextSVG />,
  plus: <PlusSVG />,
  minus: <MinusSVG />,
} as const;

export const Button: React.FC<Props> = ({
  text,
  icon,
  state = "idle",
  variant,
  mode = "light",
  onClick,
  href,
  ...rest
}) => {
  const isLink = !!href;

  if (isLink) {
    return (
      <StyledButton $variant={variant} $state={state} href={href!} as={Link} {...rest}>
        <ButtonContent $mode={mode}>
          {text && <TextContainer>{text}</TextContainer>}
          <IconContainer $isArrow={icon === "arrow"}>{icons[icon]}</IconContainer>
        </ButtonContent>
      </StyledButton>
    );
  }

  return (
    <StyledButton $variant={variant} $state={state} onClick={onClick} {...rest}>
      <ButtonContent $mode={mode}>
        {text && <TextContainer>{text}</TextContainer>}
        <IconContainer $isArrow={icon === "arrow"}>{icons[icon]}</IconContainer>
      </ButtonContent>
    </StyledButton>
  );
};
