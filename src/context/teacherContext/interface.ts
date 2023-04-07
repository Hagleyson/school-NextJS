import { ICreateOrUpdateTeacher } from "@/shared/Interfaces";

export interface ITeacherContext {
  register: (dataTeacher: ICreateOrUpdateTeacher) => Promise<void>;
  update: (
    secure_id: string,
    dataTeacher: ICreateOrUpdateTeacher
  ) => Promise<void>;
  deleteTeacher: (secure_id: string) => Promise<void>;
}
