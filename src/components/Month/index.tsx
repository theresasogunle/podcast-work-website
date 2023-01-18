import { Month as Full } from "~/components/Month/Full";
import { Month as Compact } from "~/components/Month/Compact";
import type { MonthView } from "~/interfaces";

interface Props extends MonthView {
  view: "full" | "compact";
  lastMonth?: number;
}
export const Month: React.FC<Props> = ({ view, ...props }) => {
  const Component = view === "full" ? Full : Compact;
  return <Component {...props} />;
};
