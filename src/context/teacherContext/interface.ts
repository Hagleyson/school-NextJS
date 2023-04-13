import { ICreateOrUpdateTeacher } from "@/shared/Interfaces";

export interface IFormTeacher {
  name: string;
  last_name: string;
  cpf: string;
  training: string;
  birth_date: string;
  email: string;
  alternative_email: string;
  rg: string;
  gender: string;
  naturalness: string;
  scholarship: string;
  phone: string;
  alternative_phone: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
}
export interface ITeacherContext {
  register: (dataTeacher: ICreateOrUpdateTeacher) => Promise<void>;
  update: (
    secure_id: string,
    dataTeacher: ICreateOrUpdateTeacher
  ) => Promise<void>;
  deleteTeacher: (secure_id: string) => Promise<void>;
  formattedValue: (data: IFormTeacher) => ICreateOrUpdateTeacher;
  validationSchema: any;
}
