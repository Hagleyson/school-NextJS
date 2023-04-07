import * as React from "react";
import { BoxTitle, Button, Form, Input, Title } from "@/components";
import { Divider, Grid } from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";
import { setContext } from "@/shared/lib";
import { teacherServices } from "@/shared/services";
import moment from "moment";
import { IListOneTeacher } from "@/shared/Interfaces";
import useLoading from "@/shared/hooks/useIsLoader";
import { toast } from "react-toastify";
import { TeacherProvider, useTeacher } from "@/context/teacherContext";

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  last_name: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string().required("Campo obrigatório"),
  training: Yup.string().required("Campo obrigatório"),
  birth_date: Yup.string().required("Campo obrigatório"),
});

function UpdateComponent({ data }: { data: IListOneTeacher }) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const isLoading = useLoading();
  const { update: updateTeacher } = useTeacher();

  const { replace } = useRouter();

  async function submit(data: any): Promise<void> {
    updateTeacher(data.secure_id, data);
  }

  React.useEffect(() => {
    if (data.code && !isLoading) {
      toast.warning("Dados não encontrado!");
      replace("/professores/1");
      return;
    }
    if (data) {
      for (const key in data) {
        setValue(key, data[key as keyof IListOneTeacher]);
      }
    }
  }, [isLoading]);

  return (
    <TeacherProvider>
      <BoxTitle>
        <Title>Atualização de Professores</Title>
      </BoxTitle>
      <Divider />
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
            <Input
              label="Sobrenome"
              name="last_name"
              register={register}
              error={errors?.last_name?.message?.toString()}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Cpf"
              name="cpf"
              register={register}
              error={errors?.cpf?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              label="Profissão"
              name="training"
              register={register}
              error={errors?.training?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              label="Data de Nascimento"
              name="birth_date"
              register={register}
              error={errors?.register?.message?.toString()}
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
                replace("/professores/1");
              }}
              type="button"
            >
              Sair
            </Button>
          </Grid>
        </Grid>
      </Form>
    </TeacherProvider>
  );
}

export default function Register(props: IListOneTeacher) {
  return (
    <TeacherProvider>
      <UpdateComponent data={props} />
    </TeacherProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }

  setContext(ctx);

  const { listOne } = teacherServices();

  const secure_id = ctx.query.secure_id;

  if (secure_id) {
    const data = await listOne(secure_id.toString());

    return {
      props: {
        ...data.data,
        birth_date: moment(data.data.birth_date).utc().format("DD/MM/YYYY"),
      },
    };
  }

  return {
    props: { data: {} },
  };
};
