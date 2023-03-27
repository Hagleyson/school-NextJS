import { InputStyled } from "./styled";
import { UseFormRegister } from "react-hook-form";

type propsType = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
};

export default function input({ label, name, register, error }: propsType) {
  return (
    <InputStyled
      error={!!error}
      label={label}
      helperText={error}
      {...register(name)}
    />
  );
}
