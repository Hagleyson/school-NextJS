import InputMask from "react-input-mask";

import { InputStyled } from "./styled";
import { masks } from "./masks";

export default function MaskInput() {
  return <InputMask mask={masks["date"]}>{() => <InputStyled />}</InputMask>;
}
