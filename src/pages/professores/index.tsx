import {
  BoxTitle,
  ButtonsActionsTable,
  CustomTableFooter,
  Title,
} from "@/components";
import { useRouter } from "next/router";

import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import * as React from "react";
import { redirectPage, translateUrl } from "@/shared/helpers";

import { GetServerSideProps } from "next";
import { TeacherProvider, useTeacher } from "@/context/teacherContext";

function TeacherComponent() {
  const [page, setPage] = React.useState(1);
  const router = useRouter();

  const { listAll, teachers, meta } = useTeacher();

  const handleRedirect = (type: string, secure_id?: string) => {
    router.push({
      pathname: `professores/${translateUrl(type)}`,
      query: { secure_id, type },
    });
  };

  React.useEffect(() => {
    listAll(page);
  }, [page]);

  const handleChange = (_: any, value: any) => {
    setPage(value);
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
      <TableContainer component={Paper}>
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
          <TableBody>
            {teachers.map((row, idx) => (
              <TableRow
                key={row.secure_id}
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
          </TableBody>
        </Table>

        <CustomTableFooter meta={meta} handleChange={handleChange} />
      </TableContainer>
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
