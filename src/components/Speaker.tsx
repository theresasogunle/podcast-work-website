import tw, { styled } from "twin.macro";
import { useState } from "react";
import { Button } from "~/components/Button";
import { PodcastList } from "~/components/PodcastList";
import { GridHelper } from "~/components/Grid";
import { Image } from "~/components/Image";
import { up } from "~/utils/screens";
import { usePodcastsBySpeakerId } from "~/contexts/Podcast";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import type { Speaker as ISpeaker } from "~/interfaces";
import { NoiseStyle } from "~/styles/NoiseStyle";
import { SnapToGrid } from "./SnapToGrid";

interface Props {
  speaker: ISpeaker;
}

const Container = styled.div`
  ${tw`bg-red text-center relative flex flex-col z-20 w-full md:w-4/12 lg:w-3/12`}
  ${NoiseStyle}
`;

const SpeakerContent = tw.div`p-20 md:px-24 md:py-44 flex w-full h-full flex-col items-center justify-center`;

const SpeakerName = tw.p`font-serif mb-8 uppercase tracking-wide text-base md:text-24`;

const SpeakerBio = tw.p`font-serif text-12 md:text-14 text-center tracking-wide`;

const ImageContainer = styled.div`
  ${tw`w-full aspect-w-10 aspect-h-12 relative flex-shrink-0 grayscale`}
`;

const PodcastListContainer = styled.div`
  ${tw`absolute inset-x-0 md:top-0 z-20 h-1/2 pointer-events-none`}
  top: var(--cell-height);
`;

const ButtonContainer = styled.div<{ $cellWidth: number; $cellHeight: number; $offsetX?: number; $offsetY?: number }>`
  ${tw`absolute top-0 right-0 z-20`}
  ${GridHelper}
`;

export const Speaker: React.FC<Props> = ({ speaker }) => {
  const [isPodcastListOpen, setIsPodcastListOpen] = useState(false);
  const { id, name, image, bio } = speaker;
  const podcasts = usePodcastsBySpeakerId(id);

  const isMd = useMediaQuery(up("md"));

  return (
    <Container as={SnapToGrid} snapWidth={isMd}>
      <PodcastListContainer>
        <PodcastList open={isPodcastListOpen} podcasts={podcasts} />
      </PodcastListContainer>
      <ImageContainer>
        <Image src={image.src} alt={image.alt} />
      </ImageContainer>
      <SpeakerContent>
        <SpeakerName>{name}</SpeakerName>
        <SpeakerBio>{bio}</SpeakerBio>
      </SpeakerContent>
      {podcasts.length !== 0 && (
        <ButtonContainer $cellWidth={1} $cellHeight={1} $offsetX={isMd ? 1 : undefined} $offsetY={isMd ? 1 : undefined}>
          <Button
            variant="grey"
            icon={isPodcastListOpen ? "close" : "play"}
            aria-label={isPodcastListOpen ? "Close podcast list" : "Open podcast list"}
            state={isPodcastListOpen ? "active" : "idle"}
            onClick={() => setIsPodcastListOpen((prev) => !prev)}
          />
        </ButtonContainer>
      )}
    </Container>
  );
};
