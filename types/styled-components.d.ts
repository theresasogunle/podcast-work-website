import "styled-components";
import { Theme } from "@madebywild/styled-utils";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {
    screens: Theme["screens"];
  }
}
