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

  const { listAll: listAllService } = teacherServices();

  const { params } = ctx;
  const page = Number(params?.page) ?? 1;

  setContext(ctx);

  const { data } = await listAllService({
    params: {
      page,
    },
  });

  return {
    props: {
      meta: data.meta,
      data: data.data,
    },
  };

  return {
    props: {},
  };
};
