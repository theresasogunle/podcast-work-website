import { useTranslation } from "next-i18next";
import tw, { styled } from "twin.macro";
import { useState, useRef } from "react";
import { NoiseStyle } from "~/styles/NoiseStyle";
import { Image } from "~/components/Image";
import { ContentModal } from "~/components/ContentModal";
import { useParallax } from "~/hooks/useParallax";

const Container = styled.button`
  ${tw`relative h-full flex items-center flex-col justify-center text-white`}
  ${NoiseStyle}
  width: calc(100vw - calc(var(--frame-size) * 2));
`;

const Year = tw.div`text-16 z-10 font-serif`;

const Title = tw.h1`text-40 z-10 font-serif my-16`;

const SeeMore = tw.div`uppercase text-12 z-10`;

export const Ending: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageContainerRef = useRef<HTMLButtonElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const { t: t_ending } = useTranslation("ending");
  const { t } = useTranslation("common");

  useParallax({ imageContainerRef, imageRef, overflow: 0.2 });

  const year = t_ending("year");
  const title = t_ending("title");
  const content = t_ending("content");
  const image = {
    src: t_ending("image.src"),
    alt: t_ending("image.alt"),
  };

  return (
    <>
      <ContentModal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        title={title}
        content={content}
        image={image}
      />
      <Container onClick={() => setIsModalOpen((prev) => !prev)} ref={imageContainerRef}>
        <Image ref={imageRef} {...image} hasOverlay />
        <Year>{year}</Year>
        <Title>{title}</Title>
        <SeeMore>{t("see-more")}</SeeMore>
      </Container>
    </>
  );
};
