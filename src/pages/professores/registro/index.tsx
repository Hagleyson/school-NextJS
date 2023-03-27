import { BoxTitle, ButtonsActionsTable, Title } from "@/components";
import {
  Button,
  Divider,
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as React from "react";

function createData(
  secure_id: string,
  name: string,

  last_name: string,
  cpf: string,
  training: string,
  birth_date: string
) {
  return { secure_id, name, last_name, cpf, training, birth_date };
}

const rows = [
  createData("1", "Frozen yoghurt", "159", "6.0", " 24", "4.0"),
  createData("2", "Ice cream sandwich", "237", "9.0", "37", "4.3"),
  createData("3", "Eclair", "262", "16.0", "24", "6.0"),
  createData("4", "Cupcake", "305", "3.7", "67", "4.3"),
  createData("5", "Gingerbread", "356", "16.0", "49", "3.9"),
];

export default function Register() {
  return (
    <>
      <BoxTitle>
        <Title>Cadastro de Professores</Title>
      </BoxTitle>
      <Divider />
    </>
  );
}
