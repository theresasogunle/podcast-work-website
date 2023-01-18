import { GetStaticProps, NextPage } from "next";
import { NextSeo, DefaultSeoProps } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import tw, { styled } from "twin.macro";
import { useEffect, useRef } from "react";
import { DefaultPage } from "~/layouts/DefaultPage";
import { SnapToGrid } from "~/components/SnapToGrid";
import { Link } from "~/components/Link";
import { RichText } from "~/components/RichText";
import { Grid } from "~/components/Grid";
import { Image } from "~/components/Image";
import { useParallax } from "~/hooks/useParallax";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useWaveContext } from "~/contexts/Wave";
import { useStickyYearContext } from "~/contexts/StickyYear";
import { up } from "~/utils/screens";
import type { Image as IImage } from "~/interfaces";

interface Quote {
  quote: string;
  logo: IImage;
  date: string;
  url: string;
}

interface ContentSection {
  title: string;
  text: string;
  image: IImage;
  about: string;
}

interface Partner {
  logo: IImage;
  url: string;
}

interface PartnerSection {
  title: string;
  items: Partner[];
}

interface ImpressumSection {
  text: string;
}

interface PressSection {
  title: string;
  items: string[];
}

const StyledSection = tw.div`mb-80 md:mb-144 md:px-48 lg:pl-160 lg:pr-120`;

const StyledTitleContainer = styled.div`
  ${tw`bg-black text-24 md:text-32 font-grotesk uppercase flex items-center justify-center text-center p-20 w-full md:w-8/12 mx-auto mb-80 md:mb-144 mt-60`}
`;

const StyledGrid = styled.div`
  ${tw`py-60 md:py-100 text-white`}
`;

const StyledQuoteContainer = styled.div`
  ${tw`relative mb-60 last:mb-0 flex flex-col flex-grow-0`}
`;

const StyledLogoContainer = styled.div`
  ${tw`bg-black p-10 md:p-20 flex md:justify-center items-center`}
  width: 80px;

  ${up("md")} {
    width: 160px;
  }
`;

const StyledQuotesSection = styled(StyledSection)`
  ${tw`flex flex-col`}

  ${StyledQuoteContainer}:nth-of-type(odd) {
    ${tw`md:self-end`}

    ${StyledLogoContainer} {
      ${tw`ml-auto`}
    }
  }

  ${StyledQuoteContainer}:nth-of-type(even) {
    ${tw`self-start`}
  }

  ${StyledQuoteContainer}:nth-of-type(3n + 1) {
    ${tw`md:mr-120`}
  }
`;

const StyledQuote = styled.div`
  ${tw`bg-black p-20 md:p-40 font-serif text-24 lg:text-32 flex items-center justify-center w-full h-full`}

  ${up("md")} {
    width: 460px;
  }

  ${up("lg")} {
    width: 560px;
  }
`;

const StyledLogo = tw.img`object-contain mb-8 h-12`;

const StyledDate = tw.div`font-serif text-12`;

const StyledContentSection = tw(StyledSection)`flex lg:space-x-60 flex-wrap lg:flex-nowrap`;

const StyledColumn = tw.div`w-full lg:w-1/2`;

const StyledCard = tw.div`bg-black text-white flex justify-center items-center font-serif`;

const StyledContentCard = styled(StyledCard)`
  ${tw`p-20 lg:p-40`}
`;

const StyledContactCard = styled(StyledCard)`
  ${tw`w-full lg:w-2/3 lg:ml-auto px-24 py-12`}
`;

const StyledTitle = tw.h1`uppercase font-sans text-20 mb-16`;

const StyledImageContainer = styled.div`
  ${tw`w-full relative overflow-hidden`}
  padding-bottom: 125%;
`;

const StyledPartnersSection = tw(StyledSection)``;

const StyledPartnersTitle = styled.div`
  ${tw`w-full uppercase px-40 py-12 flex items-center justify-center bg-black text-20`}

  ${up("lg")} {
    width: 400px;
  }
`;

const StyledPartnersContainer = styled.div`
  ${tw`flex flex-wrap`}
`;

const StyledPartnerContainer = styled.div`
  ${tw`w-full sm:w-1/2 bg-black flex items-center justify-center`}

  ${up("md")} {
    width: 160px;
  }
`;

const StyledPartner = styled.div`
  ${tw`w-full px-24 py-12 flex items-center justify-center relative`}
  padding-bottom: 20%;

  ${up("md")} {
    padding-bottom: 50%;
  }
`;

const StyledQuoteWrapper = styled.div``;

const StyledImpressumSection = tw(StyledSection)`mb-0`;

const StyledImpressum = styled(StyledCard)`
  ${tw`w-full p-20 lg:p-40 mx-auto`}

  ${up("md")} {
    width: 560px;
  }
`;

const StyledPressSection = tw(StyledSection)``;

const StyledPressTitle = tw(StyledPartnersTitle)``;

const StyledPressItemsContainer = styled.div`
  ${tw`flex flex-wrap`}
`;

const StyledPressItem = styled.div`
  ${tw`w-full md:w-auto bg-black p-20 lg:p-40 text-white flex md:justify-center items-center font-serif`}
`;

const About: NextPage = () => {
  const { t, i18n } = useTranslation("about");
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const isMd = useMediaQuery(up("md"));

  useParallax({ imageContainerRef, imageRef, overflow: 0.2 });

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

  const title = t("title");
  const quotes: Quote[] = t("quotes", { returnObjects: true });
  const contentSection: ContentSection = t("content", { returnObjects: true });
  const partnersSection: PartnerSection = t("partners", { returnObjects: true });
  const pressSection: PressSection = t("press", { returnObjects: true });
  const impressumSection: ImpressumSection = t("impressum", { returnObjects: true });

  useEffect(() => {
    setWaveBackgroundColor("black");
    setWaveColor("white");
    setAddBorders(true);
    setYear(undefined);
  }, [setWaveBackgroundColor, setWaveColor, setAddBorders, setYear]);

  return (
    <>
      <NextSeo {...seo} />
      <Grid as={StyledGrid} variant="black">
        <StyledTitleContainer as={SnapToGrid} snapWidth={isMd}>
          <h1>{title}</h1>
        </StyledTitleContainer>
        <StyledQuotesSection>
          {quotes.map((quote, i) => (
            <StyledQuoteContainer key={i}>
              <StyledQuoteWrapper
                as={quote.url !== "" ? Link : undefined}
                href={quote.url !== "" ? quote.url : undefined}
              >
                <StyledQuote as={SnapToGrid} snapWidth={isMd}>
                  <div>{quote.quote}</div>
                </StyledQuote>
              </StyledQuoteWrapper>
              <StyledLogoContainer as={SnapToGrid}>
                <div>
                  <StyledLogo src={quote.logo.src} alt={quote.logo.alt} />
                  {quote.date && <StyledDate>{quote.date}</StyledDate>}
                </div>
              </StyledLogoContainer>
            </StyledQuoteContainer>
          ))}
        </StyledQuotesSection>
        <StyledContentSection>
          <StyledColumn>
            <StyledContentCard as={SnapToGrid} snapWidth={isMd}>
              <div>
                <StyledTitle>{contentSection.title}</StyledTitle>
                <RichText content={contentSection.text} />
              </div>
            </StyledContentCard>
            <StyledContactCard as={SnapToGrid} snapWidth={isMd}>
              <RichText content={contentSection.about} />
            </StyledContactCard>
          </StyledColumn>
          <StyledColumn>
            <StyledImageContainer as={SnapToGrid} snapWidth={isMd}>
              <div tw="absolute inset-0" ref={imageContainerRef}>
                <Image ref={imageRef} src={contentSection.image.src} alt={contentSection.image.alt} />
              </div>
            </StyledImageContainer>
          </StyledColumn>
        </StyledContentSection>
        <StyledPartnersSection>
          <StyledPartnersTitle as={SnapToGrid} snapWidth={isMd}>
            <div>{partnersSection.title}</div>
          </StyledPartnersTitle>
          <StyledPartnersContainer>
            {partnersSection.items.map((item, i) => (
              <StyledPartnerContainer as={SnapToGrid} key={i}>
                <StyledPartner
                  as={item.url && item.url !== "" ? Link : undefined}
                  href={item.url && item.url !== "" ? item.url : undefined}
                >
                  <StyledLogo tw="mb-0 absolute inset-0 w-full h-full" src={item.logo.src} alt={item.logo.alt} />
                </StyledPartner>
              </StyledPartnerContainer>
            ))}
          </StyledPartnersContainer>
        </StyledPartnersSection>
        <StyledPressSection>
          <StyledPressTitle as={SnapToGrid} snapWidth={isMd}>
            {pressSection.title}
          </StyledPressTitle>
          <StyledPressItemsContainer>
            {pressSection.items.map((item, i) => (
              <StyledPressItem as={SnapToGrid} key={i} snapWidth={isMd}>
                <RichText content={item} />
              </StyledPressItem>
            ))}
          </StyledPressItemsContainer>
        </StyledPressSection>
        <StyledImpressumSection>
          <StyledImpressum as={SnapToGrid} snapWidth={isMd}>
            <RichText content={impressumSection.text} />
          </StyledImpressum>
        </StyledImpressumSection>
      </Grid>
    </>
  );
};

export default About;

/*
  Persistent layout that doesn't re-mount on page change (DefaultPage)
  but with different props for a specific page
  https://nextjs.org/docs/basic-features/layouts#with-typescript
*/

// @ts-expect-error
About.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultPage
      scrollDirection="vertical"
      menuButtonIconMode="light"
      showElements={false}
      showPodcastList={false}
      showLogo
      logoTheme="white"
      variant="black"
    >
      {page}
    </DefaultPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => ({
  props: {
    ...(await serverSideTranslations(locale || defaultLocale || "de", [
      "menu",
      "about",
      "speakers",
      "1942",
      "1943",
      "1944",
    ])),
  },
});
