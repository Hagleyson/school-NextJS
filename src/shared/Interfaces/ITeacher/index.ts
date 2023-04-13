import { IMeta } from "../IMeta";

export interface ITeacher {
  id: number;
  secure_id: string;
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
  address: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
  };
  created_at: string;
  updated_at: string;
}
export interface IListAllTeacher {
  meta: IMeta;
  data: ITeacher[];
}

export interface IListOneTeacher {
  secure_id: string;
  name: string;
  last_name: string;
  cpf: string;
  training: string;
  birth_date: string;
  code: string;
}

export interface ICreateOrUpdateTeacher {
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
  address: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
  };
}
export interface ITeacherReturn {
  status: number;
  data: {
    message: string;
    code: string;
    stack: string;
  };
}
