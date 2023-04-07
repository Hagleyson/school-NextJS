import { ICreateOrUpdateTeacher } from "./../../Interfaces/ITeacher/index";
import {
  IListAllTeacher,
  IListOneTeacher,
  ITeacherReturn,
} from "@/shared/Interfaces/index";

export interface IReturnListAllTeacher {
  data: IListAllTeacher;
  status: number;
}

export interface IFilterTeacher {
  params: {
    page: number;
  };
}
export interface IReturnListOneTeacher {
  data: IListOneTeacher;
}

export interface ITeacherService {
  listAll: (filter: IFilterTeacher) => Promise<IReturnListAllTeacher>;
  listOne: (secure_id: string) => Promise<IReturnListOneTeacher>;
  register: (data: ICreateOrUpdateTeacher) => Promise<ITeacherReturn>;
  update: (
    secure_id: string,
    data: ICreateOrUpdateTeacher
  ) => Promise<ITeacherReturn>;
  deleteTeacher: (secure_id: string) => Promise<ITeacherReturn>;
}
