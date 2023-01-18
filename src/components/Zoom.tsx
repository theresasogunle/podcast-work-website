import tw, { styled } from "twin.macro";
import { Button } from "~/components/Button";

const Container = styled.div`
  ${tw`lg:flex hidden w-full h-full pointer-events-auto`}
`;

export const Zoom: React.FC = () => {
  return (
    <Container>
      <Button variant="white" icon="plus" aria-label="Zoom in" onClick={() => {}} />
      <Button variant="white" icon="minus" aria-label="Zoom out" onClick={() => {}} />
    </Container>
  );
};
