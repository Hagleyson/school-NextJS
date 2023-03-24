import { BoxTitle, Title } from "@/components";
import { Button, Divider } from "@mui/material";
import * as React from "react";

export default function Teacher() {
  return (
    <>
      <BoxTitle>
        <Title>Lista de Cursos</Title>
        <Button variant="contained">Cadastrar</Button>
      </BoxTitle>

      <Divider />
    </>
  );
}
