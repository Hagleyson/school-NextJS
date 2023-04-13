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
  enroll_start_date: string;
  enroll_end_date: string;
  start_date: string;
  end_date: string;
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
  enroll_start_date: string;
  enroll_end_date: string;
  start_date: string;
  end_date: string;
}
