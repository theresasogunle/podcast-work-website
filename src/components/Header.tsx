import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useMenuContext } from "~/contexts/Menu";
import { GridHelper } from "~/components/Grid";
import { Menu } from "~/components/Menu";
import { PodcastList } from "~/components/PodcastList";
import { Link } from "~/components/Link";
import { Button } from "~/components/Button";
import { PodcastPlayer } from "~/components/PodcastPlayer";
import { NoiseStyle } from "~/styles/NoiseStyle";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { up } from "~/utils/screens";
import Logo from "~/assets/logo.svg";
import { useSelectedPodcast, usePodcasts } from "~/contexts/Podcast";

type MenuButtonMode = "dark" | "light";

type LogoTheme = "white" | "red";

interface Props {
  menuButtonIconMode: MenuButtonMode;
  logoTheme: LogoTheme;
  showLogo: boolean;
  showPodcastList: boolean;
}

const Resize = css`
  width: calc(100% - 1px);
  height: calc(100% - 1px);
`;

const StyledHeader = styled.header`
  ${tw`fixed inset-x-0 top-0 flex pointer-events-none z-40`}
  padding: var(--frame-size) var(--frame-size) 0 var(--frame-size);
`;

const LogoContainer = styled(motion.div)<{
  $theme: LogoTheme;
  $cellWidth?: number;
  $cellHeight?: number;
}>`
  ${tw`bg-white w-full relative border-b border-r z-10 pointer-events-auto flex items-center justify-center border-t`}

  ${GridHelper}

  ${({ $theme }) => {
    switch ($theme) {
      case "white":
        return tw`bg-white`;
      case "red":
        return css`
          ${tw`bg-red`}
          ${NoiseStyle}
        `;
    }
  }};
`;

const MenuButtonContainer = styled.div<{ $addBorderTopLeft: boolean; $cellWidth: number; $cellHeight: number }>`
  ${tw`z-10 flex-shrink-0 pointer-events-auto border`}
  ${Resize}
  ${GridHelper}

  ${({ $addBorderTopLeft }) => $addBorderTopLeft && tw`border-l border-t`}
`;

const PodcastListButtonContainer = styled.div<{ $cellWidth: number; $cellHeight: number }>`
  ${tw`hidden sm:block z-10 flex-shrink-0 pointer-events-auto`}
  ${GridHelper}
`;

const PodcastPlayerContainer = styled.div`
  ${tw`z-10 ml-auto fixed lg:relative lg:inset-0 pointer-events-auto`}
  bottom: var(--frame-size);
  left: var(--frame-size);
  right: var(--frame-size);
`;

const PodcastListContainer = styled.div<{ $cellWidth?: number; $cellHeight: number; $offsetY: number }>`
  ${tw`absolute lg:left-auto`}
  left: var(--frame-size);
  right: var(--frame-size);
  ${GridHelper}
`;

const PodcastContainer = styled(motion.div)`
  ${tw`ml-auto flex`}
`;

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Header: React.FC<Props> = ({ showLogo, showPodcastList, menuButtonIconMode, logoTheme }) => {
  const [isPodcastListOpen, setIsPodcastListOpen] = useState(false);
  const { isMenuOpen, setIsMenuOpen } = useMenuContext();
  const [triggerMenu, setTriggerMenu] = useState(false);
  const selectedPodcast = useSelectedPodcast();
  const podcasts = usePodcasts();
  const { events } = useRouter();

  const isSm = useMediaQuery(up("sm"));
  const isLg = useMediaQuery(up("lg"));

  const renderLogo = isMenuOpen || (isLg ? showLogo : true);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setTriggerMenu(false);
    };

    events.on("routeChangeComplete", handleRouteChangeStart);

    return () => {
      events.off("routeChangeComplete", handleRouteChangeStart);
    };
  }, [events, setIsMenuOpen]);

  return (
    <StyledHeader>
      <MenuButtonContainer $addBorderTopLeft={isMenuOpen} $cellWidth={1} $cellHeight={1}>
        <Button
          mode={menuButtonIconMode}
          variant="red"
          icon={isMenuOpen ? "close" : "burger"}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          state={isMenuOpen ? "active" : "idle"}
          onClick={() => setTriggerMenu((prev) => !prev)}
        />
      </MenuButtonContainer>
      <AnimatePresence initial={false}>
        {renderLogo && (
          <LogoContainer
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            $cellWidth={isSm ? 4 : undefined}
            $cellHeight={isSm ? 1 : undefined}
            $theme={isMenuOpen ? "white" : logoTheme}
          >
            <Link href="/" tw="w-full h-full">
              <Logo tw="w-full h-full" />
            </Link>
          </LogoContainer>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {!isMenuOpen && showPodcastList && (
          <PodcastContainer variants={variants} initial="initial" animate="animate" exit="exit">
            {selectedPodcast && (
              <PodcastPlayerContainer>
                <PodcastPlayer togglePodcastList={() => setIsPodcastListOpen((prev) => !prev)} />
              </PodcastPlayerContainer>
            )}
            <PodcastListButtonContainer $cellWidth={1} $cellHeight={1}>
              <Button
                variant="grey"
                icon={isPodcastListOpen ? "close" : "more"}
                aria-label={isPodcastListOpen ? "Close podcast list" : "Open podcast list"}
                state={isPodcastListOpen ? "active" : "idle"}
                onClick={() => setIsPodcastListOpen((prev) => !prev)}
                data-toggle-podcast-list
              />
            </PodcastListButtonContainer>
            <PodcastListContainer $cellWidth={isLg ? 8 : undefined} $cellHeight={6} $offsetY={1}>
              <PodcastList
                podcasts={podcasts}
                showSpeakerName
                open={isPodcastListOpen}
                close={() => setIsPodcastListOpen(false)}
              />
            </PodcastListContainer>
          </PodcastContainer>
        )}
      </AnimatePresence>
      <Menu trigger={triggerMenu} setTriggerOff={() => setTriggerMenu(false)} />
    </StyledHeader>
  );
};
