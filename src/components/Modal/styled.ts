import { Box as BoxUi, Modal as ModalUi } from "@mui/material";
import { styled } from "@mui/system";

export const ModalStyled = styled(ModalUi)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Box = styled(BoxUi)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 400px;
  height: 200px;
  background: white;
  position: absolute;
  border-radius: 10px;
`;
export const ContainerButtons = styled(BoxUi)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    width: 100px;
    margin: 10px;
  }
`;
