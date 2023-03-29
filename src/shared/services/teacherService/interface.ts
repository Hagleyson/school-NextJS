import { IListAllTeacher } from "@/shared/Interfaces/index";

export interface IReturnListAllTeacher {
  data: IListAllTeacher;
  status: number;
}

export interface IFilterTeacher {
  params: {
    page: number;
  };
}

export interface ITeacherService {
  listAll: (filter: IFilterTeacher) => Promise<IReturnListAllTeacher>;
}
