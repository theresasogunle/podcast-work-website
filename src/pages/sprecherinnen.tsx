import { GetStaticProps, NextPage } from "next";
import { NextSeo, DefaultSeoProps } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import tw, { styled } from "twin.macro";
import { DefaultPage } from "~/layouts/DefaultPage";
import { Speaker } from "~/components/Speaker";
import { SnapToGrid } from "~/components/SnapToGrid";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { up } from "~/utils/screens";
import { Grid } from "~/components/Grid";
import { useWaveContext } from "~/contexts/Wave";
import { useStickyYearContext } from "~/contexts/StickyYear";
import type { Speaker as ISpeaker } from "~/interfaces";

const StyledGrid = styled.div`
  ${tw`flex flex-col relative pt-60 md:py-100 md:pr-48 lg:px-80`}

  > *:nth-of-type(6n + 2) {
    ${tw`md:self-end`}
  }

  > *:nth-of-type(6n + 3) {
    ${tw`md:-mt-400 lg:ml-160`}
  }

  > *:nth-of-type(6n + 4) {
    ${tw`md:self-end lg:mr-160`}
  }

  > *:nth-of-type(6n + 5) {
    ${tw`md:-mt-240`}
  }

  > *:nth-of-type(6n + 6) {
    ${tw`md:self-end md:-mt-160 lg:mr-60`}
  }
`;

const Intro = styled.div`
  ${tw`mx-auto relative bg-red p-20 md:p-40 w-full md:w-8/12 lg:w-6/12 flex flex-col justify-center mb-64 md:mb-80`}
`;

const Headline = tw.h1`text-24 mb-16`;

const SubHeadline = tw.p`font-serif tracking-wide`;

const Speakers: NextPage = () => {
  const { t, i18n } = useTranslation("speakers");
  const isMd = useMediaQuery(up("md"));

  const { setWaveBackgroundColor, setWaveColor, setAddBorders } = useWaveContext();
  const { setYear } = useStickyYearContext();

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

  const speakers: ISpeaker[] = t("items", { returnObjects: true });

  useEffect(() => {
    setWaveBackgroundColor("red");
    setWaveColor("black");
    setAddBorders(true);
    setYear(undefined);
  }, [setWaveBackgroundColor, setWaveColor, setAddBorders, setYear]);

  return (
    <>
      <NextSeo {...seo} />
      <Grid as={StyledGrid} variant="red">
        <Intro as={SnapToGrid} snapWidth={isMd}>
          <Headline>{t("title")}</Headline>
          <SubHeadline>{t("description")}</SubHeadline>
        </Intro>
        {speakers.map((speaker) => (
          <Speaker speaker={speaker} key={speaker.id} />
        ))}
      </Grid>
    </>
  );
};

export default Speakers;

/*
  Persistent layout that doesn't re-mount on page change (DefaultPage)
  but with different props for a specific page
  https://nextjs.org/docs/basic-features/layouts#with-typescript
*/

// @ts-expect-error
Speakers.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultPage
      scrollDirection="vertical"
      menuButtonIconMode="dark"
      showLogo
      showPodcastList
      logoTheme="red"
      showElements={false}
      variant="red"
    >
      {page}
    </DefaultPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => ({
  props: {
    ...(await serverSideTranslations(locale || defaultLocale || "de", ["menu", "speakers", "1942", "1943", "1944"])),
  },
});
