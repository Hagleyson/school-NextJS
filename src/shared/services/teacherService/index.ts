import { urls } from "@/shared/constant/apiUrl";
import { http } from "@/shared/lib";
import {
  IReturnListAllTeacher,
  ITeacherService,
  IFilterTeacher,
} from "./interface";

const teacherServices = (): ITeacherService => {
  async function listAll(
    filter: IFilterTeacher
  ): Promise<IReturnListAllTeacher> {
    return http.get(urls.teacher.get(), filter);
  }

  return { listAll };
};

export default teacherServices;
