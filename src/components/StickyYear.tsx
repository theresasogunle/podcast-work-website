import tw, { styled } from "twin.macro";
import { useState } from "react";
import { Link } from "~/components/Link";
import { useStickyYearContext } from "~/contexts/StickyYear";

const Container = styled.div`
  ${tw`w-full h-full hidden lg:flex relative pointer-events-none`}

  & > * {
    pointer-events: auto;
  }
`;

const Year = styled.div<{ $active: boolean; $bgColor: string }>`
  ${tw`text-72 flex absolute items-center font-grotesk font-bold justify-center text-center border-t border-r border-black`}
  transition: transform 400ms ease;
  margin-top: -1px;
  height: calc(100% + 1px);

  ${({ $active }) => $active && tw`z-10`}

  ${({ $bgColor }) => {
    switch ($bgColor) {
      case "white":
        return tw`bg-white text-black`;
      case "red":
        return tw`bg-red text-black`;
      case "black":
        return tw`bg-black text-white`;
    }
  }};
`;

const YearOne = styled(Year)`
  ${tw`bg-white`}
  width: calc(100% / 3);
`;

const YearTwo = styled(Year)<{ $move: boolean }>`
  ${tw`w-1/3`}

  ${({ $move }) => $move && `transform: translateX(100%)`}
`;

const YearThree = styled(Year)<{ $move: boolean }>`
  ${tw`w-1/3`}

  ${({ $move }) => $move && `transform: translateX(200%)`}
`;

export const StickyYear: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { year } = useStickyYearContext();

  return (
    <Container onMouseLeave={() => setIsOpen(false)}>
      <Link href="#t=1942" onMouseEnter={() => setIsOpen(true)}>
        <YearOne $active={year === "1942"} $bgColor="white">
          <div>1942</div>
        </YearOne>
      </Link>
      <Link href="#t=1943" onMouseEnter={() => setIsOpen(true)}>
        <YearTwo $move={isOpen} $active={year === "1943"} $bgColor="red">
          <div>1943</div>
        </YearTwo>
      </Link>
      <Link href="#t=1944" onMouseEnter={() => setIsOpen(true)}>
        <YearThree $move={isOpen} $active={year === "1944"} $bgColor="black">
          <div>1944</div>
        </YearThree>
      </Link>
    </Container>
  );
};
