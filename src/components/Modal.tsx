import tw, { styled } from "twin.macro";
import { AnimatePresence, motion } from "framer-motion";
import { useKey } from "react-use";
import { Button } from "~/components/Button";
import { GridHelper } from "~/components/Grid";
import { Portal } from "~/components/Portal";
import { real100vh } from "~/hooks/use100vh";
import { up } from "~/utils/screens";

interface Props {
  open: boolean;
  close: () => void;
}

const transition = { duration: 0.4, ease: "easeInOut" };

const StyledBackdrop = tw(motion.div)`bg-black w-full h-full fixed inset-0 bg-opacity-80`;

const StyledPanel = tw(motion.div)`z-40 absolute left-0 lg:left-auto right-0`;

const StyledCloseButtonContainer = styled.div<{ $cellWidth: number; $cellHeight: number }>`
  ${tw`absolute lg:sticky lg:float-left z-10`}
  top: var(--frame-size);
  right: var(--frame-size);
  ${GridHelper}

  ${up("lg")} {
    transform: translateX(calc(-100% + var(--frame-size)));
  }
`;

const StyledContent = styled.div`
  ${tw`bg-white`}
  margin: var(--frame-size);
  min-height: calc(${real100vh} - calc(var(--frame-size) * 2));
`;

const StyledContainer = tw.div`fixed z-50 inset-0 overflow-y-auto overflow-x-hidden`;

export const Modal: React.FC<Props> = ({ open, close, children }) => {
  useKey("Escape", close);

  return (
    <AnimatePresence>
      {open && (
        <Portal>
          <StyledContainer>
            <StyledBackdrop
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            />

            <StyledPanel initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={transition}>
              <StyledCloseButtonContainer $cellHeight={1} $cellWidth={1}>
                <Button variant="white" icon="close" state="active" onClick={close} />
              </StyledCloseButtonContainer>
              <StyledContent>{children}</StyledContent>
            </StyledPanel>
          </StyledContainer>
        </Portal>
      )}
    </AnimatePresence>
  );
};
