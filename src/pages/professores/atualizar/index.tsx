import * as React from "react";
import { BoxTitle, Button, Form, Input, Title } from "@/components";
import { Divider, Grid } from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  last_name: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string().required("Campo obrigatório"),
  training: Yup.string().required("Campo obrigatório"),
  sex: Yup.string().required("Campo obrigatório"),
});

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { replace } = useRouter();

  async function submit(data: any): Promise<void> {
    console.log(data);
  }

  return (
    <>
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
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={2} md={1}>
            <Button type="submit">Enviar</Button>
          </Grid>
          <Grid item xs={2} md={1}>
            <Button
              handleClick={() => {
                replace("/professores");
              }}
              type="button"
            >
              Sair
            </Button>
          </Grid>
        </Grid>
      </Form>
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
