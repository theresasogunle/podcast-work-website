import tw, { styled } from "twin.macro";
import { forwardRef } from "react";

interface Props {
  hasOverlay?: boolean;
  src: string;
  alt: string;
}

const ImageContainer = styled.div`
  ${tw`absolute inset-0 w-full h-full`}
  will-change: transform;
`;

const StyledImage = tw.img`absolute inset-0 w-full h-full object-cover`;

const Overlay = tw.div`absolute inset-0 w-full h-full bg-black bg-opacity-20 z-10 pointer-events-none`;

export const Image = forwardRef<HTMLDivElement, Props>(({ src, alt, hasOverlay, ...rest }, ref) => {
  return (
    <ImageContainer {...rest} ref={ref}>
      {hasOverlay && <Overlay />}
      <StyledImage src={src} alt={alt} loading="lazy" draggable="false" />
    </ImageContainer>
  );
});
