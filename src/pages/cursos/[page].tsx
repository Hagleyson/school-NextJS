import * as React from "react";
import { GetServerSideProps } from "next";
import { redirectPage, translateUrl } from "@/shared/helpers";
import { courseServices } from "@/shared/services";
import { setContext } from "@/shared/lib";
import { IListAllCourse } from "@/shared/Interfaces";
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
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import useLoading from "@/shared/hooks/useIsLoader";
import { CourseProvider, useCourse } from "@/context/courseContext";

function CoursesComponente({ meta, data: courses }: IListAllCourse) {
  const router = useRouter();

  const isLoading = useLoading();

  const { deleteCourse } = useCourse();
  const [open, setOpen] = React.useState<{
    secure_id: string;
    isOpen: boolean;
  }>({ secure_id: "", isOpen: false });

  const handleRedirect = (type: string, secure_id?: string) => {
    if (type === "delete" && secure_id) {
      setOpen({ secure_id, isOpen: true });
      return;
    }
    router.push({
      pathname: `/cursos/${translateUrl(type)}`,
      query: { secure_id, type },
    });
  };

  const handleChangePage = (_: any, value: any) => {
    router.push({
      pathname: `/cursos/${value}`,
    });
  };

  const handleClose = () => setOpen({ secure_id: "", isOpen: false });

  const handleDelete = React.useCallback(() => {
    deleteCourse(open.secure_id);

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
                <TableCell align="right">Publico Alvo</TableCell>
                <TableCell align="right">Professor</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((row, idx) => (
                <TableRow
                  key={row.secure_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.target_audience}</TableCell>
                  <TableCell align="right">{row.teacher.name}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>

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
          <CustomTableFooter meta={meta} handleChange={handleChangePage} />
        </TableContainer>
      )}
      <Modal
        text="Deseja Excluir Esse Curso?"
        isOpen={open.isOpen}
        handleClose={handleClose}
        handleConfirm={handleDelete}
      />
    </>
  );
}

export default function Courses({ meta, data }: IListAllCourse) {
  return (
    <CourseProvider>
      <CoursesComponente meta={meta} data={data} />
    </CourseProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }

  const { listAll: listAllService } = courseServices();

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
