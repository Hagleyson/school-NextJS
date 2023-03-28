import * as React from "react";
import { GetServerSideProps } from "next";
import { redirectPage } from "@/shared/helpers";

export default function Courses() {
  return <h1>hagleyson</h1>;
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
