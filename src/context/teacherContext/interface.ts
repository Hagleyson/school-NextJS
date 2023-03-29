import { ITeacher } from "@/shared/Interfaces";
import { IMeta } from "./../../shared/Interfaces/IMeta/index";

export interface ITeacherContext {
  listAll: (page: number) => Promise<void>;
  meta: IMeta;
  teachers: ITeacher[];
}
