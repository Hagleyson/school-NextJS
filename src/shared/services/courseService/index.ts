import { urls } from "@/shared/constant";
import { http } from "@/shared/lib";
import {
  IFilterListAllCourse,
  IReturnListAllCourse,
  IReturnListOneCourse,
} from "./interface";
import { ICreateOrUpdateCourse, IReturnCourse } from "@/shared/Interfaces";

const courseServices = (): any => {
  const { courses } = urls;

  async function listAll(
    filter: IFilterListAllCourse
  ): Promise<IReturnListAllCourse> {
    return http.get(courses.get(), filter);
  }

  async function listOne(secure_id: string): Promise<IReturnListOneCourse> {
    return http.get(courses.show(secure_id));
  }

  async function register(data: ICreateOrUpdateCourse): Promise<IReturnCourse> {
    return http.post(courses.post(), data);
  }

  async function update(
    secure_id: string,
    data: ICreateOrUpdateCourse
  ): Promise<IReturnCourse> {
    return http.put(courses.update(secure_id), data);
  }

  async function deleteCourse(secure_id: string): Promise<IReturnCourse> {
    return http.delete(courses.delete(secure_id));
  }

  return { listAll, listOne, register, update, deleteCourse };
};
export default courseServices;
