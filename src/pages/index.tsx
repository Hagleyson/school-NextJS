import { redirectPage } from "@/shared/helpers";
import { GetServerSideProps } from "next";
import * as React from "react";

export default function HomePage() {
  return <h1>Bem vindo a escola!</h1>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = redirectPage(ctx);

  if (result) {
    return result;
  }

  return {
    props: {},
  };
};
