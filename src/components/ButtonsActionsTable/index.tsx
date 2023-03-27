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
        <UpdateButton onClick={() => handleClick(secure_id, "update")} />
      </Tooltip>
      <Tooltip title="Apagar Registro">
        <DeleteButton onClick={() => handleClick(secure_id, "register")} />
      </Tooltip>
      <Tooltip title="Visualizar Registro">
        <ViewButton onClick={() => handleClick(secure_id, "view")} />
      </Tooltip>
    </>
  );
}
