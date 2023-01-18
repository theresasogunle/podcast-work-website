import tw, { styled, css } from "twin.macro";
import SmoothScrollbar from "smooth-scrollbar";
import ReactSmoothScrollbar from "react-smooth-scrollbar";
import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import HorizontalScrollPlugin from "~/plugins/HorizontalScrollPlugin";
import { usePodcastContext } from "~/contexts/Podcast";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { real100vh } from "~/hooks/use100vh";
import { useSmoothScrollbarContext } from "~/contexts/SmoothScrollbar";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { up } from "~/utils/screens";
import type { BaseColor } from "~/interfaces";

SmoothScrollbar.use(HorizontalScrollPlugin);

type BackgroundColor = BaseColor;

type ScrollDirection = "vertical" | "horizontal";

type MenuButtonMode = "dark" | "light";

type LogoTheme = "white" | "red";

interface Props {
  scrollDirection: ScrollDirection;
  showElements: boolean;
  showPodcastList: boolean;
  menuButtonIconMode: MenuButtonMode;
  showLogo: boolean;
  logoTheme: LogoTheme;
  variant: BackgroundColor;
}

const ScrollContainer = styled.div<{ $scrollDirection: ScrollDirection }>`
  ${tw`relative`}
  margin: var(--frame-size);
  width: calc(100vw - var(--frame-size) * 2);

  ${up("lg")} {
    height: calc(${real100vh} - var(--frame-size) * 2);
  }

  ${({ $scrollDirection }) => $scrollDirection === "horizontal" && tw`whitespace-nowrap`}
`;

const Intro = styled(motion.div)`
  ${tw`fixed inset-0 z-50 bg-white`}
`;

const StyledFrame = styled.div<{ $variant: BackgroundColor }>`
  ${tw`fixed inset-x-0 top-0 z-30 pointer-events-none h-full`}
  border: var(--frame-size) solid;

  ${({ $variant }) => {
    switch ($variant) {
      case "red":
        return css`
          ${tw`border-red`}
          box-shadow: inset 0 0 0 1px black;
        `;
      case "black":
        return css`
          ${tw`border-black`}
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
        `;
      case "white":
        return css`
          ${tw`border-white`}
          box-shadow: inset 0 0 0 1px black;
        `;
    }
  }}
`;

export const DefaultPage: React.FC<Props> = ({
  scrollDirection,
  showElements,
  showPodcastList,
  menuButtonIconMode,
  showLogo,
  logoTheme,
  children,
  variant,
}) => {
  const scrollbarRef = useRef<ReactSmoothScrollbar | null>(null);
  const { setScrollbar } = useSmoothScrollbarContext();
  const { togglePodcastByDay } = usePodcastContext();
  const [showIntro, setShowIntro] = useState(true);
  const router = useRouter();
  const isLg = useMediaQuery(up("lg"));

  const direction = !isLg ? "vertical" : scrollDirection;

  const isValidDateFromId = (id: string) => {
    return id.split("/").length === 3;
  };

  const getId = () => window.location.hash.replace("#t=", "");

  const scrollToActiveHash = useCallback(() => {
    if (window.location.hash === "") return;

    setTimeout(() => {
      const id = getId();
      const target = document.getElementById(id);

      if (!target) return;

      const { width } = target.getBoundingClientRect();
      const offsetLeft = isValidDateFromId(id) ? window.innerWidth / 2 - width / 2 : 0;

      if (scrollbarRef.current) {
        scrollbarRef.current.scrollbar.scrollIntoView(target, { offsetLeft });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 0);
  }, []);

  useEffect(() => {
    const onChange = () => {
      if (window.location.hash === "") return;
      const id = getId();

      if (isValidDateFromId(id)) {
        const date = new Date(id);
        togglePodcastByDay(date);
      }

      scrollToActiveHash();
    };

    router.events.on("hashChangeComplete", onChange);
    router.events.on("routeChangeComplete", onChange);

    return () => {
      router.events.off("hashChangeComplete", onChange);
      router.events.off("routeChangeComplete", onChange);
    };
  }, [router.events, togglePodcastByDay, scrollToActiveHash]);

  useEffect(() => {
    scrollToActiveHash();
  }, [scrollToActiveHash]);

  useEffect(() => {
    // set smooth-scrollbar inside the context
    setScrollbar(scrollbarRef.current?.scrollbar);
  }, [scrollbarRef, setScrollbar, isLg]);

  useEffect(() => {
    setShowIntro(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && <Intro initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }} />}
      </AnimatePresence>
      <Header
        menuButtonIconMode={menuButtonIconMode}
        showLogo={showLogo}
        showPodcastList={showPodcastList}
        logoTheme={logoTheme}
      />
      <StyledFrame $variant={variant} />
      <main>
        <ScrollContainer $scrollDirection={direction}>
          {isLg ? (
            <ReactSmoothScrollbar
              ref={scrollbarRef}
              plugins={{
                horizontalScroll: {
                  active: scrollDirection === "horizontal",
                },
              }}
            >
              {children}
            </ReactSmoothScrollbar>
          ) : (
            children
          )}
        </ScrollContainer>
      </main>
      <Footer showElements={showElements} />
    </>
  );
};
