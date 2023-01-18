import { GetStaticProps, NextPage } from "next";
import { NextSeo, DefaultSeoProps } from "next-seo";
import { ReactElement, useEffect, useMemo } from "react";
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { DefaultPage } from "~/layouts/DefaultPage";
import { SplashScreen } from "~/components/SplashScreen";
import { YearCover } from "~/components/YearCover";
import { Month } from "~/components/Month";
import { real100vh } from "~/hooks/use100vh";
import { Grid } from "~/components/Grid";
import { Ending } from "~/components/Ending";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useWaveContext } from "~/contexts/Wave";
import { useStickyYearContext } from "~/contexts/StickyYear";
import { TilesStyle } from "~/styles/TilesStyle";
import { up } from "~/utils/screens";
import type { BaseColor, Month as IMonth, Year } from "~/interfaces";

const Section = styled(motion.div)<{ $hasTiles?: boolean }>`
  ${tw`lg:h-full align-middle inline-block relative overflow-hidden`}
  height: calc(${real100vh} - var(--frame-size) * 2);

  ${({ $hasTiles }) => $hasTiles && TilesStyle}
`;

const MobileSection = tw(Section)`block w-full h-auto`;

const Index: NextPage = () => {
  const isLg = useMediaQuery(up("lg"));
  const { t, i18n } = useTranslation("common");
  const { t: tr_1942 } = useTranslation("1942");
  const { t: tr_1943 } = useTranslation("1943");
  const { t: tr_1944 } = useTranslation("1944");

  const isMd = useMediaQuery(up("md"));

  const { setWaveBackgroundColor, setWaveColor, setAddBorders } = useWaveContext();
  const { setShow, setYear } = useStickyYearContext();

  const months_1942: IMonth[] = useMemo(() => tr_1942("months", { returnObjects: true }), [tr_1942]);
  const months_1943: IMonth[] = useMemo(() => tr_1943("months", { returnObjects: true }), [tr_1943]);
  const months_1944: IMonth[] = useMemo(() => tr_1944("months", { returnObjects: true }), [tr_1944]);

  const seo: DefaultSeoProps = {
    title: t("seo.title"),
    description: t("seo.description"),
    twitter: {
      cardType: "summary_large_image",
    },
    openGraph: {
      title: t("seo.title"),
      description: t("seo.description"),
      type: "website",
      locale: i18n.language,
      images: [{ url: "/share-image.jpg" }],
    },
  };

  const MonthSection = isLg ? Section : MobileSection;

  const getMonthsRender = useMemo(
    () => (months: IMonth[], year: Year, color: BaseColor) =>
      months.map(({ days, month, cover, title, description }) => (
        <MonthSection key={month} onViewportEnter={() => setYear(year)} $hasTiles={!isLg}>
          <Month
            lastMonth={months[months.length - 1].month}
            view={isLg ? "full" : "compact"}
            backgroundColor={color}
            year={year}
            month={month}
            cover={cover}
            title={title}
            description={description}
            days={days?.map(({ day }) => Number(day))}
          />
        </MonthSection>
      )),
    [MonthSection, isLg, setYear]
  );

  const memoized1942 = useMemo(() => getMonthsRender(months_1942, "1942", "white"), [months_1942, getMonthsRender]);
  const memoized1943 = useMemo(() => getMonthsRender(months_1943, "1943", "red"), [months_1943, getMonthsRender]);
  const memoized1944 = useMemo(() => getMonthsRender(months_1944, "1944", "black"), [months_1944, getMonthsRender]);

  useEffect(() => {
    setWaveBackgroundColor("white");
    setWaveColor("black");
    setAddBorders(true);
  }, [setWaveBackgroundColor, setWaveColor, setAddBorders]);

  return (
    <>
      <NextSeo {...seo} />
      <Section onViewportEnter={() => setShow(false)}>
        <SplashScreen />
      </Section>
      <Section onViewportEnter={() => setShow(false)} onViewportLeave={() => setShow(true)}>
        <YearCover year="1942" />
      </Section>
      <Grid roundValues={isMd} variant="white" as={MonthSection} hasTiles={isLg}>
        {memoized1942}
      </Grid>
      <Section onViewportEnter={() => setShow(false)} onViewportLeave={() => setShow(true)}>
        <YearCover year="1943" />
      </Section>
      <Grid roundValues={isMd} variant="red" as={MonthSection} hasTiles={isLg}>
        {memoized1943}
      </Grid>
      <Section onViewportEnter={() => setShow(false)} onViewportLeave={() => setShow(true)}>
        <YearCover year="1944" />
      </Section>
      <Grid roundValues={isMd} variant="black" as={MonthSection} hasTiles={isLg}>
        {memoized1944}
      </Grid>
      <Section>
        <Ending />
      </Section>
    </>
  );
};

export default Index;

/*
  Persistent layout that doesn't re-mount on page change (DefaultPage)
  but with different props for a specific page
  https://nextjs.org/docs/basic-features/layouts#with-typescript
*/

// @ts-expect-error
Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultPage
      scrollDirection="horizontal"
      showElements
      showPodcastList
      menuButtonIconMode="light"
      logoTheme="white"
      showLogo={false}
      variant="white"
    >
      {page}
    </DefaultPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => ({
  props: {
    ...(await serverSideTranslations(locale || defaultLocale || "de", [
      "common",
      "splashScreen",
      "menu",
      "speakers",
      "1942",
      "1943",
      "1944",
      "ending",
    ])),
  },
});
