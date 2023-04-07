import { FormStyled } from "./styled";

type propsType = {
  onSubmit?: any;
  children: React.ReactNode;
};

export default function Form(props: propsType) {
  return <FormStyled onSubmit={props.onSubmit}>{props.children}</FormStyled>;
}
