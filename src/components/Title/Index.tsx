import * as React from "react";
import { TitleStyled } from "./styled";

export default function Title({ children }: { children: React.ReactNode }) {
  return <TitleStyled>{children}</TitleStyled>;
}
