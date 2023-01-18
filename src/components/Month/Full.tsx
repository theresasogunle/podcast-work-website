import { Grid } from "@madebywild/styled-grid";
import { styled } from "twin.macro";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { useTranslation } from "next-i18next";
import { Day } from "~/components/Day";
import { SnapToGrid } from "~/components/SnapToGrid";
import { ContentModal } from "~/components/ContentModal";
import { Image } from "~/components/Image";
import { MonthContainer } from "~/components/Month/MonthContainer";
import { SeeMore } from "~/components/Month/SeeMore";
import { CoverImageContainer } from "~/components/Month/CoverImageContainer";
import { Title } from "~/components/Month/Title";
import { useGridContext } from "~/contexts/Grid";
import { useParallax } from "~/hooks/useParallax";
import { formatDate } from "~/utils/common";
import type { MonthView } from "~/interfaces";

interface Props extends MonthView {}

const StyledWrapper = styled.div`
  padding: 0 200px;
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const MonthGrid = styled(Grid)`
  margin-left: ${(props) => props.$offsetLeft}px;
  margin-top: ${(props) => props.$offsetTop}px;
`;

export const Month: React.FC<Props> = ({ year, month, days, cover, title, description, backgroundColor }) => {
  const { cellHeight, cellWidth, rows } = useGridContext(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation("common");

  useParallax({ imageContainerRef, imageRef, overflow: 0.2 });

  const hasModal = title !== "" && description !== "";

  const router = useRouter();

  const monthDate = new Date(`${year}/${month}/1`);
  const firstOffset = monthDate.getDay();

  /** Calculation of the vertical alignment offset */

  const firstDayRow = Math.ceil((firstOffset + days[0]) / 7);
  const firstImageRow = cover.bounds.y;
  const firstRow = Math.min(firstDayRow, firstImageRow);

  const lastDayRow = Math.ceil((firstOffset + days[days.length - 1]) / 7);
  const lastImageRow = cover.bounds.y + cover.bounds.height - 1;
  const lastRow = Math.max(lastDayRow, lastImageRow);

  const visibleRows = lastRow - firstRow + 1;

  const rowsOffset = (rows - visibleRows * 2) / 2;

  let offsetTop = rowsOffset * cellHeight;
  offsetTop -= (firstRow - 1) * 2 * cellHeight; // Subtract the firstRow offset

  const firstDayColumn = Math.min(...days.map((day) => new Date(`${year}/${month}/${day}`).getDay() + 1));
  const firstImageColumn = cover.bounds.x;
  const firstColumn = Math.min(firstDayColumn, firstImageColumn);

  const offsetLeft = (firstColumn - 1) * 2 * cellWidth * -1;

  return (
    <>
      {hasModal && (
        <ContentModal
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
          title={title}
          content={description}
          image={cover}
        />
      )}
      <StyledWrapper>
        <MonthContainer as={SnapToGrid} roundValues $variant={backgroundColor}>
          {formatDate(monthDate, router.locale, { month: "long" })}
        </MonthContainer>
        <MonthGrid
          rows={`repeat(6, ${cellHeight * 2}px)`}
          columns={`repeat(7, ${cellWidth * 2}px)`}
          as={SnapToGrid}
          roundValues
          $offsetLeft={offsetLeft}
          $offsetTop={offsetTop}
        >
          {days.map((day) => (
            <Grid.Item
              key={`${year}/${month}/${day}`}
              row={Math.ceil((firstOffset + day) / 7)}
              column={new Date(`${year}/${month}/${day}`).getDay() + 1}
            >
              <Day day={`${year}/${month}/${day}`} variant={backgroundColor} />
            </Grid.Item>
          ))}
          <CoverImageContainer
            $variant={backgroundColor}
            row={[cover.bounds.y, `span ${cover.bounds.height}`]}
            column={[cover.bounds.x, `span ${cover.bounds.width}`]}
            as={hasModal ? "button" : "div"}
            onClick={hasModal ? () => setIsModalOpen(true) : undefined}
            ref={imageContainerRef}
            $hasHover={hasModal}
            $decreasePadding={cover.bounds.width * cover.bounds.height < 8}
          >
            {title !== "" && <Title>{title}</Title>}
            {hasModal && <SeeMore>{t("see-more")}</SeeMore>}
            <Image ref={imageRef} src={cover.src} alt={cover.alt} hasOverlay />
          </CoverImageContainer>
        </MonthGrid>
      </StyledWrapper>
    </>
  );
};
