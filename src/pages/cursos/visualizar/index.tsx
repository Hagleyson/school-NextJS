import * as React from "react";
import { BoxTitle, Button, Form, Input, Loader, Title } from "@/components";
import { Divider, Grid, TextareaAutosize } from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";
import { setContext } from "@/shared/lib";
import { courseServices, teacherServices } from "@/shared/services";
import { IListOneTeacher } from "@/shared/Interfaces";
import useLoading from "@/shared/hooks/useIsLoader";
import { toast } from "react-toastify";
import moment from "moment";

export default function Register(props: IListOneTeacher) {
  const { register, setValue } = useForm();

  const isLoading = useLoading();

  const { replace } = useRouter();

  React.useEffect(() => {
    if (props.code && !isLoading) {
      toast.warning("Dados não encontrado!");
      replace("/cursos/1");
      return;
    }
    if (props) {
      for (const key in props) {
        setValue(key, props[key as keyof IListOneTeacher]);
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
            <Grid item xs={12} md={6}>
              <Input label="Nome" name="name" register={register} isDisabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Público alvo"
                name="target_audience"
                register={register}
                isDisabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Input
                label="Professor"
                name="teacher_secure_id"
                register={register}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Conteúdo"
                name="content"
                register={register}
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

  const secure_id = ctx.query.secure_id;

  if (secure_id) {
    const data = await listOne(secure_id.toString());

    return {
      props: {
        ...data.data,
        teacher_secure_id: data.data.teacher.name,
      },
    };
  }

  return {
    props: { data: {} },
  };
};