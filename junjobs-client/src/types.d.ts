import { FormikProps } from "formik";

export interface IHeaderProps {
  user: any;
  loggedIn: any;
  logout: any;
}

export interface IJobsListProps {
  jobs: Job[];
}

export interface IJobProps {
  job: Job;
}

export interface IMapProps {
  address: string;
}

export interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  paginate: (number: number) => void;
  currentPage: number;
  pagesPerBlock: number;
}

export interface UserState {
  isLoading: boolean;
  error: any;
  data: any;
  loggedIn: boolean;
}

export interface JobsState {
  isLoading: boolean;
  error: any;
  data: Job[];
  query: string;
  isRemote: boolean;
  country: string;
}

export interface Job {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export function logIn(data: LoginData): void {}

export interface IAuthProps {
  show: boolean;
  logIn: logIn;
}

export interface IAuthFormProps {
  formik: FormikProps<LoginData>;
}
