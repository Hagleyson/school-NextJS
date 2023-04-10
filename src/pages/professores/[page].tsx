import {
  BoxTitle,
  ButtonsActionsTable,
  CustomTableFooter,
  Loader,
  Modal,
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
import { TeacherProvider, useTeacher } from "@/context/teacherContext";

function TeacherComponent({ meta, data: teachers }: IListAllTeacher) {
  const [open, setOpen] = React.useState<{
    secure_id: string;
    isOpen: boolean;
  }>({ secure_id: "", isOpen: false });
  const router = useRouter();
  const isLoading = useLoading();
  const { deleteTeacher } = useTeacher();

  const handleRedirect = (type: string, secure_id?: string) => {
    if (type === "delete" && secure_id) {
      setOpen({ secure_id, isOpen: true });
      return;
    }
    router.push({
      pathname: `/professores/${translateUrl(type)}`,
      query: { secure_id, type },
    });
  };

  const handleChangePage = (_: any, value: any) => {
    router.push({
      pathname: `/professores/${value}`,
    });
  };

  const handleClose = () => setOpen({ secure_id: "", isOpen: false });

  const handleDelete = React.useCallback(() => {
    deleteTeacher(open.secure_id);

    setOpen({ secure_id: "", isOpen: false });
  }, [open.secure_id]);

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
                <TableCell>Sobrenome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Ação</TableCell>
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
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{formatCPF(row.cpf)}</TableCell>
                  <TableCell>{row.training}</TableCell>
                  <TableCell>
                    {moment(row.birth_date).utc().format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="justify" width={140}>
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

          <CustomTableFooter meta={meta} handleChange={handleChangePage} />
        </TableContainer>
      )}
      <Modal
        text="Deseja Excluir Esse Professor?"
        isOpen={open.isOpen}
        handleClose={handleClose}
        handleConfirm={handleDelete}
      />
    </>
  );
}

export default function Teacher({ meta, data }: IListAllTeacher) {
  return (
    <TeacherProvider>
      <TeacherComponent meta={meta} data={data} />
    </TeacherProvider>
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
