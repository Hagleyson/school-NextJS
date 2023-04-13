import { ICreateOrUpdateCourse } from "@/shared/Interfaces";

export interface ICourseContext {
  register: (dataTeacher: ICreateOrUpdateCourse) => Promise<void>;
  update: (
    secure_id: string,
    dataTeacher: ICreateOrUpdateCourse
  ) => Promise<void>;
  deleteCourse: (secure_id: string) => Promise<void>;
  activateOrDeactivate: (secure_id: string) => Promise<void>;
  validationSchema: any;
}
