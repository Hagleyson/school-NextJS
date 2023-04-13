import { FormControl, InputLabel } from "@mui/material";
import { ErrorText, InputStyled } from "./styled";
import { UseFormRegister } from "react-hook-form";

type propsType = {
  label: string;
  name: string;
  value?: string;
  register: UseFormRegister<any>;
  children: React.ReactNode;
  error?: string;
  isDisabled?: boolean;
  handleChange?: (e: any) => void;
};

export default function Select({
  label,
  name,
  register,
  error,
  value,
  isDisabled,
  handleChange,
  children,
}: propsType) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>

      <InputStyled
        error={!!error}
        label={label}
        value={value}
        disabled={isDisabled}
        {...register(name)}
        onChange={handleChange}
      >
        {children}
      </InputStyled>
      <ErrorText>{error}</ErrorText>
    </FormControl>
  );
}
