import { IconButton, InputAdornment } from "@mui/material";

import {
  Content,
  CardLogin,
  TextLogin,
  ButtonLogin,
  FormLogin,
  Input,
} from "./style";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockIcon from "@mui/icons-material/Lock";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { useUser } from "@/context/authContext";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const schema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Digite um E-mail válido")
      .required("Digite um E-mail válido"),
    password: Yup.string().required("Por Favor Digite Sua Senha "),
  })
  .required();

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { signIn } = useUser();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleSignIn(data: any): Promise<void> {
    signIn(data);
  }

  return (
    <Content>
      <CardLogin>
        <TextLogin variant="h1">
          Olá! <p>Faça login para acessar sua conta.</p>
        </TextLogin>
        <FormLogin onSubmit={handleSubmit(handleSignIn)}>
          <Input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            label="Usuário"
            error={!!errors.email?.message}
            helperText={errors.email?.message?.toString()}
            {...register("email")}
          />

          <Input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors.password?.message?.toString()}
            error={!!errors.password?.message}
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />

          <ButtonLogin type="submit" variant="contained">
            Enviar
          </ButtonLogin>
        </FormLogin>
      </CardLogin>
    </Content>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx, true);

  if (result) {
    return result;
  }

  return {
    props: {},
  };
};
