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
import { DataGrid } from "@mui/x-data-grid";

import * as React from "react";
import { redirectPage, translateUrl } from "@/shared/helpers";
import { GetServerSideProps } from "next";
import { TeacherProvider, useTeacher } from "@/context/teacherContext";

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

function TeacherComponent() {
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { listAll, teachers, meta } = useTeacher();

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRedirect = (type: string, secure_id?: string) => {
    router.push({
      pathname: `professores/${translateUrl(type)}`,
      query: { secure_id, type },
    });
  };

  React.useEffect(() => {
    listAll(page);
  }, [page]);

  const columns = [
    { field: "name", headerName: "Nome" },
    { field: "lastName", headerName: "Sobrenome" },
    {
      field: "cpf",
      headerName: "CPF",
    },
    {
      field: "training",
      headerName: "Curso",
    },
    {
      field: "birth_date",
      headerName: "Data de Nascimento",
    },
  ];

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
        {teachers.map((row) => (
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
              rowsPerPageOptions={[meta.per_page ?? 10]}
              count={meta.total ?? 0}
              rowsPerPage={10}
              page={0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }

  return {
    props: {},
  };
};

export default function Teacher() {
  return (
    <TeacherProvider>
      <TeacherComponent />
    </TeacherProvider>
  );
}
