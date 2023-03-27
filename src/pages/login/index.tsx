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

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

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
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
            label="Usuário"
            {...register("email")}
          />

          <Input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            label="Senha"
            type="password"
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
