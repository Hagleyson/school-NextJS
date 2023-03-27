import { BoxTitle, ButtonsActionsTable, Title } from "@/components";
import { useRouter } from "next/router";

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
import { translateUrl } from "@/shared/helpers";

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

export default function Teacher() {
  const [page, setPage] = React.useState(0);
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRedirect = (type: string, secure_id?: string) => {
    router.push({
      pathname: `professores/${translateUrl(type)}`,
      query: { secure_id, type },
    });
  };

  return (
    <>
      <BoxTitle>
        <Title>Lista de Professores</Title>
        <Button variant="contained" onClick={() => handleRedirect("register")}>
          Cadastrar
        </Button>
      </BoxTitle>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Sobrenome</TableCell>
            <TableCell align="right">CPF</TableCell>
            <TableCell align="right">Curso</TableCell>
            <TableCell align="right">Data de Nascimento</TableCell>
            <TableCell align="right">Ação</TableCell>
          </TableRow>
        </TableHead>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.last_name}</TableCell>
            <TableCell align="right">{row.cpf}</TableCell>
            <TableCell align="right">{row.training}</TableCell>
            <TableCell align="right">{row.birth_date}</TableCell>
            <TableCell align="right" width={140}>
              <ButtonsActionsTable
                key={row.secure_id}
                secure_id={row.secure_id}
                handleClick={handleRedirect}
              />
            </TableCell>
          </TableRow>
        ))}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              count={10}
              rowsPerPage={2}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
