import { GetStaticProps, NextPage } from "next";
import { NextSeo, DefaultSeoProps } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import tw, { styled } from "twin.macro";
import { DefaultPage } from "~/layouts/DefaultPage";
import { SnapToGrid } from "~/components/SnapToGrid";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { up } from "~/utils/screens";
import { Grid } from "~/components/Grid";
import { useWaveContext } from "~/contexts/Wave";
import { useStickyYearContext } from "~/contexts/StickyYear";

const StyledGrid = styled.div`
  ${tw`py-60 md:py-100 lg:px-80 overflow-x-hidden`}
  --border-color: black;
`;

const StyledIntroContainer = styled.div`
  ${tw`w-full md:w-704 mx-auto mt-40 md:mt-120`}
`;

const StyledIntro = styled.div`
  ${tw`h-full bg-white w-232 text-32 font-serif flex items-center justify-center`}
`;

const StyledContent = styled.div`
  ${tw`mx-16 text-16 line-height[31px] lg:text-base lg:line-height[41px] lg:mx-32 mb-44 py-38 lg:py-9 font-grotesk`}

  * + * {
    ${tw`mt-16`}
  }

  a {
    ${tw`underline break-all`}
  }

  h1 {
    ${tw`text-16 font-bold line-height[31px] lg:text-base lg:line-height[41px] mt-42`}
  }

  ul {
    ${tw`list-disc pl-16 lg:pl-40`}
  }

  ol {
    ${tw`list-decimal pl-20 lg:pl-40`}
  }
`;

const Impressum: NextPage = () => {
  const { t, i18n } = useTranslation("impressum");
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

  useEffect(() => {
    setWaveBackgroundColor("white");
    setWaveColor("black");
    setAddBorders(true);
    setYear(undefined);
  }, [setWaveBackgroundColor, setWaveColor, setAddBorders, setYear]);

  return (
    <>
      <NextSeo {...seo} />
      <Grid as={StyledGrid} variant="white">
        <StyledIntroContainer as={SnapToGrid} snapWidth={isMd}>
          <StyledIntro>Impressum</StyledIntro>
        </StyledIntroContainer>
        <StyledContent as={SnapToGrid} snapWidth={isMd}>
          <p>
            Websitegestaltung durch{" "}
            <a href="https://www.buerobutter.com" target="_blank" rel="noreferrer">
              buero butter
            </a>
          </p>
          <p>
            Mit freundlicher Unterstützung durch{" "}
            <a href="https://www.wild.as" target="_blank" rel="noreferrer">
              wild
            </a>
          </p>
          <p>
            Technisch Umsetzung{" "}
            <a href="https://www.wild.as" target="_blank" rel="noreferrer">
              wild
            </a>
          </p>
          <p>Der Podcast der Anne Frank ist ein Projekt von buero butter</p>
          <p>
            Mit freundlicher Genehmigung des Anne Frank Fonds Mit freundlicher Genehmigung des Argon Verlags bei dem die
            vollständige Lesung des Tagebuches von Anne Frank erschienen ist, gelesen von Fritzi Haberlandt, ISBN
            978-3-8398-4054-2 und mit freundlicher Genehmigung der S. Fischer Verlag GmbH.
          </p>
          <p>Das Bildmaterial wurde von der Österreichische Nationalbibliothek zur Verfügung gestellt.</p>
          <p>
            Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch, §63 Gewerbeordnung und
            Offenlegungspflicht laut §25 Mediengesetz
          </p>
          <p>
            butterzimmer OG <br /> Grüngasse 27, Stiege 2 Tür 4-5, <br /> 1050 Wien, Österreich
          </p>
          <p>
            <b>Unternehmensgegenstand</b>: Werbegrafik-Designer <br />
            <b>UID-Nummer</b>: ATU74744645 <br />
            <b>GLN</b>: 9110027854386 <br />
            <b>GISA</b>: 32546477 <br />
            <b>Firmenbuchnummer</b>: 517872B <br />
            <b>Firmenbuchgericht</b>: Wien <br />
            <b>Firmensitz</b>: 1050 Wien
          </p>
          <p>
            <b>Tel.</b>: 06604775173 <br />
            <b>E-Mail</b>: <a href="mailto:office@buerobutter.com">office@buerobutter.com</a>
          </p>
          <p>
            <b>Mitglied bei</b>: WKO <br />
            <b>Berufsrecht</b>: Gewerbeordnung:{" "}
            <a href="https://www.ris.bka.gv.at" target="_blank" rel="noreferrer">
              www.ris.bka.gv.at
            </a>
          </p>
          <p>
            <b>Aufsichtsbehörde/Gewerbebehörde</b>: Magistrat der Stadt Wien Magistratisches Bezirksamt für den 4./5.
            Bezirk <br />
            <b>Berufsbezeichnung</b>: Werbegrafik-Designer <br />
            <b>Verleihungsstaat</b>: Österreich
          </p>
          <p>
            <b>Vertretungsbefugte Gesellschafter</b>
            <br />
            Matthias Bayr <br />
            Stefan Leberer <br />
            Christoph Liebentritt <br />
            Maximilian Schnürer
          </p>
          <p>
            <b>Kontaktdaten des Verantwortlichen für Datenschutz</b> <br />
            Sollten Sie Fragen zum Datenschutz haben, finden Sie nachfolgend die Kontaktdaten der verantwortlichen
            Person bzw. Stelle: <br />
            butterzimmer OG <br /> Grüngasse 27/2/4-5 <br /> 1050 Wien
          </p>
          <p>
            E-Mail-Adresse: office@buerobutter.com <br />
            Telefon: 06604775173 <br />
            Impressum:{" "}
            <a href="https://www.annefrank.digital/impressum/" target="_blank" rel="noreferrer">
              https://www.annefrank.digital/impressum/
            </a>
          </p>
          <h2>EU-Streitschlichtung</h2>
          <p>
            Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie
            über die Online-Streitbeilegungsplattform (OS-Plattform) informieren. Verbraucher haben die Möglichkeit,
            Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter{" "}
            <a href="http://ec.europa.eu/odr?tid=121899806" target="_blank" rel="noreferrer">
              http://ec.europa.eu/odr?tid=121899806
            </a>{" "}
            zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum.
          </p>
          <p>
            Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <h2>Haftung für Inhalte dieser Website</h2>
          <p>
            Wir entwickeln die Inhalte dieser Website ständig weiter und bemühen uns korrekte und aktuelle Informationen
            bereitzustellen. Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Website
            übernehmen, speziell für jene, die seitens Dritter bereitgestellt wurden. Als Diensteanbieter sind wir nicht
            verpflichtet, die von ihnen übermittelten oder gespeicherten Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Unsere Verpflichtungen zur Entfernung von Informationen oder zur Sperrung der Nutzung von Informationen nach
            den allgemeinen Gesetzen aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch im Falle
            unserer Nichtverantwortlichkeit davon unberührt.
          </p>
          <p>
            Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitte wir Sie uns umgehend zu
            kontaktieren, damit wir die rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten im
            Impressum.
          </p>
          <h2>Haftung für Links auf dieser Website</h2>
          <p>
            Unsere Website enthält Links zu anderen Websites für deren Inhalt wir nicht verantwortlich sind. Haftung für
            verlinkte Websites besteht für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und haben,
            uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind und wir Links sofort entfernen würden, wenn
            uns Rechtswidrigkeiten bekannt werden
          </p>
          <p>
            Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitte wir Sie uns zu kontaktieren. Sie finden
            die Kontaktdaten im Impressum.
          </p>
          <h2>Urheberrechtshinweis</h2>
          <p>
            Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht. Bitte fragen Sie
            uns bevor Sie die Inhalte dieser Website verbreiten, vervielfältigen oder verwerten wie zum Beispiel auf
            anderen Websites erneut veröffentlichen. Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der
            Inhalte unserer Seite rechtlich verfolgen.
          </p>
          <p>
            Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht verletzen, bitten wir Sie uns zu
            kontaktieren.
          </p>
          <h2>Bildernachweis</h2>
          <p>
            Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. <br />
            Die Bilderrechte liegen bei den folgenden Fotografen und Unternehmen:
          </p>
          <ul>
            <li>Christoph Liebentritt // buerobutter</li>
            <li>Bildarchiv der Österreichische Nationalbibliothek</li>
          </ul>
          <p>
            Alle Texte sind urheberrechtlich geschützt. <br />
            Quelle: Erstellt mit dem Impressum Generator von AdSimple
          </p>
          <h1>Datenschutzerklärung</h1>
          <h2>Einleitung und Überblick</h2>
          <p>
            Wir haben diese Datenschutzerklärung (Fassung 14.12.2021-121899806) verfasst, um Ihnen gemäß der Vorgaben
            der{" "}
            <a
              href="https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679&tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Datenschutz-Grundverordnung (EU) 2016/679
            </a>{" "}
            und anwendbaren nationalen Gesetzen zu erklären, welche personenbezogenen Daten (kurz Daten) wir als
            Verantwortliche – und die von uns beauftragten Auftragsverarbeiter (z. B. Provider) – verarbeiten, zukünftig
            verarbeiten werden und welche rechtmäßigen Möglichkeiten Sie haben. Die verwendeten Begriffe sind
            geschlechtsneutral zu verstehen. <br />
            <b>Kurz gesagt</b>: Wir informieren Sie umfassend über Daten, die wir über Sie verarbeiten.
          </p>
          <p>
            Datenschutzerklärungen klingen für gewöhnlich sehr technisch und verwenden juristische Fachbegriffe. Diese
            Datenschutzerklärung soll Ihnen hingegen die wichtigsten Dinge so einfach und transparent wie möglich
            beschreiben. Soweit es der Transparenz förderlich ist, werden technische{" "}
            <b>Begriffe leserfreundlich erklärt, Links</b> zu weiterführenden Informationen geboten und <b>Grafiken</b>{" "}
            zum Einsatz gebracht. Wir informieren damit in klarer und einfacher Sprache, dass wir im Rahmen unserer
            Geschäftstätigkeiten nur dann personenbezogene Daten verarbeiten, wenn eine entsprechende gesetzliche
            Grundlage gegeben ist. Das ist sicher nicht möglich, wenn man möglichst knappe, unklare und
            juristisch-technische Erklärungen abgibt, so wie sie im Internet oft Standard sind, wenn es um Datenschutz
            geht. Ich hoffe, Sie finden die folgenden Erläuterungen interessant und informativ und vielleicht ist die
            eine oder andere Information dabei, die Sie noch nicht kannten. Wenn trotzdem Fragen bleiben, möchten wir
            Sie bitten, sich an die unten bzw. im Impressum genannte verantwortliche Stelle zu wenden, den vorhandenen
            Links zu folgen und sich weitere Informationen auf Drittseiten anzusehen. Unsere Kontaktdaten finden Sie
            selbstverständlich auch im Impressum.
          </p>
          <h2>Anwendungsbereich</h2>
          <p>
            Diese Datenschutzerklärung gilt für alle von uns im Unternehmen verarbeiteten personenbezogenen Daten und
            für alle personenbezogenen Daten, die von uns beauftragte Firmen (Auftragsverarbeiter) verarbeiten. Mit
            personenbezogenen Daten meinen wir Informationen im Sinne des Art. 4 Nr. 1 DSGVO wie zum Beispiel Name,
            E-Mail-Adresse und postalische Anschrift einer Person. Die Verarbeitung personenbezogener Daten sorgt dafür,
            dass wir unsere Dienstleistungen und Produkte anbieten und abrechnen können, sei es online oder offline. Der
            Anwendungsbereich dieser Datenschutzerklärung umfasst:
          </p>
          <ul>
            <li>alle Onlineauftritte (Websites, Onlineshops), die wir betreiben</li>
            <li>Social Media Auftritte und E-Mail-Kommunikation</li>
            <li>mobile Apps für Smartphones und andere Geräte</li>
          </ul>
          <p>
            <b>Kurz gesagt</b>: Die Datenschutzerklärung gilt für alle Bereiche, in denen personenbezogene Daten im
            Unternehmen über die genannten Kanäle strukturiert verarbeitet werden. Sollten wir außerhalb dieser Kanäle
            mit Ihnen in Rechtsbeziehungen eintreten, werden wir Sie gegebenenfalls gesondert informieren.
          </p>
          <h2>Rechtsgrundlagen</h2>
          <p>
            In der folgenden Datenschutzerklärung geben wir Ihnen transparente Informationen zu den rechtlichen
            Grundsätzen und Vorschriften, also den Rechtsgrundlagen der DatenschutzGrundverordnung, die uns ermöglichen,
            personenbezogene Daten zu verarbeiten. Was das EU-Recht betrifft, beziehen wir uns auf die VERORDNUNG (EU)
            2016/679 DES EUROPÄISCHEN PARLAMENTS UND DES RATES vom 27. April 2016. Diese DatenschutzGrundverordnung der
            EU können Sie selbstverständlich online auf EUR-Lex, dem Zugang zum EU-Recht, unter
            <a
              href="https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679&tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=celex%3A32016R0679
            </a>{" "}
            nachlesen
          </p>
          <p>Wir verarbeiten Ihre Daten nur, wenn mindestens eine der folgenden Bedingungen zutrifft:</p>
          <ol>
            <li>
              <b>Einwilligung</b> (Artikel 6 Absatz 1 lit. a DSGVO): Sie haben uns Ihre Einwilligung gegeben, Daten zu
              einem bestimmten Zweck zu verarbeiten. Ein Beispiel wäre die Speicherung Ihrer eingegebenen Daten eines
              Kontaktformulars
            </li>
            <li>
              <b>Vertrag</b> (Artikel 6 Absatz 1 lit. b DSGVO): Um einen Vertrag oder vorvertragliche Verpflichtungen
              mit Ihnen zu erfüllen, verarbeiten wir Ihre Daten. Wenn wir zum Beispiel einen Kaufvertrag mit Ihnen
              abschließen, benötigen wir vorab personenbezogene Informationen.
            </li>
            <li>
              <b>Rechtliche Verpflichtung</b> (Artikel 6 Absatz 1 lit. c DSGVO): Wenn wir einer rechtlichen
              Verpflichtung unterliegen, verarbeiten wir Ihre Daten. Zum Beispiel sind wir gesetzlich verpflichtet
              Rechnungen für die Buchhaltung aufzuheben. Diese enthalten in der Regel personenbezogene Daten.
            </li>
            <li>
              <b>Berechtigte Interessen</b> (Artikel 6 Absatz 1 lit. f DSGVO): Im Falle berechtigter Interessen, die
              Ihre Grundrechte nicht einschränken, behalten wir uns die Verarbeitung personenbezogener Daten vor. Wir
              müssen zum Beispiel gewisse Daten verarbeiten, um unsere Website sicher und wirtschaftlich effizient
              betreiben zu können. Diese Verarbeitung ist somit ein berechtigtes Interesse.
            </li>
          </ol>
          <p>
            Weitere Bedingungen wie die Wahrnehmung von Aufnahmen im öffentlichen Interesse und Ausübung öffentlicher
            Gewalt sowie dem Schutz lebenswichtiger Interessen treten bei uns in der Regel nicht auf. Soweit eine solche
            Rechtsgrundlage doch einschlägig sein sollte, wird diese an der entsprechenden Stelle ausgewiesen.
          </p>
          <p>Zusätzlich zu der EU-Verordnung gelten auch noch nationale Gesetze</p>
          <ul>
            <li>
              In <b>Österreich</b> ist dies das Bundesgesetz zum Schutz natürlicher Personen bei der Verarbeitung
              personenbezogener Daten (<b>Datenschutzgesetz</b>), kurz <b>DSG</b> .
            </li>
            <li>
              In <b>Deutschland</b> gilt das <b>Bundesdatenschutzgesetz</b>, kurz <b>BDSG</b>.
            </li>
          </ul>
          <p>
            Sofern weitere regionale oder nationale Gesetze zur Anwendung kommen, informieren wir Sie in den folgenden
            Abschnitten darüber
          </p>
          <h2>Kontaktdaten des Verantwortlichen</h2>
          <p>
            Sollten Sie Fragen zum Datenschutz haben, finden Sie nachfolgend die Kontaktdaten der verantwortlichen
            Person bzw. Stelle: <br />
            butterzimmer OG <br />
            Grüngasse 27/2/4-5 <br />
            1050 Wien
          </p>
          <p>
            E-Mail: office@buerobutter.com <br />
            Telefon: 06604775173 <br />
            Impressum:{" "}
            <a href="https://www.annefrank.digital/impressum/" target="_blank" rel="noreferrer">
              https://www.annefrank.digital/impressum/
            </a>
          </p>
          <h2>Speicherdauer</h2>
          <p>
            Dass wir personenbezogene Daten nur so lange speichern, wie es für die Bereitstellung unserer
            Dienstleistungen und Produkte unbedingt notwendig ist, gilt als generelles Kriterium bei uns. Das bedeutet,
            dass wir personenbezogene Daten löschen, sobald der Grund für die Datenverarbeitung nicht mehr vorhanden
            ist. In einigen Fällen sind wir gesetzlich dazu verpflichtet, bestimmte Daten auch nach Wegfall des
            ursprüngliches Zwecks zu speichern, zum Beispiel zu Zwecken der Buchführung
          </p>
          <p>
            Sollten Sie die Löschung Ihrer Daten wünschen oder die Einwilligung zur Datenverarbeitung widerrufen, werden
            die Daten so rasch wie möglich und soweit keine Pflicht zur Speicherung besteht, gelöscht.
          </p>
          <p>
            Über die konkrete Dauer der jeweiligen Datenverarbeitung informieren wir Sie weiter unten, sofern wir
            weitere Informationen dazu haben.
          </p>
          <h2>Rechte laut Datenschutz-Grundverordnung</h2>
          <p>
            Laut Artikel 13 DSGVO stehen Ihnen die folgenden Rechte zu, damit es zu einer fairen und transparenten
            Verarbeitung von Daten kommt:
          </p>
          <ul>
            <li>
              Sie haben laut Artikel 15 DSGVO ein Auskunftsrecht darüber, ob wir Daten von Ihnen verarbeiten. Sollte das
              zutreffen, haben Sie Recht darauf eine Kopie der Daten zu erhalten und die folgenden Informationen zu
              erfahren:
              <ul>
                <li>zu welchem Zweck wir die Verarbeitung durchführen;</li>
                <li>die Kategorien, also die Arten von Daten, die verarbeitet werden;</li>
                <li>
                  wer diese Daten erhält und wenn die Daten an Drittländer übermittelt werden, wie die Sicherheit
                  garantiert werden kann;
                </li>
                <li>wie lange die Daten gespeichert werden;</li>
                <li>
                  das Bestehen des Rechts auf Berichtigung, Löschung oder Einschränkung der Verarbeitung und dem
                  Widerspruchsrecht gegen die Verarbeitung;
                </li>
                <li>
                  dass Sie sich bei einer Aufsichtsbehörde beschweren können (Links zu diesen Behörden finden Sie weiter
                  unten);
                </li>
                <li>die Herkunft der Daten, wenn wir sie nicht bei Ihnen erhoben haben;</li>
                <li>
                  ob Profiling durchgeführt wird, ob also Daten automatisch ausgewertet werden, um zu einem persönlichen
                  Profil von Ihnen zu gelangen
                </li>
              </ul>
              <li>
                Sie haben laut Artikel 16 DSGVO ein Recht auf Berichtigung der Daten, was bedeutet, dass wir Daten
                richtig stellen müssen, falls Sie Fehler finden.
              </li>
              <li>
                Sie haben laut Artikel 17 DSGVO das Recht auf Löschung („Recht auf Vergessenwerden“), was konkret
                bedeutet, dass Sie die Löschung Ihrer Daten verlangen dürfen.
              </li>
              <li>
                Sie haben laut Artikel 18 DSGVO das Recht auf Einschränkung der Verarbeitung, was bedeutet, dass wir die
                Daten nur mehr speichern dürfen aber nicht weiter verwenden.
              </li>
              <li>
                Sie haben laut Artikel 19 DSGVO das Recht auf Datenübertragbarkeit, was bedeutet, dass wir Ihnen auf
                Anfrage Ihre Daten in einem gängigen Format zur Verfügung stellen.
              </li>
              <li>
                Sie haben laut Artikel 21 DSGVO ein Widerspruchsrecht, welches nach Durchsetzung eine Änderung der
                Verarbeitung mit sich bringt.
                <ul>
                  <li>
                    Wenn die Verarbeitung Ihrer Daten auf Artikel 6 Abs. 1 lit. e (öffentliches Interesse, Ausübung
                    öffentlicher Gewalt) oder Artikel 6 Abs. 1 lit. f (berechtigtes Interesse) basiert, können Sie gegen
                    die Verarbeitung Widerspruch einlegen. Wir prüfen danach so rasch wie möglich, ob wir diesem
                    Widerspruch rechtlich nachkommen können.
                  </li>
                  <li>
                    Werden Daten verwendet, um Direktwerbung zu betreiben, können Sie jederzeit gegen diese Art der
                    Datenverarbeitung widersprechen. Wir dürfen Ihre Daten danach nicht mehr für Direktmarketing
                    verwenden
                  </li>
                  <li>
                    Werden Daten verwendet, um Profiling zu betreiben, können Sie jederzeit gegen diese Art der
                    Datenverarbeitung widersprechen. Wir dürfen Ihre Daten danach nicht mehr für Profiling verwenden.
                  </li>
                </ul>
                <li>
                  Sie haben laut Artikel 22 DSGVO unter Umständen das Recht, nicht einer ausschließlich auf einer
                  automatisierten Verarbeitung (zum Beispiel Profiling) beruhenden Entscheidung unterworfen zu werden
                </li>
              </li>
            </li>
          </ul>
          <p>
            <b>Kurz gesagt</b>: Sie haben Rechte – zögern Sie nicht, die oben gelistete verantwortliche Stelle bei uns
            zu kontaktieren!
          </p>
          <p>
            Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre
            datenschutzrechtlichen Ansprüche in sonst einer Weise verletzt worden sind, können Sie sich bei der
            Aufsichtsbehörde beschweren. Diese ist für Österreich die Datenschutzbehörde, deren Website Sie unter{" "}
            <a href="https://www.dsb.gv.at/" target="_blank" rel="noreferrer">
              https://www.dsb.gv.at/
            </a>{" "}
            finden. In Deutschland gibt es für jedes Bundesland einen Datenschutzbeauftragten. Für nähere Informationen
            können Sie sich an die{" "}
            <a href="https://www.bfdi.bund.de/" target="_blank" rel="noreferrer">
              Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI)
            </a>{" "}
            wenden. Für unser Unternehmen ist die folgende lokale Datenschutzbehörde zuständig:
          </p>
          <h1>Webhosting</h1>
          <h2>Was ist Webhosting?</h2>
          <p>
            Wenn Sie heutzutage Websites besuchen, werden gewisse Informationen – auch personenbezogene Daten –
            automatisch erstellt und gespeichert, so auch auf dieser Website. Diese Daten sollten möglichst sparsam und
            nur mit Begründung verarbeitet werden. Mit Website meinen wir übrigens die Gesamtheit aller Webseiten auf
            einer Domain, d.h. alles von der Startseite (Homepage) bis hin zur aller letzten Unterseite (wie dieser
            hier). Mit Domain meinen wir zum Beispiel beispiel.de oder musterbeispiel.com.
          </p>
          <p>
            Wenn Sie eine Website auf einem Bildschirm ansehen möchten, verwenden Sie dafür ein Programm, das sich
            Webbrowser nennt. Sie kennen vermutlich einige Webbrowser beim Namen: Google Chrome, Microsoft Edge, Mozilla
            Firefox und Apple Safari.
          </p>
          <p>
            Dieser Webbrowser muss sich zu einem anderen Computer verbinden, wo der Code der Website gespeichert ist:
            dem Webserver. Der Betrieb eines Webservers ist eine komplizierte und aufwendige Aufgabe, weswegen dies in
            der Regel von professionellen Anbietern, den Providern, übernommen wird. Diese bieten Webhosting an und
            sorgen damit für eine verlässliche und fehlerfreie Speicherung der Daten von Websites.
          </p>
          <p>
            Bei der Verbindungsaufnahme des Browsers auf Ihrem Computer (Desktop, Laptop, Smartphone) und während der
            Datenübertragung zu und vom Webserver kann es zu einer Verarbeitung personenbezogener Daten kommen.
            Einerseits speichert Ihr Computer Daten, andererseits muss auch der Webserver Daten eine Zeit lang
            speichern, um einen ordentlichen Betrieb zu gewährleisten.
          </p>
          <p>Zur Veranschaulichung:</p>
          <h2>Warum verarbeiten wir personenbezogene Daten?</h2>
          <p>Die Zwecke der Datenverarbeitung sind:</p>
          <ol>
            <li>Professionelles Hosting der Website und Absicherung des Betriebs</li>
            <li>zur Aufrechterhaltung der Betriebs- und IT-Sicherheit</li>
            <li>
              Anonyme Auswertung des Zugriffsverhaltens zur Verbesserung unseres Angebots und ggf. zur Strafverfolgung
              bzw. Verfolgung von Ansprüchen
            </li>
          </ol>
          <h2>Welche Daten werden verarbeitet?</h2>
          <p>
            Auch während Sie unsere Website jetzt gerade besuchen, speichert unser Webserver, das ist der Computer auf
            dem diese Webseite gespeichert ist, in der Regel automatisch Daten wie
          </p>
          <ul>
            <li>
              die komplette Internetadresse (URL) der aufgerufenen Webseite (z. B. https://
              www.beispielwebsite.de/beispielunterseite.html?tid=121899806)
            </li>
            <li>Browser und Browserversion (z. B. Chrome 87)</li>
            <li>das verwendete Betriebssystem (z. B. Windows 10)</li>
            <li>
              die Adresse (URL) der zuvor besuchten Seite (Referrer URL) (z. B. https://
              www.beispielquellsite.de/vondabinichgekommen.html/)
            </li>
            <li>
              den Hostnamen und die IP-Adresse des Geräts von welchem aus zugegriffen wird (z. B. COMPUTERNAME und
              194.23.43.121)
            </li>
            <li>Datum und Uhrzeit</li>
            <li>in Dateien, den sogenannten Webserver-Logfiles</li>
          </ul>
          <h2>Wie lange werden Daten gespeichert?</h2>
          <p>
            In der Regel werden die oben genannten Daten zwei Wochen gespeichert und danach automatisch gelöscht. Wir
            geben diese Daten nicht weiter, können jedoch nicht ausschließen, dass diese Daten beim Vorliegen von
            rechtswidrigem Verhalten von Behörden eingesehen werden.
          </p>
          <p>
            <b>Kurz gesagt</b>: Ihr Besuch wird durch unseren Provider (Firma, die unsere Website auf speziellen
            Computern (Servern) laufen lässt), protokolliert, aber wir geben Ihre Daten nicht ohne Zustimmung weiter!
          </p>
          <h2>Rechtsgrundlage</h2>
          <p>
            Die Rechtmäßigkeit der Verarbeitung personenbezogener Daten im Rahmen des Webhosting ergibt sich aus Art. 6
            Abs. 1 lit. f DSGVO (Wahrung der berechtigten Interessen), denn die Nutzung von professionellem Hosting bei
            einem Provider ist notwendig, um das Unternehmen im Internet sicher und nutzerfreundlich präsentieren und
            Angriffe und Forderungen hieraus gegebenenfalls verfolgen zu können.
          </p>
          <p>
            Zwischen uns und dem Hostingprovider besteht in der Regel ein Vertrag über die Auftragsverarbeitung gemäß
            Art. 28 f. DSGVO, der die Einhaltung von Datenschutz gewährleistet und Datensicherheit garantiert.
          </p>
          <h2>World4You Datenschutzerklärung</h2>
          <p>
            Wir nutzen für unsere Website World4You, unter anderem ein Webhosting-Anbieter. Dienstanbieter ist das
            österreichische Unternehmen World4You Internet Services GmbH, Hafenstraße 35, 4020 Linz, Österreich. Mehr
            über die Daten, die durch die Verwendung von World4You verarbeitet werden, erfahren Sie in der
            Datenschutzerklärung auf{" "}
            <a
              href="https://www.world4you.com/de/unternehmen/datenschutzerklaerung.html"
              target="_blank"
              rel="noreferrer"
            >
              https://www.world4you.com/de/unternehmen/datenschutzerklaerung.html
            </a>
            .
          </p>
          <h2>Google Analytics Datenschutzerklärung</h2>
          <p>
            <b>Google Analytics Datenschutzerklärung Zusammenfassung</b> <br />
            Betroffene: Besucher der Website <br />
            Zweck: Auswertung der Besucherinformationen zur Optimierung des Webangebots. Verarbeitete Daten:
            Zugriffsstatistiken, die Daten wie Standorte der Zugriffe, Gerätedaten, Zugriffsdauer und Zeitpunkt,
            Navigationsverhalten, Klickverhalten und IP-Adressen enthalten. Mehr Details dazu finden Sie weiter unten in
            dieser Datenschutzerklärung. <br />
            Speicherdauer: abhängig von den verwendeten Properties <br />
            Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. f DSGVO (Berechtigte
            Interessen)
          </p>
          <h2>Was ist Google Analytics?</h2>
          <p>
            Wir verwenden auf unserer Website das Analyse-Tracking Tool Google Analytics (GA) des amerikanischen
            Unternehmens Google Inc. Für den europäischen Raum ist das Unternehmen Google Analytics Datenschutzerklärung
            Zusammenfassung Betroffene: Besucher der Website Zweck: Auswertung der Besucherinformationen zur Optimierung
            des Webangebots. Verarbeitete Daten: Zugriffsstatistiken, die Daten wie Standorte der Zugriffe, Gerätedaten,
            Zugriffsdauer und Zeitpunkt, Navigationsverhalten, Klickverhalten und IP-Adressen enthalten. Mehr Details
            dazu finden Sie weiter unten in dieser Datenschutzerklärung. Speicherdauer: abhängig von den verwendeten
            Properties Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. f DSGVO
            (Berechtigte Interessen) Google Ireland Limited (Gordon House, Barrow Street Dublin 4, Irland) für alle
            Google-Dienste verantwortlich. Google Analytics sammelt Daten über Ihre Handlungen auf unserer Website. Wenn
            Sie beispielsweise einen Link anklicken, wird diese Aktion in einem Cookie gespeichert und an Google
            Analytics versandt. Mithilfe der Berichte, die wir von Google Analytics erhalten, können wir unsere Website
            und unser Service besser an Ihre Wünsche anpassen. Im Folgenden gehen wir näher auf das Tracking-Tool ein
            und informieren Sie vor allem darüber, welche Daten gespeichert werden und wie Sie das verhindern können.
          </p>
          <p>
            Google Analytics ist ein Trackingtool, das der Datenverkehrsanalyse unserer Website dient. Damit Google
            Analytics funktioniert, wird ein Tracking-Code in den Code unserer Website eingebaut. Wenn Sie unsere
            Website besuchen, zeichnet dieser Code verschiedene Handlungen auf, die Sie auf unserer Website ausführen.
            Sobald Sie unsere Website verlassen, werden diese Daten an die Google-Analytics-Server gesendet und dort
            gespeichert.
          </p>
          <p>
            Google verarbeitet die Daten und wir bekommen Berichte über Ihr Userverhalten. Dabei kann es sich unter
            anderem um folgende Berichte handeln:
          </p>
          <ul>
            <li>
              Zielgruppenberichte: Über Zielgruppenberichte lernen wir unsere User besser kennen und wissen genauer, wer
              sich für unser Service interessiert.
            </li>
            <li>
              Anzeigeberichte: Durch Anzeigeberichte können wir unsere Onlinewerbung leichter analysieren und
              verbessern.
            </li>
            <li>
              Akquisitionsberichte: Akquisitionsberichte geben uns hilfreiche Informationen darüber, wie wir mehr
              Menschen für unser Service begeistern können.
            </li>
            <li>
              Verhaltensberichte: Hier erfahren wir, wie Sie mit unserer Website interagieren. Wir können nachvollziehen
              welchen Weg Sie auf unserer Seite zurücklegen und welche Links Sie anklicken.
            </li>
            <li>
              Conversionsberichte: Conversion nennt man einen Vorgang, bei dem Sie aufgrund einer Marketing-Botschaft
              eine gewünschte Handlung ausführen. Zum Beispiel, wenn Sie von einem reinen Websitebesucher zu einem
              Käufer oder Newsletter-Abonnent werden. Mithilfe dieser Berichte erfahren wir mehr darüber, wie unsere
              Marketing-Maßnahmen bei Ihnen ankommen. So wollen wir unsere Conversionrate steigern.
            </li>
            <li>
              Echtzeitberichte: Hier erfahren wir immer sofort, was gerade auf unserer Website passiert. Zum Beispiel
              sehen wir wie viele User gerade diesen Text lesen.
            </li>
          </ul>
          <h2>Warum verwenden wir Google Analytics auf unserer Website?</h2>
          <p>
            Unser Ziel mit dieser Website ist klar: Wir wollen Ihnen das bestmögliche Service bieten. Die Statistiken
            und Daten von Google Analytics helfen uns dieses Ziel zu erreichen.
          </p>
          <p>
            Die statistisch ausgewerteten Daten zeigen uns ein klares Bild von den Stärken und Schwächen unserer
            Website. Einerseits können wir unsere Seite so optimieren, dass sie von interessierten Menschen auf Google
            leichter gefunden wird. Andererseits helfen uns die Daten, Sie als Besucher besser zu verstehen. Wir wissen
            somit sehr genau, was wir an unserer Website verbessern müssen, um Ihnen das bestmögliche Service zu bieten.
            Die Daten dienen uns auch, unsere Werbe- und Marketing-Maßnahmen individueller und kostengünstiger
            durchzuführen. Schließlich macht es nur Sinn, unsere Produkte und Dienstleistungen Menschen zu zeigen, die
            sich dafür interessieren.
          </p>
          <h2>Welche Daten werden von Google Analytics gespeichert?</h2>
          <p>
            Google Analytics erstellt mithilfe eines Tracking-Codes eine zufällige, eindeutige ID, die mit Ihrem
            Browser-Cookie verbunden ist. So erkennt Sie Google Analytics als neuen User. Wenn Sie das nächste Mal
            unsere Seite besuchen, werden Sie als „wiederkehrender“ User erkannt. Alle gesammelten Daten werden
            gemeinsam mit dieser User-ID gespeichert. So ist es überhaupt erst möglich pseudonyme Userprofile
            auszuwerten.
          </p>
          <p>
            Um mit Google Analytics unsere Website analysieren zu können, muss eine Property-ID in den Tracking-Code
            eingefügt werden. Die Daten werden dann in der entsprechenden Property gespeichert. Für jede neu angelegte
            Property ist die Google Analytics 4-Property standardmäßig. Alternativ kann man aber auch noch die Universal
            Analytics Property erstellen. Je nach verwendeter Property werden Daten unterschiedlich lange gespeichert.
          </p>
          <p>
            Durch Kennzeichnungen wie Cookies und App-Instanz-IDs werden Ihre Interaktionen auf unserer Website
            gemessen. Interaktionen sind alle Arten von Handlungen, die Sie auf unserer Website ausführen. Wenn Sie auch
            andere Google-Systeme (wie z.B. ein Google-Konto) nützen, können über Google Analytics generierte Daten mit
            Drittanbieter-Cookies verknüpft werden. Google gibt keine Google Analytics-Daten weiter, außer wir als
            Websitebetreiber genehmigen das. Zu Ausnahmen kann es kommen, wenn es gesetzlich erforderlich ist.
          </p>
          <p>Folgende Cookies werden von Google Analytics verwendet:</p>
          <p>
            <b>Name</b>: _ga <br />
            <b>Wert</b>: 2.1326744211.152121899806-5 <br />
            <b>Verwendungszweck</b>: Standardmäßig verwendet analytics.js das Cookie _ga, um die User-ID zu speichern.
            Grundsätzlich dient es zur Unterscheidung der Webseitenbesucher. <br />
            <b>Ablaufdatum</b>: nach 2 Jahren
          </p>
          <p>
            <b>Name</b>: _gid <br />
            <b>Wert</b>: 2.1687193234.152121899806-1 <br />
            <b>Verwendungszweck</b>: Das Cookie dient auch zur Unterscheidung der Webseitenbesucher <br />
            <b>Ablaufdatum</b>: nach 24 Stunden
          </p>
          <p>
            <b>Name</b>: _gat_gtag_UA_-property-id- <br />
            <b>Wert</b>: 1 <br />
            <b>Verwendungszweck</b>: Wird zum Senken der Anforderungsrate verwendet. Wenn Google Analytics über den
            Google Tag Manager bereitgestellt wird, erhält dieser Cookie den Namen _dc_gtm_-property-id-. <br />
            <b>Ablaufdatum</b>: nach 1 Minute
          </p>
          <p>
            <b>Name</b>: AMP_TOKEN <br />
            <b>Wert</b>: keine Angaben <br />
            <b>Verwendungszweck</b>: Das Cookie hat einen Token, mit dem eine User ID vom AMP-Client-IDDienst abgerufen
            werden kann. Andere mögliche Werte weisen auf eine Abmeldung, eine Anfrage oder einen Fehler hin. <br />
            <b>Ablaufdatum</b>: nach 30 Sekunden bis zu einem Jahr
          </p>
          <p>
            <b>Name</b>: __utma <br />
            <b>Wert</b>: 1564498958.1564498958.1564498958.1 <br />
            <b>Verwendungszweck</b>: Mit diesem Cookie kann man Ihr Verhalten auf der Website verfolgen und die Leistung
            messen. Das Cookie wird jedes Mal aktualisiert, wenn Informationen an Google Analytics gesendet werden.{" "}
            <br />
            <b>Ablaufdatum</b>: nach 2 Jahren
          </p>
          <p>
            <b>Name</b>: __utmt <br />
            <b>Wert</b>: 1 <br />
            <b>Verwendungszweck</b>: Das Cookie wird wie _gat_gtag_UA_-property-id- zum Drosseln der Anforderungsrate
            verwendet.
            <br />
            <b>Ablaufdatum</b>: nach 10 Minuten
          </p>
          <p>
            <b>Name</b>: __utmb <br />
            <b>Wert</b>: 3.10.1564498958 <br />
            <b>Verwendungszweck</b>: Dieses Cookie wird verwendet, um neue Sitzungen zu bestimmen. Es wird jedes Mal
            aktualisiert, wenn neue Daten bzw. Infos an Google Analytics gesendet werden
            <br />
            <b>Ablaufdatum</b>: nach 30 Minuten
          </p>
          <p>
            <b>Name</b>: __utmc <br />
            <b>Wert</b>: 167421564 <br />
            <b>Verwendungszweck</b>: Dieses Cookie wird verwendet, um neue Sitzungen für wiederkehrende Besucher
            festzulegen. Dabei handelt es sich um ein Session-Cookie und wird nur solange gespeichert, bis Sie den
            Browser wieder schließen
            <br />
            <b>Ablaufdatum</b>: Nach Schließung des Browsers
          </p>
          <p>
            <b>Name</b>: __utmz <br />
            <b>Wert</b>: m|utmccn=(referral)|utmcmd=referral|utmcct=/ <br />
            <b>Verwendungszweck</b>: Das Cookie wird verwendet, um die Quelle des Besucheraufkommens auf unserer Website
            zu identifizieren. Das heißt, das Cookie speichert, von wo Sie auf unsere Website gekommen sind. Das kann
            eine andere Seite bzw. eine Werbeschaltung gewesen sein.
            <br />
            <b>Ablaufdatum</b>: nach 6 Monaten
          </p>
          <p>
            <b>Name</b>: __utmv <br />
            <b>Wert</b>: keine Angabe <br />
            <b>Verwendungszweck</b>: Das Cookie wird verwendet, um benutzerdefinierte Userdaten zu speichern. Es wird
            immer aktualisiert, wenn Informationen an Google Analytics gesendet werden.
            <br />
            <b>Ablaufdatum</b>: nach 2 Jahren
          </p>
          <p>
            <b>Anmerkung</b>: Diese Aufzählung kann keinen Anspruch auf Vollständigkeit erheben, da Google die Wahl
            ihrer Cookies immer wieder auch verändert.
          </p>
          <p>
            Hier zeigen wir Ihnen einen Überblick über die wichtigsten Daten, die mit Google Analytics erhoben werden:
          </p>
          <p>
            <b>Heatmaps</b>: Google legt sogenannte Heatmaps an. Über Heatmaps sieht man genau jene Bereiche, die Sie
            anklicken. So bekommen wir Informationen, wo Sie auf unserer Seite „unterwegs“ sind.
          </p>
          <p>
            <b>Sitzungsdauer</b>: Als Sitzungsdauer bezeichnet Google die Zeit, die Sie auf unserer Seite verbringen,
            ohne die Seite zu verlassen. Wenn Sie 20 Minuten inaktiv waren, endet die Sitzung automatisch.
          </p>
          <p>
            <b>Absprungrate</b> (engl. Bouncerate): Von einem Absprung ist die Rede, wenn Sie auf unserer Website nur
            eine Seite ansehen und dann unsere Website wieder verlassen.
          </p>
          <p>
            <b>Kontoerstellung</b>: Wenn Sie auf unserer Website ein Konto erstellen bzw. eine Bestellung machen, erhebt
            Google Analytics diese Daten.
          </p>
          <p>
            <b>IP-Adresse</b>: Die IP-Adresse wird nur in gekürzter Form dargestellt, damit keine eindeutige Zuordnung
            möglich ist.
          </p>
          <p>
            <b>Standort</b>: Über die IP-Adresse kann das Land und Ihr ungefährer Standort bestimmt werden. Diesen
            Vorgang bezeichnet man auch als IP- Standortbestimmung.
          </p>
          <p>
            <b>Technische Informationen</b>: Zu den technischen Informationen zählen unter anderem Ihr Browsertyp, Ihr
            Internetanbieter oder Ihre Bildschirmauflösung.
          </p>
          <p>
            <b>Herkunftsquelle</b>: Google Analytics beziehungsweise uns interessiert natürlich auch über welche Website
            oder welche Werbung Sie auf unsere Seite gekommen sind.
          </p>
          <p>
            Weitere Daten sind Kontaktdaten, etwaige Bewertungen, das Abspielen von Medien (z.B., wenn Sie ein Video
            über unsere Seite abspielen), das Teilen von Inhalten über Social Media oder das Hinzufügen zu Ihren
            Favoriten. Die Aufzählung hat keinen Vollständigkeitsanspruch und dient nur zu einer allgemeinen
            Orientierung der Datenspeicherung durch Google Analytics.
          </p>
          <h2>Wie lange und wo werden die Daten gespeichert?</h2>
          <p>
            Google hat Ihre Server auf der ganzen Welt verteilt. Die meisten Server befinden sich in Amerika und
            folglich werden Ihre Daten meist auf amerikanischen Servern gespeichert. Hier können Sie genau nachlesen wo
            sich die Google-Rechenzentren befinden:{" "}
            <a href="https://www.google.com/about/datacenters/inside/locations/?hl=de" target="_blank" rel="noreferrer">
              https://www.google.com/about/datacenters/inside/locations/?hl=de
            </a>
          </p>
          <p>
            Ihre Daten werden auf verschiedenen physischen Datenträgern verteilt. Das hat den Vorteil, dass die Daten
            schneller abrufbar sind und vor Manipulation besser geschützt sind. In jedem GoogleRechenzentrum gibt es
            entsprechende Notfallprogramme für Ihre Daten. Wenn beispielsweise die Hardware bei Google ausfällt oder
            Naturkatastrophen Server lahmlegen, bleibt das Risiko einer Dienstunterbrechung bei Google dennoch gering.
          </p>
          <p>
            Die Aufbewahrungsdauer der Daten hängt von den verwendeten Properties ab. Bei der Verwendung der neueren
            Google Analytics 4-Properties ist die Aufbewahrungsdauer Ihrer Userdaten auf 14 Monate fix eingestellt. Für
            andere sogenannte Ereignisdaten haben wir die Möglichkeit eine Aufbewahrungsdauer von 2 Monaten oder 14
            Monaten zu wählen.
          </p>
          <p>
            Bei Universal Analytics-Properties ist bei Google Analytics eine Aufbewahrungsdauer Ihrer Userdaten von 26
            Monaten standardisiert eingestellt. Dann werden Ihre Userdaten gelöscht. Allerdings haben wir die
            Möglichkeit, die Aufbewahrungsdauer von Nutzdaten selbst zu wählen. Dafür stehen uns fünf Varianten zur
            Verfügung:
          </p>
          <ul>
            <li>Löschung nach 14 Monaten</li>
            <li>Löschung nach 26 Monaten</li>
            <li>Löschung nach 38 Monaten</li>
            <li>Löschung nach 50 Monaten</li>
            <li>Keine automatische Löschung</li>
          </ul>
          <p>
            Zusätzlich gibt es auch die Option, dass Daten erst dann gelöscht werden, wenn Sie innerhalb des von uns
            gewählten Zeitraums nicht mehr unsere Website besuchen. In diesem Fall wird die Aufbewahrungsdauer jedes Mal
            zurückgesetzt, wenn Sie unsere Website innerhalb des festgelegten Zeitraums wieder besuchen
          </p>
          <p>
            Wenn der festgelegte Zeitraum abgelaufen ist, werden einmal im Monat die Daten gelöscht. Diese
            Aufbewahrungsdauer gilt für Ihre Daten, die mit Cookies, Usererkennung und Werbe-IDs (z.B. Cookies der
            DoubleClick-Domain) verknüpft sind. Berichtergebnisse basieren auf aggregierten Daten und werden unabhängig
            von Nutzerdaten gespeichert. Aggregierte Daten sind eine Zusammenschmelzung von Einzeldaten zu einer
            größeren Einheit.
          </p>
          <h2>Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</h2>
          <p>
            Nach dem Datenschutzrecht der Europäischen Union haben Sie das Recht, Auskunft über Ihre Daten zu erhalten,
            sie zu aktualisieren, zu löschen oder einzuschränken. Mithilfe des Browser-Addons zur Deaktivierung von
            Google Analytics-JavaScript (ga.js, analytics.js, dc.js) verhindern Sie, dass Google Analytics Ihre Daten
            verwendet. Das Browser-Add-on können Sie unter{" "}
            <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noreferrer">
              https://tools.google.com/dlpage/gaoptout?hl=de
            </a>{" "}
            runterladen und installieren. Beachten Sie bitte, dass durch dieses Add-on nur die Datenerhebung durch
            Google Analytics deaktiviert wird.
          </p>
          <p>
            Falls Sie grundsätzlich Cookies (unabhängig von Google Analytics) deaktivieren, löschen oder verwalten
            wollen, gibt es für jeden Browser eine eigene Anleitung:
          </p>
          <p>
            <a href="https://support.google.com/chrome/answer/95647?tid=121899806" target="_blank" rel="noreferrer">
              Chrome: Cookies in Chrome löschen, aktivieren und verwalten
            </a>
          </p>
          <p>
            <a
              href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Safari: Verwalten von Cookies und Websitedaten mit Safari
            </a>
          </p>
          <p>
            <a
              href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
            </a>
          </p>
          <p>
            <a
              href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Internet Explorer: Löschen und Verwalten von Cookies Microsoft Websites auf Ihrem Computer abgelegt haben
            </a>
          </p>
          <p>
            <a
              href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Edge: Löschen und Verwalten von Cookies
            </a>
          </p>
          <h2>Rechtsgrundlage</h2>
          <p>
            Der Einsatz von Google Analytics setzt Ihre Einwilligung voraus, welche wir mit unserem Cookie Popup
            eingeholt haben. Diese Einwilligung stellt laut <b>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</b> die
            Rechtsgrundlage für die Verarbeitung personenbezogener Daten, wie sie bei der Erfassung durch Web-Analytics
            Tools vorkommen kann, dar.
          </p>
          <p>
            Zusätzlich zur Einwilligung besteht von unserer Seite ein berechtigtes Interesse daran, dass Verhalten der
            Websitebesucher zu analysieren und so unser Angebot technisch und wirtschaftlich zu verbessern. Mit Hilfe
            von Google Analytics erkennen wir Fehler der Website, können Attacken identifizieren und die
            Wirtschaftlichkeit verbessern. Die Rechtsgrundlage dafür ist{" "}
            <b>Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen)</b>. Wir setzen Google Analytics gleichwohl nur ein,
            soweit Sie eine Einwilligung erteilt haben.
          </p>
          <p>
            Google verarbeitet Daten von Ihnen u.a. auch in den USA. Wir weisen darauf hin, dass nach Meinung des
            Europäischen Gerichtshofs derzeit kein angemessenes Schutzniveau für den Datentransfer in die USA besteht.
            Dies kann mit verschiedenen Risiken für die Rechtmäßigkeit und Sicherheit der Datenverarbeitung einhergehen.
          </p>
          <p>
            Als Grundlage der Datenverarbeitung bei Empfängern mit Sitz in Drittstaaten (außerhalb der Europäischen
            Union, Island, Liechtenstein, Norwegen, also insbesondere in den USA) oder einer Datenweitergabe dorthin
            verwendet Google sogenannte Standardvertragsklauseln (= Art. 46. Abs. 2 und 3 DSGVO).
            Standardvertragsklauseln (Standard Contractual Clauses – SCC) sind von der EUKommission bereitgestellte
            Mustervorlagen und sollen sicherstellen, dass Ihre Daten auch dann den europäischen Datenschutzstandards
            entsprechen, wenn diese in Drittländer (wie beispielsweise in die USA) überliefert und dort gespeichert
            werden. Durch diese Klauseln verpflichtet sich Google, bei der Verarbeitung Ihrer relevanten Daten, das
            europäische Datenschutzniveau einzuhalten, selbst wenn die Daten in den USA gespeichert, verarbeitet und
            verwaltet werden. Diese Klauseln basieren auf einem Durchführungsbeschluss der EU-Kommission. Sie finden den
            Beschluss und die entsprechenden Standardvertragsklauseln u.a. hier:{" "}
            <a href="https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj?locale=de" target="_blank" rel="noreferrer">
              https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj?locale=de
            </a>
            . Die Google Ads Datenverarbeitungsbedingungen (Google Ads Data Processing Terms), welche den
            Standardvertragsklauseln entsprechen und auch für Google Analytics geltend sind, finden Sie unter
            <a href="https://business.safety.google/adsprocessorterms/" target="_blank" rel="noreferrer">
              https://business.safety.google/adsprocessorterms/
            </a>
            . Wir hoffen, wir konnten Ihnen die wichtigsten Informationen rund um die Datenverarbeitung von Google
            Analytics näherbringen. Wenn Sie mehr über den Tracking-Dienst erfahren wollen, empfehlen wir diese beiden
            Links:{" "}
            <a href="http://www.google.com/analytics/terms/de.html" target="_blank" rel="noreferrer">
              http://www.google.com/analytics/terms/de.html
            </a>{" "}
            und{" "}
            <a href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" rel="noreferrer">
              https://support.google.com/analytics/answer/6004245?hl=de
            </a>
          </p>
          <h2>Google Analytics Berichte zu demografischen Merkmalen und Interessen</h2>
          <p>
            Wir haben in Google Analytics die Funktionen für Werbeberichte eingeschaltet. Die Berichte zu demografischen
            Merkmalen und Interessen enthalten Angaben zu Alter, Geschlecht und Interessen. Damit können wir uns – ohne
            diese Daten einzelnen Personen zuordnen zu können – ein besseres Bild von unseren Nutzern machen. Mehr über
            die Werbefunktionen erfahren Sie auf{" "}
            <a
              href="https://support.google.com/analytics/answer/3450482?hl=de_AT&utm_id=ad"
              target="_blank"
              rel="noreferrer"
            >
              https://support.google.com/analytics/answer/3450482?hl=de_AT&utm_id=ad
            </a>
            .
          </p>
          <p>
            Sie können die Nutzung der Aktivitäten und Informationen Ihres Google Kontos unter “Einstellungen für
            Werbung” auf{" "}
            <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noreferrer">
              https://adssettings.google.com/authenticated
            </a>{" "}
            per Checkbox beenden.
          </p>
          <h2>Google Analytics Deaktivierungslink</h2>
          <p>
            Wenn Sie auf folgenden Deaktivierungslink klicken, können Sie verhindern, dass Google weitere Besuche auf
            dieser Website erfasst. Achtung: Das Löschen von Cookies, die Nutzung des Inkognito/ Privatmodus ihres
            Browsers, oder die Nutzung eines anderen Browsers führt dazu, dass wieder Daten erhoben werden.
          </p>
          <p>Google Analytics deaktivieren</p>
          <h2>Google Analytics Google-Signale Datenschutzerklärung</h2>
          <p>
            Wir haben in Google Analytics die Google-Signale aktiviert. So werden die bestehenden
            GoogleAnalytics-Funktionen (Werbeberichte, Remarketing, gerätübergreifende Berichte und Berichte zu
            Interessen und demografische Merkmale) aktualisiert, um zusammengefasste und anonymisierte Daten von Ihnen
            zu erhalten, sofern Sie personalisierte Anzeigen in Ihrem Google-Konto erlaubt haben.
          </p>
          <p>
            Das besondere daran ist, dass es sich dabei um ein Cross-Device-Tracking handelt. Das heißt Ihre Daten
            können geräteübergreifend analysiert werden. Durch die Aktivierung von Google-Signale werden Daten erfasst
            und mit dem Google-Konto verknüpft. Google kann dadurch zum Beispiel erkennen, wenn Sie auf unsere Webseite
            über ein Smartphone ein Produkt ansehen und erst später über einen Laptop das Produkt kaufen. Dank der
            Aktivierung von Google-Signale können wir gerätübergreifende Remarketing-Kampagnen starten, die sonst in
            dieser Form nicht möglich wären. Remarketing bedeutet, dass wir Ihnen auch auf anderen Webseiten unser
            Angebot zeigen können.
          </p>
          <p>
            In Google Analytics werden zudem durch die Google-Signale weitere Besucherdaten wie Standort, Suchverlauf,
            YouTube-Verlauf und Daten über Ihre Handlungen auf unserer Webseite, erfasst. Wir erhalten dadurch von
            Google bessere Werbeberichte und nützlichere Angaben zu Ihren Interessen und demografischen Merkmalen. Dazu
            gehören Ihr Alter, welche Sprache sie sprechen, wo Sie wohnen oder welchem Geschlecht Sie angehören. Weiters
            kommen auch noch soziale Kriterien wie Ihr Beruf, Ihr Familienstand oder Ihr Einkommen hinzu. All diese
            Merkmal helfen Google Analytics Personengruppen bzw. Zielgruppen zu definieren.
          </p>
          <p>
            Die Berichte helfen uns auch Ihr Verhalten, Ihre Wünsche und Interessen besser einschätzen zu können.
            Dadurch können wir unsere Dienstleistungen und Produkte für Sie optimieren und anpassen. Diese Daten laufen
            standardmäßig nach 26 Monaten ab. Bitte beachten Sie, dass diese Datenerfassung nur erfolgt, wenn Sie
            personalisierte Werbung in Ihrem Google-Konto zugelassen haben. Es handelt sich dabei immer um
            zusammengefasste und anonyme Daten und nie um Daten einzelner Personen. In Ihrem Google-Konto können Sie
            diese Daten verwalten bzw. auch löschen.
          </p>
          <h2>Google Analytics IP-Anonymisierung</h2>
          <p>
            Wir haben auf dieser Webseite die IP-Adressen-Anonymisierung von Google Analytics implementiert. Diese
            Funktion wurde von Google entwickelt, damit diese Webseite die geltenden Datenschutzbestimmungen und
            Empfehlungen der lokalen Datenschutzbehörden einhalten kann, wenn diese eine Speicherung der vollständigen
            IP-Adresse untersagen. Die Anonymisierung bzw. Maskierung der IP findet statt, sobald die IP-Adressen im
            Google AnalyticsDatenerfassungsnetzwerk eintreffen und bevor eine Speicherung oder Verarbeitung der Daten
            stattfindet.
          </p>
          <p>
            Mehr Informationen zur IP-Anonymisierung finden Sie auf{" "}
            <a href="https://support.google.com/analytics/answer/2763052?hl=de" target="_blank" rel="noreferrer">
              https://support.google.com/analytics/answer/2763052?hl=de
            </a>
            .
          </p>
          <h2>Google Analytics Zusatz zur Datenverarbeitung</h2>
          <p>
            Wir haben mit Google einen Direktkundenvertrag zur Verwendung von Google Analytics abgeschlossen, indem wir
            den “Zusatz zur Datenverarbeitung” in Google Analytics akzeptiert haben.
          </p>
          <p>
            Mehr über den Zusatz zur Datenverarbeitung für Google Analytics finden Sie hier:{" "}
            <a
              href="https://support.google.com/analytics/answer/3379636?hl=de&utm_id=ad"
              target="_blank"
              rel="noreferrer"
            >
              https://support.google.com/analytics/answer/3379636?hl=de&utm_id=ad
            </a>
          </p>
          <h2>Instagram Datenschutzerklärung</h2>
          <p>
            <b>Instagram Datenschutzerklärung Zusammenfassung</b> <br />
            Betroffene: Besucher der Website <br />
            Zweck: Optimierung unserer Serviceleistung <br />
            Verarbeitete Daten: Daten wie etwa Daten zum Nutzerverhalten, Informationen zu Ihrem Gerät und Ihre
            IP-Adresse. <br />
            Mehr Details dazu finden Sie weiter unten in der Datenschutzerklärung. <br />
            Speicherdauer: bis Instagram die Daten für ihre Zwecke nicht mehr benötigt <br />
            Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. f DSGVO (Berechtigte
            Interessen)
          </p>
          <h2>Was ist Instagram? </h2>
          <p>
            Wir haben auf unserer Webseite Funktionen von Instagram eingebaut. Instagram ist eine Social Media Plattform
            des Unternehmens Instagram LLC, 1601 Willow Rd, Menlo Park CA 94025, USA. Instagram ist seit 2012 ein
            Tochterunternehmen von Facebook Inc. und gehört zu den FacebookProdukten. Das Einbetten von
            Instagram-Inhalten auf unserer Webseite nennt man Embedding. Dadurch können wir Ihnen Inhalte wie Buttons,
            Fotos oder Videos von Instagram direkt auf unserer Webseite zeigen. Wenn Sie Webseiten unserer Webpräsenz
            aufrufen, die eine Instagram-Funktion integriert haben, werden Daten an Instagram übermittelt, gespeichert
            und verarbeitet. Instagram verwendet dieselben Systeme und Technologien wie Facebook. Ihre Daten werden
            somit über alle Facebook-Firmen hinweg verarbeitet.
          </p>
          <p>
            Im Folgenden wollen wir Ihnen einen genaueren Einblick geben, warum Instagram Daten sammelt, um welche Daten
            es sich handelt und wie Sie die Datenverarbeitung weitgehend kontrollieren können. Da Instagram zu Facebook
            Inc. gehört, beziehen wir unsere Informationen einerseits von den Instagram-Richtlinien, andererseits
            allerdings auch von den Facebook-Datenrichtlinien selbst.
          </p>
          <p>
            Instagram ist eines der bekanntesten Social Media Netzwerken weltweit. Instagram kombiniert die Vorteile
            eines Blogs mit den Vorteilen von audiovisuellen Plattformen wie YouTube oder Vimeo. Sie können auf „Insta“
            (wie viele der User die Plattform salopp nennen) Fotos und kurze Videos hochladen, mit verschiedenen Filtern
            bearbeiten und auch in anderen sozialen Netzwerken verbreiten. Und wenn Sie selbst nicht aktiv sein wollen,
            können Sie auch nur anderen interessante Users folgen.
          </p>
          <h2>Warum verwenden wir Instagram auf unserer Website?</h2>
          <p>
            Instagram ist jene Social Media Plattform, die in den letzten Jahren so richtig durch die Decke ging. Und
            natürlich haben auch wir auf diesen Boom reagiert. Wir wollen, dass Sie sich auf unserer Webseite so wohl
            wie möglich fühlen. Darum ist für uns eine abwechslungsreiche Aufbereitung unserer Inhalte
            selbstverständlich. Durch die eingebetteten Instagram-Funktionen können wir unseren Content mit hilfreichen,
            lustigen oder spannenden Inhalten aus der Instagram-Welt bereichern. Da Instagram eine Tochtergesellschaft
            von Facebook ist, können uns die erhobenen Daten auch für personalisierte Werbung auf Facebook dienlich
            sein. So bekommen unsere Werbeanzeigen nur Menschen, die sich wirklich für unsere Produkte oder
            Dienstleistungen interessieren.
          </p>
          <p>
            Instagram nützt die gesammelten Daten auch zu Messungs- und Analysezwecken. Wir bekommen zusammengefasste
            Statistiken und so mehr Einblick über Ihre Wünsche und Interessen. Wichtig ist zu erwähnen, dass diese
            Berichte Sie nicht persönlich identifizieren.
          </p>
          <h2>Welche Daten werden von Instagram gespeichert?</h2>
          <p>
            Wenn Sie auf eine unserer Seiten stoßen, die Instagram-Funktionen (wie Instagrambilder oder Plugins)
            eingebaut haben, setzt sich Ihr Browser automatisch mit den Servern von Instagram in Verbindung. Dabei
            werden Daten an Instagram versandt, gespeichert und verarbeitet. Und zwar unabhängig, ob Sie ein
            Instagram-Konto haben oder nicht. Dazu zählen Informationen über unserer Webseite, über Ihren Computer, über
            getätigte Käufe, über Werbeanzeigen, die Sie sehen und wie Sie unser Angebot nutzen. Weiters werden auch
            Datum und Uhrzeit Ihrer Interaktion mit Instagram gespeichert. Wenn Sie ein Instagram-Konto haben bzw.
            eingeloggt sind, speichert Instagram deutlich mehr Daten über Sie.
          </p>
          <p>
            Facebook unterscheidet zwischen Kundendaten und Eventdaten. Wir gehen davon aus, dass dies bei Instagram
            genau so der Fall ist. Kundendaten sind zum Beispiel Name, Adresse, Telefonnummer und IP-Adresse. Diese
            Kundendaten werden erst an Instagram übermittelt werden, wenn Sie zuvor „gehasht“ wurden. Hashing meint, ein
            Datensatz wird in eine Zeichenkette verwandelt. Dadurch kann man die Kontaktdaten verschlüsseln. Zudem
            werden auch die oben genannten „Event-Daten“ übermittelt. Unter „Event-Daten“ versteht Facebook – und
            folglich auch Instagram – Daten über Ihr Userverhalten. Es kann auch vorkommen, dass Kontaktdaten mit
            Event-Daten kombiniert werden. Die erhobenen Kontaktdaten werden mit den Daten, die Instagram bereits von
            Ihnen hat, abgeglichen.
          </p>
          <p>
            Über kleine Text-Dateien (Cookies), die meist in Ihrem Browser gesetzt werden, werden die gesammelten Daten
            an Facebook übermittelt. Je nach verwendeten Instagram-Funktionen und ob Sie selbst ein Instagram-Konto
            haben, werden unterschiedlich viele Daten gespeichert.
          </p>
          <p>
            Wir gehen davon aus, dass bei Instagram die Datenverarbeitung gleich funktioniert wie bei Facebook. Das
            bedeutet: wenn Sie ein Instagram-Konto haben oder www.instagram.com besucht haben, hat Instagram zumindest
            ein Cookie gesetzt. Wenn das der Fall ist, sendet Ihr Browser über das Cookie Infos an Instagram, sobald Sie
            mit einer Instagram-Funktion in Berührung kommen. Spätestens nach 90 Tagen (nach Abgleichung) werden diese
            Daten wieder gelöscht bzw. anonymisiert. Obwohl wir uns intensiv mit der Datenverarbeitung von Instagram
            beschäftigt haben, können wir nicht ganz genau sagen, welche Daten Instagram exakt sammelt und speichert.
          </p>
          <p>
            Im Folgenden zeigen wir Ihnen Cookies, die in Ihrem Browser mindestens gesetzt werden, wenn Sie auf eine
            Instagram-Funktion (wie z.B. Button oder ein Insta-Bild) klicken. Bei unserem Test gehen wir davon aus, dass
            Sie kein Instagram-Konto haben. Wenn Sie bei Instagram eingeloggt sind, werden natürlich deutlich mehr
            Cookies in Ihrem Browser gesetzt.
          </p>
          <p>Diese Cookies wurden bei unserem Test verwendet:</p>
          <p>
            <b>Name</b>: csrftoken <br />
            <b>Wert</b>: <br />
            <b>Verwendungszweck</b>: Dieses Cookie wird mit hoher Wahrscheinlichkeit aus Sicherheitsgründen gesetzt, um
            Fälschungen von Anfragen zu verhindern. Genauer konnten wir das allerdings nicht in Erfahrung bringen.{" "}
            <br />
            <b>Ablaufdatum</b>: nach einem Jahr
          </p>
          <p>
            <b>Name</b>: mid <br />
            <b>Wert</b>: <br />
            <b>Verwendungszweck</b>: Instagram setzt dieses Cookie, um die eigenen Dienstleistungen und Angebote in und
            außerhalb von Instagram zu optimieren. Das Cookie legt eine eindeutige User-ID fest. <br />
            <b>Ablaufdatum</b>: nach Ende der Sitzung
          </p>
          <p>
            <b>Name</b>: fbsr_121899806124024 <br />
            <b>Wert</b>: keine Angaben <br />
            <b>Verwendungszweck</b>: Dieses Cookie speichert die Log-in-Anfrage für User der Instagram-App.
            <br />
            <b>Ablaufdatum</b>: nach Ende der Sitzung
          </p>
          <p>
            <b>Name</b>: rur <br />
            <b>Wert</b>: ATN <br />
            <b>Verwendungszweck</b>: Dabei handelt es sich um ein Instagram-Cookie, das die Funktionalität auf Instagram
            gewährleistet.
            <br />
            <b>Ablaufdatum</b>: nach Ende der Sitzung
          </p>
          <p>
            <b>Name</b>: urlgen <br />
            <b>Wert</b>: "-194.96.75.33:1901-:1iEtYv:Y833k2_UjKvXgYe121899806" <br />
            <b>Verwendungszweck</b>: : Dieses Cookie dient den Marketingzwecken von Instagram
            <br />
            <b>Ablaufdatum</b>: nach Ende der Sitzung
          </p>
          <p>
            <b>Anmerkung</b>: Wir können hier keinen Vollständigkeitsanspruch erheben. Welche Cookies im individuellen
            Fall gesetzt werden, hängt von den eingebetteten Funktionen und Ihrer Verwendung von Instagram ab.
          </p>
          <h2>Wie lange und wo werden die Daten gespeichert?</h2>
          <p>
            Instagram teilt die erhaltenen Informationen zwischen den Facebook-Unternehmen mit externen Partnern und mit
            Personen, mit denen Sie sich weltweit verbinden. Die Datenverarbeitung erfolgt unter Einhaltung der eigenen
            Datenrichtlinie. Ihre Daten sind, unter anderem aus Sicherheitsgründen, auf den Facebook-Servern auf der
            ganzen Welt verteilt. Die meisten dieser Server stehen in den USA.
          </p>
          <h2>Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</h2>
          <p>
            Dank der Datenschutz Grundverordnung haben Sie das Recht auf Auskunft, Übertragbarkeit, Berichtigung und
            Löschung Ihrer Daten. In den Instagram-Einstellungen können Sie Ihre Daten verwalten. Wenn Sie Ihre Daten
            auf Instagram völlig löschen wollen, müssen Sie Ihr InstagramKonto dauerhaft löschen.
          </p>
          <p>Und so funktioniert die Löschung des Instagram-Kontos:</p>
          <p>
            Öffnen Sie zuerst die Instagram-App. Auf Ihrer Profilseite gehen Sie nach unten und klicken Sie auf
            „Hilfebereich“. Jetzt kommen Sie auf die Webseite des Unternehmens. Klicken Sie auf der Webseite auf
            „Verwalten des Kontos“ und dann auf „Dein Konto löschen“.
          </p>
          <p>
            Wenn Sie Ihr Konto ganz löschen, löscht Instagram Posts wie beispielsweise Ihre Fotos und StatusUpdates.
            Informationen, die andere Personen über Sie geteilt haben, gehören nicht zu Ihrem Konto und werden folglich
            nicht gelöscht.
          </p>
          <p>
            Wie bereits oben erwähnt, speichert Instagram Ihre Daten in erster Linie über Cookies. Diese Cookies können
            Sie in Ihrem Browser verwalten, deaktivieren oder löschen. Abhängig von Ihrem Browser funktioniert die
            Verwaltung immer ein bisschen anders. Hier zeigen wir Ihnen die Anleitungen der wichtigsten Browser.
          </p>
          <p>
            <a href="https://support.google.com/chrome/answer/95647?tid=121899806" target="_blank" rel="noreferrer">
              Chrome: Cookies in Chrome löschen, aktivieren und verwalten
            </a>
          </p>
          <p>
            <a
              href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Safari: Verwalten von Cookies und Websitedaten mit Safari
            </a>
          </p>
          <p>
            <a
              href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
            </a>
          </p>
          <p>
            <a
              href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Internet Explorer: Löschen und Verwalten von Cookies Microsoft Websites auf Ihrem Computer abgelegt haben
            </a>
          </p>
          <p>
            <a
              href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=121899806"
              target="_blank"
              rel="noreferrer"
            >
              Edge: Löschen und Verwalten von Cookies
            </a>
          </p>
          <p>
            Sie können auch grundsätzlich Ihren Browser so einrichten, dass Sie immer informiert werden, wenn ein Cookie
            gesetzt werden soll. Dann können Sie immer individuell entscheiden, ob Sie das Cookie zulassen wollen oder
            nicht.
          </p>
          <h2>Rechtsgrundlage</h2>
          <p>
            Wenn Sie eingewilligt haben, dass Daten von Ihnen durch eingebundene Social-Media-Elemente verarbeitet und
            gespeichert werden können, gilt diese Einwilligung als Rechtsgrundlage der Datenverarbeitung (Art. 6 Abs. 1
            lit. a DSGVO). Grundsätzlich werden Ihre Daten auch auf Grundlage unseres berechtigten Interesses (Art. 6
            Abs. 1 lit. f DSGVO) an einer schnellen und guten Kommunikation mit Ihnen oder anderen Kunden und
            Geschäftspartnern gespeichert und verarbeitet. Wir setzen die eingebundene Social-Media-Elemente gleichwohl
            nur ein, soweit Sie eine Einwilligung erteilt haben. Die meisten Social-Media-Plattformen setzen auch
            Cookies in Ihrem Browser, um Daten zu speichern. Darum empfehlen wir Ihnen, unseren Datenschutztext über
            Cookies genau durchzulesen und die Datenschutzerklärung oder die Cookie-Richtlinien des jeweiligen
            Dienstanbieters anzusehen.
          </p>
          <p>
            Instagram bzw. Facebook verarbeitet Daten u.a. auch in den USA. Wir weisen darauf hin, dass nach Meinung des
            Europäischen Gerichtshofs derzeit kein angemessenes Schutzniveau für den Datentransfer in die USA besteht.
            Dies kann mit verschiedenen Risiken für die Rechtmäßigkeit und Sicherheit der Datenverarbeitung einhergehen.
          </p>
          <p>
            Als Grundlage der Datenverarbeitung bei Empfängern mit Sitz in Drittstaaten (außerhalb der Europäischen
            Union, Island, Liechtenstein, Norwegen, also insbesondere in den USA) oder einer Datenweitergabe dorthin
            verwendet Facebook von der EU-Kommission genehmigte Standardvertragsklauseln (= Art. 46. Abs. 2 und 3
            DSGVO). Diese Klauseln verpflichten Facebook, das EU-Datenschutzniveau bei der Verarbeitung relevanter Daten
            auch außerhalb der EU einzuhalten. Diese Klauseln basieren auf einem Durchführungsbeschluss der
            EU-Kommission. Sie finden den Beschluss sowie die Klauseln u.a. hier:{" "}
            <a href="https://ec.europa.eu/germany/news/20210604-datentransfers-eu_de" target="_blank" rel="noreferrer">
              https://ec.europa.eu/germany/news/20210604-datentransfers-eu_de
            </a>
            .
          </p>
          <p>
            Wir haben versucht, Ihnen die wichtigsten Informationen über die Datenverarbeitung durch Instagram
            näherzubringen.{" "}
            <a href="https://help.instagram.com/519522125107875" target="_blank" rel="noreferrer">
              https://help.instagram.com/519522125107875
            </a>{" "}
            Auf können Sie sich noch näher mit den Datenrichtlinien von Instagram auseinandersetzen.
          </p>
          <h2>Social Media</h2>
          <p>
            <b>Social Media Datenschutzerklärung Zusammenfassung</b> <br />
            Betroffene: Besucher der Website <br />
            Zweck: Darstellung und Optimierung unserer Serviceleistung, Kontakt zu Besuchern, Interessenten u.a.,
            Werbung <br />
            Verarbeitete Daten: Daten wie etwa Telefonnummern, E-Mail-Adressen, Kontaktdaten, Daten zum Nutzerverhalten,
            Informationen zu Ihrem Gerät und Ihre IP-Adresse. Mehr Details dazu finden Sie beim jeweils eingesetzten
            Social-Media-Tool. <br />
            Speicherdauer: abhängig von den verwendeten Social-Media-Plattformen br Rechtsgrundlagen: Art. 6 Abs. 1 lit.
            a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen)
          </p>
          <h2>Was ist Social Media?</h2>
          <p>
            Zusätzlich zu unserer Website sind wir auch in diversen Social-Media-Plattformen aktiv. Dabei können Daten
            von Usern verarbeitet werden, damit wir gezielt User, die sich für uns interessieren, über die sozialen
            Netzwerke ansprechen können. Darüber hinaus können auch Elemente einer Social-Media-Plattform direkt in
            unsere Website eingebettet sein. Das ist etwa der Fall, wenn Sie einen sogenannten Social-Button auf unserer
            Website anklicken und direkt zu unserem Social-Media-Auftritt weitergeleitet werden. Als sogenannte Sozialen
            Medien oder Social Media werden Websites und Apps bezeichnet, über die angemeldete Mitglieder Inhalte
            produzieren, Inhalte offen oder in bestimmten Gruppen austauschen und sich mit anderen Mitgliedern vernetzen
            können.
          </p>
          <h2>Warum nutzen wir Social Media?</h2>
          <p>
            Seit Jahren sind Social-Media-Plattformen der Ort, wo Menschen online kommunizieren und in Kontakt treten.
            Mit unseren Social-Media-Auftritten können wir unsere Produkte und Dienstleistungen Interessenten
            näherbringen. Die auf unserer Website eingebundenen Social-MediaElemente helfen Ihnen, schnell und ohne
            Komplikationen zu unseren Social-Media-Inhalten wechseln können.
          </p>
          <p>
            Die Daten, die durch Ihre Nutzung eines Social-Media-Kanals gespeichert und verarbeitet werden, haben in
            erster Linie den Zweck, Webanalysen durchführen zu können. Ziel dieser Analysen ist es, genauere und
            personenbezogene Marketing- und Werbestrategien entwickeln zu können. Abhängig von Ihrem Verhalten auf einer
            Social-Media-Plattform, können mit Hilfe der ausgewerteten Daten, passende Rückschlüsse auf Ihre Interessen
            getroffen werden und sogenannte Userprofile erstellt werden. So ist es den Plattformen auch möglich, Ihnen
            maßgeschneiderte Werbeanzeigen zu präsentieren. Meistens werden für diesen Zweck Cookies in Ihrem Browser
            gesetzt, die Daten zu Ihrem Nutzungsverhalten speichern
          </p>
          <p>
            Wir gehen in der Regel davon aus, dass wir datenschutzrechtlich verantwortlich bleiben, auch wenn wir
            Dienste einer Social-Media-Plattform nutzen. Der Europäische Gerichtshof hat jedoch entschieden, dass in
            bestimmten Fällen der Betreiber der Social-Media-Plattform zusammen mit uns gemeinsam verantwortlich im
            Sinne des Art. 26 DSGVO sein kann. Soweit dies der Fall ist, weisen wir gesondert darauf hin und arbeiten
            auf Grundlage einer diesbezüglichen Vereinbarung. Das Wesentliche der Vereinbarung ist dann weiter unten bei
            der betroffenen Plattform wiedergegeben.
          </p>
          <p>
            Bitte beachten Sie, dass bei der Nutzung der Social-Media-Plattformen oder unserer eingebauten Elemente auch
            Daten von Ihnen außerhalb der Europäischen Union verarbeitet werden können, da viele Social-Media-Kanäle,
            beispielsweise Facebook oder Twitter, amerikanische Unternehmen sind. Dadurch können Sie möglicherweise Ihre
            Rechte in Bezug auf Ihre personenbezogenen Daten nicht mehr so leicht einfordern bzw. durchsetzen.
          </p>
          <h2>Welche Daten werden verarbeitet?</h2>
          <p>
            Welche Daten genau gespeichert und verarbeitet werden, hängt vom jeweiligen Anbieter der
            SocialMedia-Plattform ab. Aber für gewöhnlich handelt es sich um Daten wie etwa Telefonnummern,
            EMailadressen, Daten, die Sie in ein Kontaktformular eingeben, Nutzerdaten wie zum Beispiel welche Buttons
            Sie klicken, wen Sie liken oder wem folgen, wann Sie welche Seiten besucht haben, Informationen zu Ihrem
            Gerät und Ihre IP-Adresse. Die meisten dieser Daten werden in Cookies gespeichert. Speziell wenn Sie selbst
            ein Profil bei dem besuchten Social-Media-Kanal haben und angemeldet sind, können Daten mit Ihrem Profil
            verknüpft werden.
          </p>
          <p>
            Alle Daten, die über eine Social-Media-Plattform erhoben werden, werden auch auf den Servern der Anbieter
            gespeichert. Somit haben auch nur die Anbieter Zugang zu den Daten und können Ihnen die passenden Auskünfte
            geben bzw. Änderungen vornehmen.
          </p>
          <p>
            Wenn Sie genau wissen wollen, welche Daten bei den Social-Media-Anbietern gespeichert und verarbeitet werden
            und wie sie der Datenverarbeitung widersprechen können, sollten Sie die jeweilige Datenschutzerklärung des
            Unternehmens sorgfältig durchlesen. Auch wenn Sie zur Datenspeicherung und Datenverarbeitung Fragen haben
            oder entsprechende Rechte geltend machen wollen, empfehlen wir Ihnen, sich direkt an den Anbieter wenden.
          </p>
          <h2>Dauer der Datenverarbeitung</h2>
          <p>
            Über die Dauer der Datenverarbeitung informieren wir Sie weiter unten, sofern wir weitere Informationen dazu
            haben. Beispielsweise speichert die Social-Media-Plattform Facebook Daten, bis sie für den eigenen Zweck
            nicht mehr benötigt werden. Kundendaten, die mit den eigenen Userdaten abgeglichen werden, werden aber schon
            innerhalb von zwei Tagen gelöscht. Generell verarbeiten wir personenbezogene Daten nur so lange wie es für
            die Bereitstellung unserer Dienstleistungen und Produkte unbedingt notwendig ist. Wenn es, wie zum Beispiel
            im Fall von Buchhaltung, gesetzlich vorgeschrieben ist, kann diese Speicherdauer auch überschritten werden.
          </p>
          <h2>Widerspruchsrecht</h2>
          <p>
            Sie haben auch jederzeit das Recht und die Möglichkeit Ihre Einwilligung zur Verwendung von Cookies bzw.
            Drittanbietern wie eingebettete Social-Media-Elemente zu widerrufen. Das funktioniert entweder über unser
            Cookie-Management-Tool oder über andere Opt-Out-Funktionen. Zum Bespiel können Sie auch die Datenerfassung
            durch Cookies verhindern, indem Sie in Ihrem Browser die Cookies verwalten, deaktivieren oder löschen.
          </p>
          <p>
            Da bei Social-Media-Tools Cookies zum Einsatz kommen können, empfehlen wir Ihnen auch unsere allgemeine
            Datenschutzerklärung über Cookies. Um zu erfahren, welche Daten von Ihnen genau gespeichert und verarbeitet
            werden, sollten Sie die Datenschutzerklärungen der jeweiligen Tools durchlesen.
          </p>
          <h2>Rechtsgrundlage</h2>
          <p>
            Wenn Sie eingewilligt haben, dass Daten von Ihnen durch eingebundene Social-Media-Elemente verarbeitet und
            gespeichert werden können, gilt diese Einwilligung als Rechtsgrundlage der Datenverarbeitung (Art. 6 Abs. 1
            lit. a DSGVO). Grundsätzlich werden Ihre Daten bei Vorliegen einer Einwilligung auch auf Grundlage unseres
            berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) an einer schnellen und guten Kommunikation mit Ihnen
            oder anderen Kunden und Geschäftspartnern gespeichert und verarbeitet. Wir setzen die Tools gleichwohl nur
            ein, soweit Sie eine Einwilligung erteilt haben. Die meisten Social-Media-Plattformen setzen auch Cookies in
            Ihrem Browser, um Daten zu speichern. Darum empfehlen wir Ihnen, unseren Datenschutztext über Cookies genau
            durchzulesen und die Datenschutzerklärung oder die Cookie-Richtlinien des jeweiligen Dienstanbieters
            anzusehen.
          </p>
          <p>
            Informationen zu speziellen Social-Media-Plattformen erfahren Sie – sofern vorhanden – in den folgenden
            Abschnitten.
          </p>
          <h2>Audio & Video</h2>
          <p>
            <b>Audio & Video Datenschutzerklärung Zusammenfassung</b> <br />
            Betroffene: Besucher der Website <br />
            Zweck: Optimierung unserer Serviceleistung <br />
            Verarbeitete Daten: Daten wie etwa Kontaktdaten, Daten zum Nutzerverhalten, Informationen zu Ihrem Gerät und
            Ihre IP-Adresse können gespeichert werden. Mehr Details dazu finden Sie weiter unten in den entsprechenden
            Datenschutztexten. Speicherdauer: Daten bleiben grundsätzlich gespeichert, solange sie für den Dienstzweck
            nötig sind <br />
            Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. f DSGVO (Berechtigte
            Interessen)
          </p>
          <h2>Was sind Audio- und Videoelemente?</h2>
          <p>
            Wir haben auf unsere Website Audio- bzw. Videoelemente eingebunden, damit Sie sich direkt über unsere
            Website etwa Videos ansehen oder Musik/Podcasts anhören können. Die Inhalte werden von Dienstanbietern zur
            Verfügung gestellt. Alle Inhalte werden also auch von den entsprechenden Servern der Anbieter bezogen.
          </p>
          <p>
            Es handelt sich dabei um eingebundene Funktionselemente von Plattformen wie etwa YouTube, Vimeo oder
            Spotify. Die Nutzung dieser Portale ist in der Regel kostenlos, es können aber auch kostenpflichtige Inhalte
            veröffentlicht werden. Mit Hilfe dieser eingebundenen Elemente könne Sie sich über unsere Website die
            jeweiligen Inhalte anhören oder ansehen.
          </p>
          <p>
            Wenn Sie Audio- oder Videoelemente auf unsere Website verwenden, können auch personenbezogene Daten von
            Ihnen an die Dienstanbieter übermittelt, verarbeitet und gespeichert werden.
          </p>
          <h2>Warum verwenden wir Audio- & Videoelemente auf unserer Website?</h2>
          <p>
            Natürlich wollen wir Ihnen auf unserer Website das beste Angebot liefern. Und uns ist bewusst, dass Inhalte
            nicht mehr bloß in Text und statischem Bild vermittelt werden. Statt Ihnen einfach nur einen Link zu einem
            Video zu geben, bieten wir Ihnen direkt auf unserer Website Audio- und Videoformate, die unterhaltend oder
            informativ und im Idealfall sogar beides sind. Das erweitert unser Service und erleichtert Ihnen den Zugang
            zu interessanten Inhalten. Somit bieten wir neben unseren Texten und Bildern auch Video und/oder
            Audio-Inhalte an.
          </p>
          <h2>Welche Daten werden durch Audio- & Videoelemente gespeichert?</h2>
          <p>
            Wenn Sie eine Seite auf unserer Website aufrufen, die beispielsweise ein eingebettetes Video hat, verbindet
            sich Ihr Server mit dem Server des Dienstanbieters. Dabei werden auch Daten von Ihnen an den Drittanbieter
            übertragen und dort gespeichert. Manche Daten werden ganz unabhängig davon, ob Sie bei dem Drittanbieter ein
            Konto haben oder nicht, gesammelt und gespeichert. Dazu zählen meist Ihre IP-Adresse, Browsertyp,
            Betriebssystem, und weitere allgemeine Informationen zu Ihrem Endgerät. Weiters werden von den meisten
            Anbietern auch Informationen über Ihre Webaktivität eingeholt. Dazu zählen etwa Sitzungsdauer, Absprungrate,
            auf welchen Button Sie geklickt haben oder über welche Website Sie den Dienst nutzen. All diese
            Informationen werden meist über Cookies oder Pixel-Tags (auch Web Beacon genannt) gespeichert.
            Pseudonymisierte Daten werden meist in Cookies in Ihrem Browser gespeichert. Welche Daten genau gespeichert
            und verarbeitet werden, erfahren Sie stets in der Datenschutzerklärung des jeweiligen Anbieters.
          </p>
          <h2>Dauer der Datenverarbeitung</h2>
          <p>
            Wie lange die Daten auf den Servern der Drittanbieter genau gespeichert werden, erfahren Sie entweder weiter
            unten im Datenschutztext des jeweiligen Tools oder in der Datenschutzerklärung des Anbieters. Grundsätzlich
            werden personenbezogene Daten immer nur so lange verarbeitet, wie es für die Bereitstellung unserer
            Dienstleistungen oder Produkte unbedingt nötig wird. Dies gilt in der Regel auch für Drittanbieter. Meist
            können Sie davon ausgehen, dass gewisse Daten über mehrere Jahre auf den Servern der Drittanbieter
            gespeichert werden. Daten können speziell in Cookies unterschiedlich lange gespeichert werden. Manche
            Cookies werden bereits nach dem Verlassen der Website wieder gelöscht, anderen können über einige Jahre in
            Ihrem Browser gespeichert sein.
          </p>
          <h2>Widerspruchsrecht</h2>
          <p>
            Sie haben auch jederzeit das Recht und die Möglichkeit Ihre Einwilligung zur Verwendung von Cookies bzw.
            Drittanbietern zu widerrufen. Das funktioniert entweder über unser CookieManagement-Tool oder über andere
            Opt-Out-Funktionen. Zum Bespiel können Sie auch die Datenerfassung durch Cookies verhindern, indem Sie in
            Ihrem Browser die Cookies verwalten, deaktivieren oder löschen. Die Rechtmäßigkeit der Verarbeitung bis zum
            Widerruf bleibt unberührt.
          </p>
          <p>
            Da durch die eingebundenen Audio- und Video-Funktionen auf unserer Seite meist auch Cookies verwendet
            werden, sollte Sie sich auch unsere allgemeine Datenschutzerklärung über Cookies durchlesen. In den
            Datenschutzerklärungen der jeweiligen Drittanbieter erfahren Sie genaueres über den Umgang und die
            Speicherung Ihrer Daten.
          </p>
          <h2>Rechtsgrundlage</h2>
          <p>
            Wenn Sie eingewilligt haben, dass Daten von Ihnen durch eingebundene Audio- und VideoElemente verarbeitet
            und gespeichert werden können, gilt diese Einwilligung als Rechtsgrundlage der Datenverarbeitung (Art. 6
            Abs. 1 lit. a DSGVO). Grundsätzlich werden Ihre Daten auch auf Grundlage unseres berechtigten Interesses
            (Art. 6 Abs. 1 lit. f DSGVO) an einer schnellen und guten Kommunikation mit Ihnen oder anderen Kunden und
            Geschäftspartnern gespeichert und verarbeitet. Wir setzen die eingebundenen Audio- und Video-Elemente
            gleichwohl nur ein, soweit Sie eine Einwilligung erteilt haben.
          </p>
          <h2>Spotify Datenschutzerklärung</h2>
          <p>
            Wir verwenden auf unserer Website Spotify, ein Tool für Musik- und Podcasts. Dienstanbieter ist das
            schwedische Unternehmen Spotify AB, Regeringsgatan 19, SE-111 53 Stockholm, Schweden. Mehr über die Daten,
            die durch die Verwendung von Spotify verarbeitet werden, erfahren Sie in der Privacy Policy auf{" "}
            <a href="https://www.spotify.com/de/legal/privacy-policy/" target="_blank" rel="noreferrer">
              https://www.spotify.com/de/legal/privacy-policy/
            </a>
            .
          </p>
          <p>Alle Texte sind urheberrechtlich geschützt.</p>
          <p>
            Quelle: Erstellt mit dem{" "}
            <a href="https://www.adsimple.at/datenschutz-generator/" target="_blank" rel="noreferrer">
              Datenschutz Generator
            </a>{" "}
            von AdSimple
          </p>
        </StyledContent>
      </Grid>
    </>
  );
};

export default Impressum;

/*
  Persistent layout that doesn't re-mount on page change (DefaultPage)
  but with different props for a specific page
  https://nextjs.org/docs/basic-features/layouts#with-typescript
*/

// @ts-expect-error
Impressum.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultPage
      scrollDirection="vertical"
      menuButtonIconMode="light"
      showLogo={true}
      logoTheme="white"
      showElements={false}
      showPodcastList={false}
      variant="white"
    >
      {page}
    </DefaultPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => ({
  props: {
    ...(await serverSideTranslations(locale || defaultLocale || "de", [
      "menu",
      "impressum",
      "speakers",
      "1942",
      "1943",
      "1944",
    ])),
  },
});
