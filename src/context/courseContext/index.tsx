import React, { createContext, useContext } from "react";

import { toast } from "react-toastify";

import { ICreateOrUpdateCourse } from "@/shared/Interfaces";
import { useRouter } from "next/router";
import { translateErrosTeacher } from "@/shared/helpers";
import { courseServices } from "@/shared/services/index";
import { ICourseContext } from "./interface";
import * as Yup from "yup";

export const Course = createContext({} as ICourseContext);
const homePath = "/cursos/1";

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();

  const {
    register: registerService,
    update: updateService,
    deleteCourse: deleteService,
    activateOrDeactivate: activateOrDeactivateService,
  } = courseServices();

  const validationSchema = Yup.object().shape({
    teacher_secure_id: Yup.string().required("Campo obrigatório"),
    name: Yup.string().required("Campo obrigatório"),
    content: Yup.string().required("Campo obrigatório"),
    target_audience: Yup.string().required("Campo obrigatório"),
    start_date: Yup.string().required("Campo obrigatório"),
    enroll_start_date: Yup.string().required("Campo obrigatório"),
    enroll_end_date: Yup.string().required("Campo obrigatório"),
    end_date: Yup.string().required("Campo obrigatório"),
  });

  async function register(dataCourse: ICreateOrUpdateCourse) {
    try {
      const response = await registerService(dataCourse);
      if (response.status === 200) {
        toast.success("Curso cadastrado com sucesso!");
        replace(homePath);
        return;
      }
      throw new Error();
    } catch {
      toast.error("Ocorreu um erro ao cadastrar esse Curso!");
    }
  }

  async function update(secure_id: string, dataCourse: ICreateOrUpdateCourse) {
    try {
      const response = await updateService(secure_id, dataCourse);
      if (response.status === 201) {
        toast.success("Curso atualizado com sucesso!");
        replace(homePath);
        return;
      }
      throw new Error();
    } catch {
      toast.error("Ocorreu um erro ao atualizar esse Curso!");
    }
  }

  async function deleteCourse(secure_id: string) {
    try {
      const { status, data } = await deleteService(secure_id);

      if (status === 200) {
        toast.success("Curso deletado com sucesso!");
        replace(homePath);
        return;
      }
      throw { error: data.code };
    } catch (error: any) {
      toast.error(translateErrosTeacher(error.error));
    }
  }

  async function activateOrDeactivate(secure_id: string) {
    try {
      const { status, data } = await activateOrDeactivateService(secure_id);
      if (status === 201) {
        toast.success("Status do curso atualizado com sucesso!");
        replace(homePath);
        return;
      }
      throw { error: data.code };
    } catch (error: any) {
      toast.error("Ocorreu um erro ao atualizar status");
    }
  }

  return (
    <Course.Provider
      value={{
        deleteCourse,
        register,
        update,
        activateOrDeactivate,
        validationSchema,
      }}
    >
      {children}
    </Course.Provider>
  );
}

export const useCourse = (): ICourseContext => {
  return useContext(Course);
};
