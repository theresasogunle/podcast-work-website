import { Grid } from "@madebywild/styled-grid";
import { styled } from "twin.macro";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { ContentModal } from "~/components/ContentModal";
import { Image } from "~/components/Image";
import { MonthContainer } from "~/components/Month/MonthContainer";
import { SeeMore } from "~/components/Month/SeeMore";
import { Title } from "~/components/Month/Title";
import { CoverImageContainer } from "~/components/Month/CoverImageContainer";
import { formatDate } from "~/utils/common";
import { useGridContext } from "~/contexts/Grid";
import { Day } from "~/components/Day";
import type { MonthView } from "~/interfaces";

interface Props extends MonthView {
  lastMonth?: number;
}

const DayContainer = styled(Grid.Item)<{ $cellHeight: number }>`
  height: ${({ $cellHeight }) => `${$cellHeight * 2}px`};
`;

// no of rows the days at the top spans
const TOP_DAYS_SPAN = 2;
// grid item span number of rows
const GRID_SPAN = 2;
// cover image number of rows
const COVER_IMAGE_SPAN = 8;
// additional number of rows for each month for spacings
const MONTH_EXTRA_ROW_SPACING = 3;

export const Month: React.FC<Props> = ({
  year,
  month,
  days,
  cover,
  title,
  description,
  backgroundColor,
  lastMonth,
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cellHeight, cellWidth, cols } = useGridContext();

  const hasModal = title !== "" && description !== "";

  const monthDate = new Date(`${year}/${month}/1`);

  const col = Math.floor(cols / 2);

  // days before the cover image
  const topDays = useMemo(() => {
    // attach each day to a row
    const daysWithRow = days.map((day) => {
      return {
        day,
        row: Math.ceil(day / col),
      };
    });
    // get only the rows
    const daysRow = daysWithRow.map((d) => d.row);
    // get the row with the min number
    const minRow = Math.min(...daysRow);
    // get second min row number
    const secondMinRow = Math.min.apply(
      null,
      daysRow.filter((row) => row !== minRow)
    );
    // return the days with the first and second min row numbers
    return daysWithRow.filter(({ row }) => row === minRow || row === secondMinRow);
  }, [days, col]);

  // days after the cover image
  const bottomDays = useMemo(() => {
    const daysTop = topDays.map(({ day }) => day);
    return days.filter((day) => !daysTop.includes(day));
  }, [topDays, days]);

  const topRows = useMemo(() => topDays.map((d) => d.row), [topDays]);

  const equalRows = useMemo(() => topRows.every((row) => row === topRows[0]), [topRows]);

  const maxRowTopDays = useMemo(() => {
    return Math.max(...topRows) > TOP_DAYS_SPAN
      ? equalRows
        ? TOP_DAYS_SPAN - 1
        : TOP_DAYS_SPAN
      : Math.max(...topRows);
  }, [topRows, equalRows]);

  const rows = useMemo(() => {
    const lastMonthExtraRow = month === lastMonth ? GRID_SPAN : 0;

    const bottomDaysRows = Math.ceil(bottomDays.length / col) * GRID_SPAN;

    const topDaysRows = (topRows.length > 0 ? maxRowTopDays : 1) * GRID_SPAN;

    return bottomDaysRows + COVER_IMAGE_SPAN + topDaysRows + MONTH_EXTRA_ROW_SPACING + lastMonthExtraRow;
  }, [bottomDays, maxRowTopDays, lastMonth, month, col, topRows]);

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
      <Grid rows={`repeat(${rows}, ${cellHeight}px)`} columns={`repeat(${cols}, minmax(0, 1fr))`}>
        <MonthContainer
          row={3}
          column={{ initial: [cols - 3, "span 3"], md: [cols - 2, "span 2"] }}
          $variant={backgroundColor}
        >
          {formatDate(monthDate, router.locale, { month: "long" })}
        </MonthContainer>
        <Grid.Item row={[4, `span ${topDays.length === 1 || equalRows ? 2 : 4}`]}>
          <Grid columns={`repeat(${col}, ${cellWidth * 2}px)`}>
            {topDays.map(({ day }) => {
              return (
                <DayContainer
                  id={`${year}/${month}/${day}`}
                  key={`${year}/${month}/${day}`}
                  row={Math.ceil(day / col)}
                  $cellHeight={cellHeight}
                  column={day % col === 0 ? col : day % col}
                >
                  <Day day={`${year}/${month}/${day}`} variant={backgroundColor} />
                </DayContainer>
              );
            })}
          </Grid>
        </Grid.Item>

        <CoverImageContainer
          row="span 8"
          $variant={backgroundColor}
          column={[1, -1]}
          as={hasModal ? "button" : "div"}
          onClick={hasModal ? () => setIsModalOpen(true) : undefined}
          $hasHover={hasModal}
        >
          {title !== "" && <Title>{title}</Title>}
          {hasModal && <SeeMore>{t("see-more")}</SeeMore>}
          <Image hasOverlay src={cover.src} alt={cover.alt} />
        </CoverImageContainer>

        <Grid columns={`repeat(${col}, ${cellWidth * 2}px)`}>
          {bottomDays.map((day) => {
            return (
              <DayContainer id={`${year}/${month}/${day}`} key={`${year}/${month}/${day}`} $cellHeight={cellHeight}>
                <Day day={`${year}/${month}/${day}`} variant={backgroundColor} />
              </DayContainer>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
