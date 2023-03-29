import React, { createContext, useContext, useState } from "react";

import { ITeacherContext } from "./interface";
import { toast } from "react-toastify";

import { teacherServices } from "@/shared/services";
import { IMeta, ITeacher } from "@/shared/Interfaces";

export const Teacher = createContext({} as ITeacherContext);

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const { listAll: listAllService } = teacherServices();
  const [meta, setMeta] = useState<IMeta>({} as IMeta);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  async function listAll(page: number) {
    try {
      const response = await listAllService({
        params: {
          page,
        },
      });
      const { data } = response;
      if (data.data) {
        setMeta(data.meta);
        setTeachers(data.data);
      }
    } catch ({ error }: any) {
      toast.error("Ocorreu um ao listar professores");
    }
  }

  return (
    <Teacher.Provider value={{ listAll, meta, teachers }}>
      {children}
    </Teacher.Provider>
  );
}

export const useTeacher = (): ITeacherContext => {
  return useContext(Teacher);
};
