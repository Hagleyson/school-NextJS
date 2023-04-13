import React, { createContext, useContext } from "react";

import { IFormTeacher, ITeacherContext } from "./interface";
import { toast } from "react-toastify";

import { teacherServices } from "@/shared/services";
import { ICreateOrUpdateTeacher } from "@/shared/Interfaces";
import { useRouter } from "next/router";
import { translateErrosTeacher, removeMask } from "@/shared/helpers";
import * as Yup from "yup";

export const Teacher = createContext({} as ITeacherContext);

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();

  const {
    register: registerService,
    update: updateService,
    deleteTeacher: deleteService,
  } = teacherServices();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    last_name: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    training: Yup.string().required("Campo obrigatório"),
    birth_date: Yup.string().required("Campo obrigatório"),
    email: Yup.string()
      .email("Digite um E-mail valido")
      .required("Campo obrigatório"),
    alternative_email: Yup.string()
      .email("Digite um E-mail valido")
      .required("Campo obrigatório"),
    rg: Yup.string().required("Campo obrigatório"),
    gender: Yup.string().required("Campo obrigatório"),
    naturalness: Yup.string().required("Campo obrigatório"),
    scholarship: Yup.string().required("Campo obrigatório"),
    phone: Yup.string().required("Campo obrigatório"),
    alternative_phone: Yup.string().required("Campo obrigatório"),
    street: Yup.string().required("Campo obrigatório"),
    number: Yup.string().required("Campo obrigatório"),
    neighborhood: Yup.string().required("Campo obrigatório"),
    complement: Yup.string().optional(),
  });

  async function register(dataTeacher: ICreateOrUpdateTeacher) {
    try {
      const response = await registerService(dataTeacher);
      if (response.status === 200) {
        toast.success("Professor cadastrado com sucesso!");
        replace("/professores/1");
        return;
      }
      if (response.status === 422) {
        throw { error: response.data };
      }
      throw new Error();
    } catch (e: any) {
      if (e.error) {
        for (const key in e.error) {
          toast.error(translateErrosTeacher(key));
        }
      } else {
        toast.error("Ocorreu um erro ao cadastrar esse professor!");
      }
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
      phone: removeMask(data.phone),
      alternative_phone: removeMask(data.alternative_phone),
      cpf: removeMask(data.cpf),
      address: {
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        complement: data.complement ?? "",
      },
    };

    delete formatted.street;
    delete formatted.neighborhood;
    delete formatted.number;
    delete formatted.complement;
    return formatted;
  }
  return (
    <Teacher.Provider
      value={{
        deleteTeacher,
        register,
        update,
        formattedValue,
        validationSchema,
      }}
    >
      {children}
    </Teacher.Provider>
  );
}

export const useTeacher = (): ITeacherContext => {
  return useContext(Teacher);
};
