import * as React from "react";
import {
  BoxTitle,
  Button,
  Form,
  Input,
  Loader,
  MaskInput,
  Select,
  Title,
} from "@/components";
import { Divider, Grid, MenuItem } from "@mui/material";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";
import { setContext } from "@/shared/lib";
import { courseServices, teacherServices } from "@/shared/services";
import { ICourse, ITeacher } from "@/shared/Interfaces";
import useLoading from "@/shared/hooks/useIsLoader";
import { toast } from "react-toastify";

export default function Register({
  teachers,
  course,
}: {
  teachers: ITeacher[];
  course: ICourse;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const isLoading = useLoading();

  const { replace } = useRouter();

  const [teacherSecureId, setTeacherSecureId] = React.useState<string>("");

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
        <Title>Dados do Professores</Title>
      </BoxTitle>
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Input
                label="Nome"
                name="name"
                register={register}
                error={errors?.name?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Professor"
                name="teacher_secure_id"
                value={teacherSecureId}
                handleChange={(e) => setTeacherSecureId(e.target.value)}
                register={register}
                error={errors?.teacher_secure_id?.message?.toString()}
                isDisabled
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
            <Grid item xs={12} md={4}>
              <Input
                label="Público alvo"
                name="target_audience"
                register={register}
                error={errors?.target_audience?.message?.toString()}
                isDisabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Input
                label="Conteúdo"
                name="content"
                register={register}
                error={errors?.target_audience?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskInput
                label="Início da Matricula"
                name="enroll_start_date"
                register={register}
                error={errors?.enroll_start_date?.message?.toString()}
                isDisabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <MaskInput
                label="Fim da Matricula"
                name="enroll_end_date"
                register={register}
                error={errors?.enroll_end_date?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskInput
                label="Inicio das Aulas"
                name="start_date"
                register={register}
                error={errors?.start_date?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskInput
                label="Fim das Aulas"
                name="end_date"
                register={register}
                error={errors?.end_date?.message?.toString()}
                isDisabled
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
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
