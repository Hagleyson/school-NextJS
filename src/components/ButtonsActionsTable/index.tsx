import { Tooltip } from "@mui/material";
import { DeleteButton, UpdateButton, ViewButton } from "./styled";

type propsType = {
  secure_id: string;
  handleClick: (secure_id: string, type: string) => void;
};

export default function ButtonsActionsTable({
  secure_id,
  handleClick,
}: propsType) {
  return (
    <>
      <Tooltip title="Editar Registro">
        <UpdateButton onClick={() => handleClick("update", secure_id)} />
      </Tooltip>
      <Tooltip title="Apagar Registro">
        <DeleteButton onClick={() => console.log("deletar")} />
      </Tooltip>
      <Tooltip title="Visualizar Registro">
        <ViewButton onClick={() => handleClick("view", secure_id)} />
      </Tooltip>
    </>
  );
}
