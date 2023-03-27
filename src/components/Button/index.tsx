import { ButtonStyled } from "./styled";

type propsType = {
  type: "submit" | "button";
  children: React.ReactNode;
  handleClick?: () => void;
};

export default function Button({ type, children, handleClick }: propsType) {
  return (
    <ButtonStyled variant="contained" type={type} onClick={handleClick}>
      {children}
    </ButtonStyled>
  );
}
