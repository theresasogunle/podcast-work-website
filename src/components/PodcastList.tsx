import tw, { styled } from "twin.macro";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactSmoothScrollbar from "react-smooth-scrollbar";
import { useKey } from "react-use";
import { useRouter } from "next/router";
import { Link } from "~/components/Link";
import { useOnClickOutside } from "~/hooks/useClickOutside";
import { formatDate, getIdByDate } from "~/utils/common";
import type { State } from "~/contexts/Podcast";

interface Props {
  open: boolean;
  podcasts?: State;
  showSpeakerName?: boolean;
  close?: () => void;
}

const Container = styled(motion.div)`
  ${tw`text-white w-full h-full border border-black pointer-events-auto`}

  .scrollbar-track-y {
    ${tw`bg-white`}
    width: 4px;
  }

  .scrollbar-thumb {
    ${tw`bg-lightgrey rounded-none`}
    width: 4px;
  }
`;

const Podcast = styled(Link)`
  ${tw`w-full flex items-center justify-between py-16 md:py-24 px-16 border-b border-black last:border-none bg-grey text-white hover:bg-black`}
`;

const Speaker = tw.div`text-12 uppercase text-lightgrey font-serif tracking-wider`;

export const PodcastList: React.FC<Props> = ({ podcasts, showSpeakerName, close, open }) => {
  useKey("Escape", close);
  const router = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside({ ref, callback: close, skipAttribute: "data-toggle-podcast-list" });

  const onPodcastClick = () => {
    close && close();
  };

  if (!podcasts) return null;

  return (
    <AnimatePresence>
      {open && (
        <Container ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ReactSmoothScrollbar alwaysShowTracks continuousScrolling={false}>
            {podcasts.map((podcast) => (
              <Podcast key={String(podcast.day)} onClick={onPodcastClick} href={`/#t=${getIdByDate(podcast.day)}`}>
                <div>{formatDate(podcast.day, router.locale)}</div>
                {showSpeakerName && podcast.speaker.name && <Speaker>{podcast.speaker.name}</Speaker>}
              </Podcast>
            ))}
          </ReactSmoothScrollbar>
        </Container>
      )}
    </AnimatePresence>
  );
};
