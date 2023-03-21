import { generateBreadCrumpPath } from "@/shared/helpers";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";

export default function Courses() {
  const router = useRouter();

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
      <h1>Cursos</h1>
      <button
        onClick={() => {
          generateBreadCrumpPath(router.pathname);
        }}
      >
        teste
      </button>
    </>
  );
}
