import { ITeacher } from "./../ITeacher/index";
import { IMeta } from "../IMeta";

export interface IReturnCourse {
  status: number;
  data: {
    message: string;
    code: string;
    stack: string;
  };
}
export interface ICourse {
  id: number;
  secure_id: string;
  name: string;
  content: string;
  target_audience: string;
  status: string;
  teacher: ITeacher;
}
export interface IListAllCourse {
  meta: IMeta;
  data: ICourse[];
}

export interface ICreateOrUpdateCourse {
  teacher_secure_id: string;
  name: string;
  content: string;
  target_audience: string;
}
