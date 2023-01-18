import tw from "twin.macro";
import { Modal } from "~/components/Modal";
import { Image } from "~/components/Image";
import { RichText } from "~/components/RichText";
import type { Image as IImage } from "~/interfaces";

const Container = tw.div`w-full lg:max-w-4xl`;

const ImageContainer = tw.div`w-full relative aspect-w-12 aspect-h-10`;

const Content = tw.div`px-40 p-20 lg:p-40 whitespace-normal font-serif`;

const ModalTitle = tw.h1`text-24 lg:text-40 mb-16`;

interface Props {
  open: boolean;
  close: () => void;
  title: string;
  content: string;
  image: IImage;
}

export const ContentModal: React.FC<Props> = ({ open, close, title, content, image }) => {
  return (
    <Modal open={open} close={close}>
      <Container>
        <ImageContainer>
          <Image src={image.src} alt={image.alt} />
        </ImageContainer>
        <Content>
          <ModalTitle>{title}</ModalTitle>
          <RichText content={content} />
        </Content>
      </Container>
    </Modal>
  );
};
