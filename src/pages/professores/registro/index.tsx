import * as React from "react";
import {
  BoxTitle,
  Button,
  Form,
  Input,
  MaskInput,
  Select,
  Title,
} from "@/components";
import { Divider, Grid, MenuItem } from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { redirectPage } from "@/shared/helpers";
import { GetServerSideProps } from "next";
import { TeacherProvider, useTeacher } from "@/context/teacherContext";

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  last_name: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string().required("Campo obrigatório"),
  training: Yup.string().required("Campo obrigatório"),
  birth_date: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um E-mail valido")
    .required("Campo obrigatório"),
  alternative_email: Yup.string()
    .email("Digite um E-mail valido")
    .required("Campo obrigatório"),
  rg: Yup.string().required("Campo obrigatório"),
  gender: Yup.string().required("Campo obrigatório"),
  naturalness: Yup.string().required("Campo obrigatório"),
  scholarship: Yup.string().required("Campo obrigatório"),
  phone: Yup.string().required("Campo obrigatório"),
  alternative_phone: Yup.string().required("Campo obrigatório"),
  street: Yup.string().required("Campo obrigatório"),
  number: Yup.string().required("Campo obrigatório"),
  neighborhood: Yup.string().required("Campo obrigatório"),
  complement: Yup.string().optional(),
});

function RegisterComponent() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { register: registerTeacher, formattedValue } = useTeacher();

  const { replace } = useRouter();

  async function submit(data: any): Promise<void> {
    const values = formattedValue(data);
    registerTeacher(values);
  }

  return (
    <>
      <BoxTitle>
        <Title>Cadastro de Professores</Title>
      </BoxTitle>
      <Divider />
      <Form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Input
              label="Nome"
              name="name"
              register={register}
              error={errors?.name?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="Sobrenome"
              name="last_name"
              register={register}
              error={errors?.last_name?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Cpf"
              name="cpf"
              register={register}
              error={errors?.cpf?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="Profissão"
              name="training"
              register={register}
              error={errors?.training?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Data de Nascimento"
              name="birth_date"
              register={register}
              error={errors?.birth_date?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="E-mail"
              name="email"
              register={register}
              error={errors?.email?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="E-mail Alternativo"
              name="alternative_email"
              register={register}
              error={errors?.alternative_email?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="Rg"
              name="rg"
              register={register}
              error={errors?.rg?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              label="Genêro"
              name="gender"
              register={register}
              error={errors?.gender?.message?.toString()}
            >
              <MenuItem value={"masculino"}>Masculino</MenuItem>
              <MenuItem value={"feminino"}>Feminino</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="Naturalidade"
              name="naturalness"
              register={register}
              error={errors?.naturalness?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              label="Escolaridade"
              name="scholarship"
              register={register}
              error={errors?.scholarship?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Telefone"
              name="phone"
              register={register}
              error={errors?.phone?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Telefone Alternativo"
              name="alternative_phone"
              register={register}
              error={errors?.phone?.message?.toString()}
            />
          </Grid>
        </Grid>
        <p>Endereço</p>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Rua"
              name="street"
              register={register}
              error={errors?.street?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Número"
              name="number"
              register={register}
              error={errors?.number?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Bairro"
              name="neighborhood"
              register={register}
              error={errors?.neighborhood?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MaskInput
              label="Complemento"
              name="complement"
              register={register}
              error={errors?.complement?.message?.toString()}
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
    </>
  );
}

export default function Register() {
  return (
    <TeacherProvider>
      <RegisterComponent />
    </TeacherProvider>
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
