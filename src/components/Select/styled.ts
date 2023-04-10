import { FormHelperText, Select, styled } from "@mui/material";

export const InputStyled = styled(Select)`
  width: 100%;
`;
export const ErrorText = styled(FormHelperText)`
  color: ${(props) => props.theme.palette.error.main};
`;
