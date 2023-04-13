import InputMask from "react-input-mask";

import { InputStyled } from "./styled";
import { masks } from "./masks";

export default function MaskInput({ name, label, register, error }) {
  return (
    <InputMask
      mask={masks[name.includes("phone") ? "phone" : name]}
      {...register(name)}
    >
      {() => (
        <InputStyled
          label={label}
          error={!!error}
          helperText={error}
          {...register(name)}
        />
      )}
    </InputMask>
  );
}
