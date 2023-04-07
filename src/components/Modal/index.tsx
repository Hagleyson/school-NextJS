import { Typography } from "@mui/material";
import Button from "../Button";
import { ModalStyled, Box, ContainerButtons } from "./styled";

type TModal = {
  text: string;
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

export default function Modal({
  text,
  isOpen,
  handleClose,
  handleConfirm,
}: TModal) {
  return (
    <>
      <ModalStyled
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box>
            <Typography sx={{ fontSize: "1.2rem" }}>{text}</Typography>
            <ContainerButtons>
              <Button type="button" handleClick={handleConfirm}>
                Sim{" "}
              </Button>
              <Button handleClick={handleClose} type="button">
                Não{" "}
              </Button>
            </ContainerButtons>
          </Box>
        </>
      </ModalStyled>
    </>
  );
}
