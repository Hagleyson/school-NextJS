import * as React from "react";
import { GetServerSideProps } from "next";
import { redirectPage, translateStatus, translateUrl } from "@/shared/helpers";
import { courseServices } from "@/shared/services";
import { setContext } from "@/shared/lib";
import { IListAllCourse } from "@/shared/Interfaces";
import {
  BoxTitle,
  ButtonsActionsTable,
  CustomTableFooter,
  Loader,
  Modal,
  StatusTag,
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
  Tooltip,
} from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import useLoading from "@/shared/hooks/useIsLoader";
import { CourseProvider, useCourse } from "@/context/courseContext";

function CoursesComponente({ meta, data: courses }: IListAllCourse) {
  const router = useRouter();

  const isLoading = useLoading();

  const { deleteCourse, activateOrDeactivate } = useCourse();
  const [open, setOpen] = React.useState<{
    secure_id: string;
    isOpen: boolean;
  }>({ secure_id: "", isOpen: false });
  const [currentCourse, setCurrentCourse] = React.useState<{
    secure_id: string;
    isOpen: boolean;
    status: string;
  }>({ secure_id: "", isOpen: false, status: "" });

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

  const handleActivateOrDeactivate = React.useCallback(() => {
    activateOrDeactivate(currentCourse.secure_id);
    setCurrentCourse({ isOpen: false, secure_id: "", status: "" });
  }, [currentCourse.isOpen]);

  return (
    <>
      <BoxTitle>
        <Title>Lista de Cursos</Title>
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
                <TableCell>Público Alvo</TableCell>
                <TableCell>Professor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ação</TableCell>
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
                  <TableCell>{row.target_audience}</TableCell>
                  <TableCell>{row.teacher.name}</TableCell>
                  <TableCell width={120}>
                    <StatusTag status={translateStatus("courses", row.status)}>
                      {translateStatus("courses", row.status)}
                    </StatusTag>
                  </TableCell>

                  <TableCell align="justify" width={180}>
                    <ButtonsActionsTable
                      key={row.secure_id}
                      secure_id={row.secure_id}
                      handleClick={handleRedirect}
                    >
                      <Tooltip
                        title="Ativar/Desativar"
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      >
                        <FactCheckIcon
                          onClick={() => {
                            setCurrentCourse({
                              secure_id: row.secure_id,
                              status: row.status,
                              isOpen: true,
                            });
                          }}
                        />
                      </Tooltip>
                    </ButtonsActionsTable>
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
      <Modal
        text={`Deseja alterar o status desse curso para ${
          currentCourse.status === "active" ? "inativo" : "ativo"
        }?`}
        isOpen={currentCourse.isOpen}
        handleClose={() => {
          setCurrentCourse({ secure_id: "", status: "", isOpen: false });
        }}
        handleConfirm={handleActivateOrDeactivate}
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
