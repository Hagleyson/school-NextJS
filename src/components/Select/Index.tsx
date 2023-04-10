import { FormControl, InputLabel } from "@mui/material";
import { ErrorText, InputStyled } from "./styled";
import { UseFormRegister } from "react-hook-form";

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
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>

      <InputStyled
        error={!!error}
        label={label}
        disabled={isDisabled}
        {...register(name)}
      >
        {children}
      </InputStyled>
      <ErrorText>{error}</ErrorText>
    </FormControl>
  );
}
