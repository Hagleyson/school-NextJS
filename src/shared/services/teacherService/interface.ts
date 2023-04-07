import { ICreateOrUpdateTeacher } from "./../../Interfaces/ITeacher/index";
import { IListAllTeacher, IListOneTeacher } from "@/shared/Interfaces/index";

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
export interface IReturnCreateUpdateDelete {
  status: number;
}
export interface ITeacherService {
  listAll: (filter: IFilterTeacher) => Promise<IReturnListAllTeacher>;
  listOne: (secure_id: string) => Promise<IReturnListOneTeacher>;
  register: (
    data: ICreateOrUpdateTeacher
  ) => Promise<IReturnCreateUpdateDelete>;
  update: (
    secure_id: string,
    data: ICreateOrUpdateTeacher
  ) => Promise<IReturnCreateUpdateDelete>;
  deleteTeacher: (secure_id: string) => Promise<IReturnCreateUpdateDelete>;
}
