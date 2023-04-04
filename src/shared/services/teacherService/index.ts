import { urls } from "@/shared/constant/apiUrl";
import { http } from "@/shared/lib";
import {
  IReturnListAllTeacher,
  ITeacherService,
  IFilterTeacher,
  IReturnListOneTeacher,
} from "./interface";

const teacherServices = (): ITeacherService => {
  async function listAll(
    filter: IFilterTeacher
  ): Promise<IReturnListAllTeacher> {
    return http.get(urls.teacher.get(), filter);
  }
  async function listOne(secure_id: string): Promise<IReturnListOneTeacher> {
    return http.get(urls.teacher.show(secure_id));
  }
  return { listAll, listOne };
};

export default teacherServices;
