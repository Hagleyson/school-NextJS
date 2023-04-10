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
import { teacherServices } from "@/shared/services";
import useLoading from "@/shared/hooks/useIsLoader";
import { IListAllTeacher, ITeacher } from "@/shared/Interfaces";
import { CourseProvider, useCourse } from "@/context/courseContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  teacher_secure_id: Yup.string().required("Campo obrigatório"),
  name: Yup.string().required("Campo obrigatório"),
  content: Yup.string().required("Campo obrigatório"),
  target_audience: Yup.string().required("Campo obrigatório"),
});

function Register({ data }: { data: ITeacher[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const isLoading = useLoading();

  const { replace } = useRouter();

  const { register: registerCourse } = useCourse();

  async function submit(data: any): Promise<void> {
    registerCourse(data);
  }

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
                register={register}
                error={errors?.teacher_secure_id?.message?.toString()}
              >
                {data.length > 0 ? (
                  data.map((currentData) => (
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

export default function RegisterCourse({ data }: IListAllTeacher) {
  return (
    <CourseProvider>
      <Register data={data} />
    </CourseProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }

  setContext(ctx);

  const { listAll } = teacherServices();

  const { data } = await listAll({ params: { noPaginate: true } });

  return {
    props: { data: data ?? [] },
  };
};
