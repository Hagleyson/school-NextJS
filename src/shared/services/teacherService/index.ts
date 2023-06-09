import { urls } from "@/shared/constant/apiUrl";
import { http } from "@/shared/lib";
import {
  IReturnListAllTeacher,
  ITeacherService,
  IFilterTeacher,
  IReturnListOneTeacher,
} from "./interface";
import { ICreateOrUpdateTeacher, ITeacherReturn } from "@/shared/Interfaces";

const teacherServices = (): ITeacherService => {
  async function listAll(
    filter: IFilterTeacher
  ): Promise<IReturnListAllTeacher> {
    return http.get(urls.teacher.get(), filter);
  }

  async function listOne(secure_id: string): Promise<IReturnListOneTeacher> {
    return http.get(urls.teacher.show(secure_id));
  }

  async function register(
    data: ICreateOrUpdateTeacher
  ): Promise<ITeacherReturn> {
    return http.post(urls.teacher.post(), data);
  }

  async function update(
    secure_id: string,
    data: ICreateOrUpdateTeacher
  ): Promise<ITeacherReturn> {
    return http.put(urls.teacher.update(secure_id), data);
  }

  async function deleteTeacher(secure_id: string): Promise<ITeacherReturn> {
    return http.delete(urls.teacher.delete(secure_id));
  }

  return { listAll, listOne, register, update, deleteTeacher };
};

export default teacherServices;
