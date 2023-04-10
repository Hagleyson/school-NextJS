import * as React from "react";
import {
  BoxTitle,
  Button,
  Form,
  Input,
  Loader,
  Title,
  Select,
} from "@/components";
import { Divider, Grid, MenuItem } from "@mui/material";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";
import { setContext } from "@/shared/lib";
import { courseServices, teacherServices } from "@/shared/services";
import useLoading from "@/shared/hooks/useIsLoader";
import { ICourse, IListAllTeacher, ITeacher } from "@/shared/Interfaces";
import { CourseProvider, useCourse } from "@/context/courseContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  teacher_secure_id: Yup.string().required("Campo obrigatório"),
  name: Yup.string().required("Campo obrigatório"),
  content: Yup.string().required("Campo obrigatório"),
  target_audience: Yup.string().required("Campo obrigatório"),
});

function Register({
  teachers,
  course,
}: {
  teachers: ITeacher[];
  course: ICourse;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const isLoading = useLoading();

  const { replace } = useRouter();

  const { update: updateCourse } = useCourse();

  const [teacherSecureId, setTeacherSecureId] = React.useState<string>("");

  async function submit(data: any): Promise<void> {
    updateCourse(data.secure_id, data);
  }

  React.useEffect(() => {
    if (Object.keys(course).length === 0 && !isLoading) {
      toast.warning("Dados não encontrado!");
      replace("/cursos/1");
      return;
    }

    if (course) {
      for (const key in course) {
        if (key === "teacher_secure_id") {
          setTeacherSecureId(course[key as keyof ICourse].toString());
        }

        setValue(key, course[key as keyof ICourse].toString());
      }
    }
  }, [isLoading]);

  return (
    <>
      <BoxTitle>
        <Title>Cadastro de Curso</Title>
      </BoxTitle>
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Input
                label="Nome"
                name="name"
                register={register}
                error={errors?.name?.message?.toString()}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Professor"
                name="teacher_secure_id"
                value={teacherSecureId}
                handleChange={(e) => setTeacherSecureId(e.target.value)}
                register={register}
                error={errors?.teacher_secure_id?.message?.toString()}
              >
                {teachers.length > 0 ? (
                  teachers.map((currentData) => (
                    <MenuItem
                      key={currentData.secure_id}
                      value={currentData.secure_id}
                    >
                      {currentData.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={""} disabled>
                    Não Tem Professores Cadastrado!
                  </MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Público alvo"
                name="target_audience"
                register={register}
                error={errors?.target_audience?.message?.toString()}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Input
                label="Conteúdo"
                name="content"
                register={register}
                error={errors?.target_audience?.message?.toString()}
              />
            </Grid>
          </Grid>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={2} md={1}>
              <Button type="submit">Enviar</Button>
            </Grid>
            <Grid item xs={2} md={1}>
              <Button
                handleClick={() => {
                  replace("/cursos/1");
                }}
                type="button"
              >
                Sair
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
}

export default function RegisterCourse({
  teachers,
  course,
}: {
  teachers: ITeacher[];
  course: ICourse;
}) {
  return (
    <CourseProvider>
      <Register teachers={teachers} course={course} />
    </CourseProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }

  setContext(ctx);
  const { listOne } = courseServices();
  const { listAll } = teacherServices();
  const secure_id = ctx.query.secure_id;
  let teachers: any = [];
  let course: ICourse = {} as ICourse;

  if (secure_id) {
    await Promise.all([
      listOne(secure_id.toString()),
      listAll({ params: { noPaginate: true } }),
    ]).then((resp) => {
      course = resp[0].data;
      teachers = resp[1].data;
    });
  }

  return {
    props: { teachers, course },
  };
};
