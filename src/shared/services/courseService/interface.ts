import {
  ICourse,
  IListAllCourse,
  ICreateOrUpdateCourse,
  IReturnCourse,
} from "@/shared/Interfaces/ICourse/index";

export interface IReturnListAllCourse {
  data: IListAllCourse[];
  status: number;
}

export interface IFilterListAllCourse {
  params: {
    page: number;
  };
}
export interface IReturnListOneCourse {
  data: ICourse;
}
export interface ITeacherService {
  listAll: (filter: IFilterListAllCourse) => Promise<IReturnListAllCourse>;
  listOne: (secure_id: string) => Promise<IReturnListOneCourse>;
  register: (data: ICreateOrUpdateCourse) => Promise<IReturnCourse>;
  update: (
    secure_id: string,
    data: ICreateOrUpdateCourse
  ) => Promise<IReturnCourse>;
  deleteTeacher: (secure_id: string) => Promise<IReturnCourse>;
}
