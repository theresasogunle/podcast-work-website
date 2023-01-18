import tw, { styled } from "twin.macro";
import { Link } from "~/components/Link";
import Spotify from "~/assets/spotify.svg";
import Instagram from "~/assets/instagram.svg";

const Container = styled.div`
  ${tw`p-24 flex space-x-40 justify-center md:justify-start bg-white md:bg-transparent border md:border-none items-center`}
  height: 8.1rem;
`;

export const Social: React.FC = () => {
  return (
    <Container>
      <Link href="https://open.spotify.com/show/4eOGavIBrfBnfWB7jTFHdp">
        <Spotify />
      </Link>
      <Link href="https://www.instagram.com/annefrank.digital/">
        <Instagram />
      </Link>
      <Link href="/impressum">Impressum</Link>
    </Container>
  );
};
