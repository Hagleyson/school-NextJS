import InputMask from "react-input-mask";

import { TextField } from "@mui/material";
import { useState } from "react";

export default function TesteInput() {
  const [phone, setValue] = useState<string>("");

  return (
    <div>
      <InputMask mask={[]} />
    </div>
  );
}
