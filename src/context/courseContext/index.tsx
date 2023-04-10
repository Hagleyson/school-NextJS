import React, { createContext, useContext } from "react";

import { toast } from "react-toastify";

import { ICreateOrUpdateCourse } from "@/shared/Interfaces";
import { useRouter } from "next/router";
import { translateErrosTeacher } from "@/shared/helpers";
import { courseServices } from "@/shared/services/index";
import { ICourseContext } from "./interface";

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

  async function register(dataTeacher: ICreateOrUpdateCourse) {
    try {
      const response = await registerService(dataTeacher);
      if (response.status === 200) {
        toast.success("Professor cadastrado com sucesso!");
        replace(homePath);
        return;
      }
      throw new Error();
    } catch {
      toast.error("Ocorreu um erro ao cadastrar esse professor!");
    }
  }

  async function update(secure_id: string, dataTeacher: ICreateOrUpdateCourse) {
    try {
      const response = await updateService(secure_id, dataTeacher);
      if (response.status === 201) {
        toast.success("Professor atualizado com sucesso!");
        replace(homePath);
        return;
      }
      throw new Error();
    } catch {
      toast.error("Ocorreu um erro ao atualizar esse professor!");
    }
  }

  async function deleteCourse(secure_id: string) {
    try {
      const { status, data } = await deleteService(secure_id);

      if (status === 200) {
        toast.success("Professor deletado com sucesso!");
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
      value={{ deleteCourse, register, update, activateOrDeactivate }}
    >
      {children}
    </Course.Provider>
  );
}

export const useCourse = (): ICourseContext => {
  return useContext(Course);
};
