import tw, { styled, css } from "twin.macro";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useMenuContext } from "~/contexts/Menu";
import { NoiseStyle } from "~/styles/NoiseStyle";
import type { WaveBackgroundColor, WaveColor } from "~/interfaces";
import { usePlayingPodcast } from "~/contexts/Podcast";
import { useWaveContext } from "~/contexts/Wave";
import { useStickyYearContext } from "~/contexts/StickyYear";
import Soundwave from "~/assets/wave.svg";

const Wrapper = styled.div<{
  $waveBackgroundColor: WaveBackgroundColor;
  $waveColor: WaveColor;
  $addBorders: boolean;
}>`
  ${tw`hidden lg:flex items-center justify-center relative w-full h-full overflow-hidden`}
  margin-top: -1px;
  height: calc(100% + 1px);
  transition: background-color 250ms ease, color 250ms ease;

  ${({ $addBorders }) => $addBorders && tw`border-t border-r`}

  ${({ $waveBackgroundColor }) => {
    switch ($waveBackgroundColor) {
      case "red":
        return css`
          ${tw`bg-red border-black`}
          ${NoiseStyle}
        `;
      case "white":
        return tw`bg-white border-black`;
      case "black":
        return css`
          ${tw`bg-black`}
          border-color: rgba(255, 255, 255, 0.3);
        `;

      case "transparent":
        return tw`bg-transparent`;
    }
  }}

  ${({ $waveColor }) => {
    switch ($waveColor) {
      case "white":
        return tw`text-white`;
      case "black":
        return tw`text-black`;
    }
  }}
`;

const Container = styled(motion.div)`
  ${tw`flex absolute`};
  width: 200%;
  left: 0;
`;

const variants = {
  running: {
    x: ["0%", "-44%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "linear",
      },
    },
  },
  paused: {
    x: "-44%",
    transition: {
      x: {
        duration: 0.8,
        ease: "circOut",
      },
    },
  },
};

export const Wave: React.FC = () => {
  const { isMenuOpen } = useMenuContext();
  const { waveBackgroundColor, waveColor, addBorders } = useWaveContext();
  const { year } = useStickyYearContext();
  const isPodcastPlaying = usePlayingPodcast();

  const controls = useAnimation();

  const waveTheme = {
    background: year === "1942" ? "white" : year === "1943" ? "red" : year === "1944" ? "black" : waveBackgroundColor,
    color: year === "1942" || year === "1943" ? "black" : year === "1944" ? "white" : waveColor,
  };

  useEffect(() => {
    if (isPodcastPlaying) {
      controls.start("running");
    } else {
      controls.start("paused");
    }
  }, [controls, isPodcastPlaying]);

  return (
    <Wrapper
      $waveBackgroundColor={isMenuOpen ? "transparent" : waveTheme.background}
      $waveColor={isMenuOpen ? "black" : waveTheme.color}
      $addBorders={!isMenuOpen && addBorders}
    >
      <Container variants={variants} animate={controls}>
        <Soundwave />
        <Soundwave css={{ transform: "translateX(-12%)" }} />
      </Container>
    </Wrapper>
  );
};
