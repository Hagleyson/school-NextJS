import { IMeta } from "../IMeta";

export interface ITeacher {
  id: number;
  secure_id: string;
  name: string;
  last_name: string;
  cpf: string;
  training: string;
  birth_date: string;
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
}
