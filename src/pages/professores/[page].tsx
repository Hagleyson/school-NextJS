import {
  BoxTitle,
  ButtonsActionsTable,
  CustomTableFooter,
  Loader,
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
import { formatCPF, redirectPage, translateUrl } from "@/shared/helpers";

import { GetServerSideProps } from "next";

import { teacherServices } from "@/shared/services";
import { IListAllTeacher } from "@/shared/Interfaces";
import { setContext } from "@/shared/lib";
import useLoading from "@/shared/hooks/useIsLoader";
import moment from "moment";

export default function Teacher({ meta, data: teachers }: IListAllTeacher) {
  const router = useRouter();
  const isLoading = useLoading();

  const handleRedirect = (type: string, secure_id?: string) => {
    router.push({
      pathname: `/professores/${translateUrl(type)}`,
      query: { secure_id, type },
    });
  };

  const handleChange = (_: any, value: any) => {
    router.push({
      pathname: `/professores/${value}`,
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
      {isLoading ? (
        <Loader />
      ) : (
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
                  <TableCell align="right">{formatCPF(row.cpf)}</TableCell>
                  <TableCell align="right">{row.training}</TableCell>
                  <TableCell align="right">
                    {moment(row.birth_date).utc().format("DD/MM/YYYY")}
                  </TableCell>
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
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }
  const { listAll: listAllService } = teacherServices();

  const { params } = ctx;
  const page = Number(params?.page) ?? 1;

  setContext(ctx);

  const { data } = await listAllService({
    params: {
      page,
    },
  });

  return {
    props: {
      meta: data.meta,
      data: data.data,
    },
  };
};
