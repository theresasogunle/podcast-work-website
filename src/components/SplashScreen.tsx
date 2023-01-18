import { Grid } from "@madebywild/styled-grid";
import tw, { styled, css } from "twin.macro";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { Button } from "~/components/Button";
import Logo from "~/assets/logo.svg";
import { Grid as VisualGrid } from "~/components/Grid";
import { useGridContext } from "~/contexts/Grid";

const StyledGrid = styled(motion(Grid))`
  ${tw`h-full relative`}
  width: calc(100vw - var(--frame-size) * 2);
`;

const Resize = css`
  width: calc(100% - 1px);
  height: calc(100% - 1px);
`;

const LogoContainer = styled(Grid.Item)`
  ${tw`bg-white overflow-hidden flex items-center justify-center`}
  ${Resize}
`;

const DesktopTextContainer = styled(Grid.Item)`
  ${tw`hidden lg:block bg-white overflow-hidden`}
  ${Resize}
`;

const MobileTextContainer = styled(Grid.Item)`
  ${tw`flex lg:hidden bg-white overflow-hidden items-center justify-center`}
  ${Resize}
`;

const ButtonContainer = styled(Grid.Item)`
  ${Resize}
`;

const Text = styled(motion.p)`
  ${tw`text-16 lg:text-20 text-center`}
`;

const containerVariants = {
  animate: { transition: { staggerChildren: 0.03 } },
};

const logoVariants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { ease: "easeInOut", duration: 0.5 } },
};

const textVariants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { ease: "easeInOut", duration: 0.5 } },
};

export const SplashScreen: React.FC = () => {
  const { getRow, getCol, rows, cols } = useGridContext();
  const { t } = useTranslation("splashScreen");

  return (
    <VisualGrid
      as={StyledGrid}
      // @ts-ignore
      rows={rows}
      columns={cols}
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <LogoContainer
        row={{ initial: getRow(4), lg: getRow(5) }}
        column={{ initial: [1, getCol(19)], lg: [getCol(4), getCol(18)] }}
      >
        <motion.div tw="w-full h-full" variants={logoVariants}>
          <Logo tw="w-full h-full" />
        </motion.div>
      </LogoContainer>
      <MobileTextContainer row={getRow(5)} column={[getCol(10), "span 5"]}>
        <motion.div tw="w-full h-full flex items-center justify-center" variants={textVariants}>
          <Text>{t("description")}</Text>
        </motion.div>
      </MobileTextContainer>
      <MobileTextContainer row={getRow(6)} column={[getCol(3), "span 5"]}>
        <motion.div tw="w-full h-full flex items-center justify-center" variants={textVariants}>
          <Text>{t("description2")}</Text>
        </motion.div>
      </MobileTextContainer>
      <DesktopTextContainer row={getRow(7)} column={[getCol(3), "span 10"]}>
        <motion.div tw="w-full h-full flex items-center justify-center" variants={textVariants}>
          <Text>
            {t("description")} {t("description2")}
          </Text>
        </motion.div>
      </DesktopTextContainer>
      <ButtonContainer row={getRow(9)} column={{ initial: [getCol(8), "span 4"], lg: [getCol(14), "span 4"] }}>
        <Button
          icon="arrow"
          aria-label={t("scrollToExplore")}
          variant="red"
          text={t("scrollToExplore")}
          href="/#t=1942"
        />
      </ButtonContainer>
    </VisualGrid>
  );
};
