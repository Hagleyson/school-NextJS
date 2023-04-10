import { InputStyled } from "./styled";
import { UseFormRegister } from "react-hook-form";
import InputMask from "react-input-mask";

type propsType = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  children: React.ReactNode;
  error?: string;
  isDisabled?: boolean;
};

export default function Select({
  label,
  name,
  register,
  error,
  isDisabled,
  children,
}: propsType) {
  return (
    <InputStyled
      error={!!error}
      label={label}
      disabled={isDisabled}
      {...register(name)}
    >
      {children}
    </InputStyled>
  );
}
