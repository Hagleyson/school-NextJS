import { Pagination, TableFooter } from "@mui/material";
import { CustomStack, CustomTableFooterStyled } from "./styled";
import { UseFormRegister } from "react-hook-form";
import { IMeta } from "@/shared/Interfaces";
import { useEffect, useState } from "react";

type propsType = {
  meta: IMeta;
  handleChange: any;
};

export default function CustomTableFooter({ meta, handleChange }: propsType) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(meta.current_page);
  }, [meta.current_page]);
  return (
    <CustomTableFooterStyled>
      <CustomStack>
        <Pagination
          count={meta.last_page}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
        />
      </CustomStack>
    </CustomTableFooterStyled>
  );
}
