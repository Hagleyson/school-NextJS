import { InputAdornment } from "@mui/material";

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

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

const schema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Email deve ser válido")
      .required("Campo obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  })
  .required();

export default function Home() {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function handleSignIn(data: any): Promise<void> {
    console.log(data);
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
            inputRef={register}
            name="email"
            label="Usuário"
          />

          <Input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            inputRef={register}
            name="password"
            label="Senha"
            type="password"
          />

          <ButtonLogin type="submit" variant="contained">
            Enviar
          </ButtonLogin>
        </FormLogin>
      </CardLogin>
    </Content>
  );
}
