import InputMask from "react-input-mask";

import { InputStyled } from "./styled";
import { masks } from "./masks";

export default function MaskInput({
  name,
  label,
  register,
  error,
  isDisabled,
}) {
  return (
    <InputMask
      mask={masks[name.includes("phone") ? "phone" : name]}
      disabled={isDisabled}
      {...register(name)}
    >
      {() => (
        <InputStyled
          label={label}
          error={!!error}
          helperText={error}
          disabled={isDisabled}
          {...register(name)}
        />
      )}
    </InputMask>
  );
}
