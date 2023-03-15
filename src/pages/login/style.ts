import styled from "@emotion/styled";
import { Button, Card, TextField, Typography } from "@mui/material";

export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f0f2f5;
  align-items: center;
  justify-content: center;
`;

export const CardLogin = styled(Card)`
  width: 400px;
  height: 380px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 1rem;
`;

export const TextLogin = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  p {
    font-size: 0.8rem;
    color: #a2a2a2;
  }
`;
export const FormLogin = styled.form`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
`;

export const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 1.2em;
`;

export const ButtonLogin = styled(Button)`
  width: 100%;
`;
