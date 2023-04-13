import React, { createContext, useContext } from "react";

import { IFormTeacher, ITeacherContext } from "./interface";
import { toast } from "react-toastify";

import { teacherServices } from "@/shared/services";
import { ICreateOrUpdateTeacher } from "@/shared/Interfaces";
import { useRouter } from "next/router";
import { translateErrosTeacher } from "@/shared/helpers";

export const Teacher = createContext({} as ITeacherContext);

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();

  const {
    register: registerService,
    update: updateService,
    deleteTeacher: deleteService,
  } = teacherServices();

  async function register(dataTeacher: ICreateOrUpdateTeacher) {
    try {
      const response = await registerService(dataTeacher);
      if (response.status === 200) {
        toast.success("Professor cadastrado com sucesso!");
        replace("/professores/1");
        return;
      }
      throw new Error();
    } catch {
      toast.error("Ocorreu um erro ao cadastrar esse professor!");
    }
  }

  async function update(
    secure_id: string,
    dataTeacher: ICreateOrUpdateTeacher
  ) {
    try {
      const response = await updateService(secure_id, dataTeacher);
      if (response.status === 201) {
        toast.success("Professor atualizado com sucesso!");
        replace("/professores/1");
        return;
      }
      throw new Error();
    } catch {
      toast.error("Ocorreu um erro ao atualizar esse professor!");
    }
  }

  async function deleteTeacher(secure_id: string) {
    try {
      const { status, data } = await deleteService(secure_id);

      if (status === 200) {
        toast.success("Professor deletado com sucesso!");
        replace("/professores/1");
        return;
      }
      throw { error: data.code };
    } catch (error: any) {
      toast.error(translateErrosTeacher(error.error));
    }
  }
  function formattedValue(data: IFormTeacher): ICreateOrUpdateTeacher {
    let formatted = {
      ...data,
      address: {
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        complement: data.complement ?? "",
      },
    };

    return formatted;
  }
  return (
    <Teacher.Provider
      value={{ deleteTeacher, register, update, formattedValue }}
    >
      {children}
    </Teacher.Provider>
  );
}

export const useTeacher = (): ITeacherContext => {
  return useContext(Teacher);
};
