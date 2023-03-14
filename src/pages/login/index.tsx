import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { CardForm, Description, Content, ContainerLogin } from "./style";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Home() {
  return (
    <Content>
      <Description>Bem Vindo!</Description>
      <ContainerLogin>
        <CardForm>
          <CardContent></CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardForm>
      </ContainerLogin>
    </Content>
  );
}
