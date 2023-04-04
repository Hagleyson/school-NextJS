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
export interface ITeacherService {
  listAll: (filter: IFilterTeacher) => Promise<IReturnListAllTeacher>;
  listOne: (secure_id: string) => Promise<IReturnListOneTeacher>;
}
