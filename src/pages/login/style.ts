import styled from "@emotion/styled";
import { Card, Container } from "@mui/material";

export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ContainerHome = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Description = styled(ContainerHome)`
  width: 40%;
  background: #58af9c;
`;

export const ContainerLogin = styled(ContainerHome)`
  width: 90%;
  background: #ffffff;
`;

export const CardForm = styled(Card)`
  width: 400px;
  height: 500px;
  background: transparent;
`;
