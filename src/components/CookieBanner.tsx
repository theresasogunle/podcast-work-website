import { useState, useEffect } from "react";
import tw, { styled } from "twin.macro";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "~/components/Link";
import { up } from "~/utils/screens";

const GTM_ID = "G-T20NX0HCQN";
const COOKIE_ID = "anne-frank-cookie-consent";

const StyledContainer = styled(motion.div)<{ $cellWidth: number; $cellHeight: number }>`
  ${tw`fixed bg-white border border-black p-20 md:p-40 z-50 md:w-full inset-x-0 flex flex-col text-14 md:text-base leading-8`}
  bottom: var(--frame-size);
  margin-left: var(--frame-size);
  margin-right: var(--frame-size);

  ${up("md")} {
    ${tw`left-auto right-0`}
    width: calc(var(--cell-width) * 10 + 1px);
    height: calc(var(--cell-height) * 6 + 1px);
  }
`;

const StyledButton = tw.button`h-56 text-white uppercase text-16 w-1/2`;

const StyledText = tw.p`font-serif mb-40`;

const StyledButtonsContainer = tw.div`flex items-center space-x-16 mt-auto`;

export const CookieBanner: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(!!Cookies.get(COOKIE_ID));
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    if (isAccepted) setIsBannerVisible(false);
    else {
      setTimeout(() => {
        setIsBannerVisible(true);
      }, 1000);
    }
  }, [isAccepted]);

  const acceptCookie = () => {
    setIsAccepted(true);
    Cookies.set(COOKIE_ID, "true", { expires: 1 });
  };

  const rejectCookie = () => {
    setIsBannerVisible(false);
  };

  useEffect(() => {
    if (!isAccepted) return;

    const gtmScript = document.createElement("script");
    const gtmScriptContent = document.createElement("script");

    gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;

    gtmScriptContent.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTM_ID}');
      `;

    document.head.appendChild(gtmScript);
    document.head.appendChild(gtmScriptContent);
  }, [isAccepted]);

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <StyledContainer $cellWidth={7} $cellHeight={4} exit={{ opacity: 0 }}>
          <StyledText>
            Wir und ausgewählte Dritte setzen für technische Zwecke und, mit Ihrer Einwilligung, für andere Zwecke
            Cookies und ähnliche Technologien ein, so wie in der Cookie-Richtlinie beschrieben. <br /> <br />
            Sie willigen in den Einsatz solcher Technologien ein, indem Sie den „Zustimmen“-Button betätigen. Indem Sie
            diesen Hinweis schließen, fahren Sie fort, ohne zuzustimmen. <br /> <br />
            <Link href="/impressum" tw="underline">
              Mehr Informationen
            </Link>
          </StyledText>
          <StyledButtonsContainer>
            <StyledButton onClick={rejectCookie} tw="bg-lightgrey">
              Ablehnen
            </StyledButton>
            <StyledButton onClick={acceptCookie} tw="bg-red">
              Zustimmen
            </StyledButton>
          </StyledButtonsContainer>
        </StyledContainer>
      )}
    </AnimatePresence>
  );
};
