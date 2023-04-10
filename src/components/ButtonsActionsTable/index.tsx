import { Tooltip } from "@mui/material";
import { DeleteButton, UpdateButton, ViewButton } from "./styled";

type propsType = {
  secure_id: string;
  handleClick: (secure_id: string, type: string) => void;
  children?: React.ReactNode;
};

export default function ButtonsActionsTable({
  secure_id,
  handleClick,
  children,
}: propsType) {
  return (
    <>
      <Tooltip title="Editar Registro">
        <UpdateButton onClick={() => handleClick("update", secure_id)} />
      </Tooltip>
      <Tooltip title="Visualizar Registro">
        <ViewButton onClick={() => handleClick("view", secure_id)} />
      </Tooltip>
      {children}
      <Tooltip title="Apagar Registro">
        <DeleteButton onClick={() => handleClick("delete", secure_id)} />
      </Tooltip>
    </>
  );
}
