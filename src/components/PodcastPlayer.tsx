import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import { useAudio } from "react-use";
import { useTranslation } from "react-i18next";
import { GridHelper } from "~/components/Grid";
import { Button } from "~/components/Button";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { formatDate, map, getIdByDate } from "~/utils/common";
import { up } from "~/utils/screens";
import { usePodcastContext, useSelectedPodcast, usePrevPodcast, useNextPodcast } from "~/contexts/Podcast";

interface Props {
  togglePodcastList: () => void;
}

const Container = tw.div`flex flex-row-reverse lg:flex-row`;

const ProgressContainer = styled.div<{ $cellWidth?: number; $cellHeight: number }>`
  ${tw`h-full text-white bg-grey select-none w-full relative text-left flex`}
  -webkit-tap-highlight-color: transparent;
  ${GridHelper}
  transform: translate(-5px, -5px);

  &:before {
    ${tw`content absolute left-0 bg-black`}
    right: -5px;
    bottom: -5px;
    height: 5px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 5px 100%);
  }

  &:after {
    ${tw`content absolute top-0 bg-black`}
    bottom: -5px;
    right: -5px;
    width: 5px;
    clip-path: polygon(0 0, 100% 5px, 100% 100%, 0 94%);
  }
`;

const TextContainer = tw.div`z-10 flex flex-col justify-center px-16 md:px-24 w-full h-full absolute pointer-events-none`;

const DateText = tw.p``;

const SpeakerText = tw.p`text-12 md:text-14 text-lightgrey font-serif`;

const ButtonsContainer = styled.div<{ $cellWidth?: number; $cellHeight: number }>`
  ${tw`flex flex-shrink-0 z-10 lg:z-0`}
  ${GridHelper}
`;

export const PodcastPlayer: React.FC<Props> = ({ togglePodcastList }) => {
  const { toggleSelectedPodcast, updateSelectedPodcastAsPlayed } = usePodcastContext();

  const { t } = useTranslation("common");

  const selectedPodcast = useSelectedPodcast();

  const prevPodcast = usePrevPodcast();

  const nextPodcast = useNextPodcast();

  const [audio, state, controls] = useAudio({
    src: selectedPodcast?.src ?? "",
    autoPlay: false,
  });

  const isSm = useMediaQuery(up("sm"));
  const isLg = useMediaQuery(up("lg"));

  const router = useRouter();

  useEffect(() => {
    if (selectedPodcast?.state === "playing") {
      controls.play();
    } else {
      controls.pause();
    }
  }, [selectedPodcast, controls]);

  useEffect(() => {
    if (state.duration === 0) return;
    if (state.time === state.duration) updateSelectedPodcastAsPlayed();
  }, [updateSelectedPodcastAsPlayed, state]);

  const progress = map(state.time, [0, state.duration], [0, 100]) || 0;

  return (
    <Container>
      {audio}
      <ButtonsContainer $cellWidth={isLg ? 3 : 1} $cellHeight={1}>
        <Button
          href={`/#t=${getIdByDate(prevPodcast?.day)}`}
          variant="grey"
          icon="prev"
          aria-label="Previous podcast"
          state="idle"
          tw="hidden lg:block"
        />
        <Button
          onClick={toggleSelectedPodcast}
          variant="grey"
          icon={state.playing ? "pause" : "play"}
          aria-label={state.playing ? "Pause podcast" : "Play podcast"}
          state={state.playing ? "active" : "idle"}
        />
        <Button
          href={`/#t=${getIdByDate(nextPodcast?.day)}`}
          variant="grey"
          icon="next"
          aria-label="Next podcast"
          state="idle"
          tw="hidden lg:block"
        />
      </ButtonsContainer>

      <ProgressContainer
        as={!isSm ? "button" : undefined}
        $cellWidth={isLg ? 4 : undefined}
        $cellHeight={1}
        onClick={!isSm ? togglePodcastList : undefined}
        data-toggle-podcast-list={!isSm ? true : undefined}
      >
        <motion.div
          tw="bg-black absolute h-full pointer-events-none "
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
        <TextContainer>
          <DateText>{selectedPodcast && formatDate(selectedPodcast.day, router.locale)}</DateText>
          <SpeakerText>
            {t("read-by")} <span tw="uppercase">{selectedPodcast!.speaker.name}</span>
          </SpeakerText>
        </TextContainer>
      </ProgressContainer>
    </Container>
  );
};
