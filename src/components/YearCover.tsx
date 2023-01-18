import { useTranslation } from "next-i18next";
import { useRef } from "react";
import tw, { styled } from "twin.macro";
import { NoiseStyle } from "~/styles/NoiseStyle";
import { useParallax } from "~/hooks/useParallax";
import { Image } from "~/components/Image";
import { Year as IYear } from "~/interfaces";

interface Props {
  year: IYear;
}

const Container = styled.div`
  ${tw`relative h-full flex items-center justify-center`}
  ${NoiseStyle}
  width: calc(100vw - calc(var(--frame-size) * 2));
`;

const Year = tw.div`text-white text-100 z-10 font-grotesk font-bold lg:text-300 2xl:text-500 tracking-tight`;

export const YearCover: React.FC<Props> = ({ year }) => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(year);

  useParallax({ imageContainerRef, imageRef, overflow: 0.2 });

  return (
    <Container id={year} ref={imageContainerRef}>
      <Image ref={imageRef} src={t("cover.src")} alt={t("cover.alt")} hasOverlay />
      <Year>{year}</Year>
    </Container>
  );
};
