import * as React from "react";
import { BoxStyled } from "./styled";

export default function BoxTitle({ children }: { children: React.ReactNode }) {
  return <BoxStyled>{children}</BoxStyled>;
}
