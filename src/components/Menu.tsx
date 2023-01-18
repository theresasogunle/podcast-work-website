import tw, { styled } from "twin.macro";
import { Grid } from "@madebywild/styled-grid";
import { useTranslation } from "next-i18next";
import { useKey } from "react-use";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useMenuContext } from "~/contexts/Menu";
import { Link } from "~/components/Link";
import { NoiseStyle } from "~/styles/NoiseStyle";
import SoundWave from "~/assets/soundwave.svg";
import { useGridContext } from "~/contexts/Grid";

interface Props {
  trigger: boolean;
  setTriggerOff: () => void;
}

const Container = styled(motion.div)`
  ${tw`fixed inset-0 bg-white flex items-center justify-center pointer-events-auto`}
  padding: var(--frame-size);
`;

const StyledGrid = tw(Grid)`w-full h-full border pb-80 md:pb-0`;

const RedBlock = styled(Grid.Item)`
  ${tw`bg-red relative`}
  ${NoiseStyle}
`;

const BlackBlock = styled(Grid.Item)`
  ${tw`bg-black z-40 flex items-end p-24 lg:pt-100 lg:pb-44 lg:px-44 overflow-hidden`}
  margin-left: -2px;
`;

const MenuLink = styled(Link)`
  ${tw`text-24 sm:text-60  lg:text-72 xl:text-100 text-white uppercase`}
`;

const SoundwaveContainer = styled(Grid.Item)`
  ${tw`lg:hidden z-10 flex items-end overflow-hidden`}

  svg {
    ${tw`flex-shrink-0 -ml-10 first:ml-0`}
  }
`;

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const listVariants = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};

const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const blackBlockVariants = {
  initial: {
    clipPath: "inset(0% 0% 100% 0%)",
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      delay: 0.2,
      duration: 0.6,
    },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.3,
    },
  },
};

const redBlockVariants = {
  initial: {
    clipPath: "inset(0% 100% 0% 0%)",
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

const links = ["/", "/sprecherinnen", "/dasprojekt"];

export const Menu: React.FC<Props> = ({ trigger, setTriggerOff }) => {
  const { setIsMenuOpen } = useMenuContext();
  const [activeLink, setActiveLink] = useState<string>();
  const { t } = useTranslation("menu");
  const { cols, getCol } = useGridContext();
  const { pathname } = useRouter();

  useKey("Escape", setTriggerOff);

  useEffect(() => {
    if (trigger) setIsMenuOpen(true);
  }, [trigger, setIsMenuOpen]);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <AnimatePresence onExitComplete={() => setIsMenuOpen(false)}>
      {trigger && (
        <Container initial="initial" animate="animate" exit="exit" variants={containerVariants} key="container">
          <StyledGrid columns={cols} rows={11}>
            <BlackBlock
              key="black-block"
              as={motion.div}
              variants={blackBlockVariants}
              transition={{ ease: "easeInOut" }}
              row={[1, 9]}
              column={[2, -1]}
            >
              <motion.ul variants={listVariants} key="list">
                {links.map((link, i) => (
                  <motion.li variants={itemVariants} key={`item-${i}`}>
                    <MenuLink
                      href={link}
                      isActive={activeLink === link}
                      onMouseEnter={() => setActiveLink(link)}
                      onMouseLeave={() => setActiveLink(pathname)}
                    >
                      {t(`menuOption${i + 1}`)}
                    </MenuLink>
                  </motion.li>
                ))}
              </motion.ul>
            </BlackBlock>
            <RedBlock
              key="red-block"
              as={motion.div}
              variants={redBlockVariants}
              transition={{ ease: "easeInOut" }}
              row={[1, -1]}
              column={{ initial: [1, -1], md: [1, getCol(14)] }}
            />
            <SoundwaveContainer row={[9, "span 3"]} column={{ initial: [1, -1], md: [1, getCol(14)] }}>
              {[...Array(4).keys()].map((n) => (
                <SoundWave key={n} />
              ))}
            </SoundwaveContainer>
          </StyledGrid>
        </Container>
      )}
    </AnimatePresence>
  );
};
