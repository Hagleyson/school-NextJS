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

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";
import { setContext } from "@/shared/lib";
import { teacherServices } from "@/shared/services";
import { IListOneTeacher } from "@/shared/Interfaces";
import useLoading from "@/shared/hooks/useIsLoader";
import { toast } from "react-toastify";
import moment from "moment";
import { useTeacher } from "@/context/teacherContext";

export default function Register(props: IListOneTeacher) {
  const { validationSchema } = useTeacher();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [gender, setGender] = React.useState<string>("");

  const isLoading = useLoading();

  const { replace } = useRouter();

  async function submit(data: any): Promise<void> {
    console.log(data);
  }

  React.useEffect(() => {
    if (props.code && !isLoading) {
      toast.warning("Dados não encontrado!");
      replace("/professores/1");
      return;
    }
    if (props) {
      for (const key in props) {
        setValue(key, props[key as keyof IListOneTeacher]);
        if (key === "gender") {
          setGender(props["gender"]);
        }
        if (key === "address") {
          const { address } = props;
          setValue("street", address.street);
          setValue("number", address.number);
          setValue("neighborhood", address.neighborhood);
          setValue("complement", address.complement);
        }
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
        <Form onSubmit={handleSubmit(submit)}>
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
              <Input
                label="Sobrenome"
                name="last_name"
                register={register}
                error={errors?.last_name?.message?.toString()}
                isDisabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <MaskInput
                label="Cpf"
                name="cpf"
                register={register}
                error={errors?.cpf?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Profissão"
                name="training"
                register={register}
                error={errors?.training?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Data de Nascimento"
                name="birth_date"
                register={register}
                error={errors?.training?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="E-mail"
                name="email"
                register={register}
                error={errors?.email?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="E-mail Alternativo"
                name="alternative_email"
                register={register}
                error={errors?.alternative_email?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Rg"
                name="rg"
                register={register}
                error={errors?.rg?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Genêro"
                name="gender"
                register={register}
                value={gender}
                handleChange={(e) => setGender(e.target.value)}
                error={errors?.gender?.message?.toString()}
                isDisabled
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
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Escolaridade"
                name="scholarship"
                register={register}
                error={errors?.scholarship?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskInput
                label="Telefone"
                name="phone"
                register={register}
                error={errors?.phone?.message?.toString()}
                isDisabled={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskInput
                label="Telefone Alternativo"
                name="alternative_phone"
                register={register}
                error={errors?.phone?.message?.toString()}
                isDisabled
              />
            </Grid>
          </Grid>
          <p>Endereço</p>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Input
                label="Rua"
                name="street"
                register={register}
                error={errors?.street?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Número"
                name="number"
                register={register}
                error={errors?.number?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Bairro"
                name="neighborhood"
                register={register}
                error={errors?.neighborhood?.message?.toString()}
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Complemento"
                name="complement"
                register={register}
                error={errors?.complement?.message?.toString()}
                isDisabled
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
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
