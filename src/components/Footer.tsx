import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { StickyYear } from "~/components/StickyYear";
import { Wave } from "~/components/Wave";
import { Social } from "~/components/Social";
import { GridHelper } from "~/components/Grid";
import { useMenuContext } from "~/contexts/Menu";
import { useStickyYearContext } from "~/contexts/StickyYear";

interface Props {
  showElements: boolean;
}

const StyledFooter = styled.footer<{ $disablePointerEvents: boolean; $increaseZIndex: boolean }>`
  ${tw`fixed inset-x-0 bottom-0 flex items-end`}
  padding: 0 var(--frame-size) var(--frame-size) var(--frame-size);

  ${({ $disablePointerEvents }) => $disablePointerEvents && tw`pointer-events-none`}
  ${({ $increaseZIndex }) => ($increaseZIndex ? tw`z-40` : tw`z-20`)}
`;

const WaveContainer = styled.div<{ $cellWidth: number; $cellHeight: number }>`
  ${tw`hidden md:block z-10`}
  ${GridHelper}
`;

const StickyYearContainer = styled(motion.div)<{ $cellWidth: number; $cellHeight: number; $show: boolean }>`
  ${GridHelper}
  transition: transform 550ms ease;

  ${({ $show }) => ($show ? "transform: translateX(0)" : "transform: translateX(-100%)")}
`;

const SocialContainer = styled(motion.div)`
  ${tw`w-full md:w-auto md:ml-auto`}
`;

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Footer: React.FC<Props> = ({ showElements }) => {
  const { isMenuOpen } = useMenuContext();
  const { show } = useStickyYearContext();

  return (
    <StyledFooter $disablePointerEvents={!isMenuOpen} $increaseZIndex={isMenuOpen}>
      <WaveContainer $cellWidth={3} $cellHeight={2}>
        <Wave />
      </WaveContainer>
      {isMenuOpen && (
        <SocialContainer variants={variants} initial="initial" animate="animate" exit="exit">
          <Social />
        </SocialContainer>
      )}
      {!isMenuOpen && showElements && (
        <StickyYearContainer $show={show} $cellWidth={9} $cellHeight={2}>
          <StickyYear />
        </StickyYearContainer>
      )}
    </StyledFooter>
  );
};
