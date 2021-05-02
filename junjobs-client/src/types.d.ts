import { FormikProps } from "formik";

export interface IHeaderProps {
  user: any;
  loggedIn: any;
  logout: any;
}

export interface IJobsListProps {
  jobs: Job[];
}

export interface ICandidatesListProps {
  candidates: Candidate[];
}

export interface IJobProps {
  job: Job;
}

export interface ICandidateProps {
  candidate: Candidate;
}

export interface IMapProps {
  address: string;
}

export interface IAddCandidatePageProps {
  email: string;
  submitHandler: (candidate: Candidate) => void;
}

export interface ICountriesProps {
  country: string | null;
  setCountry: SetStateAction<null>;
}

export interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  paginate: (number: number) => void;
  currentPage: number;
  pagesPerBlock: number;
}

export interface Country {
    id: string;
    name: string;
    flag: string;
    alpha2: string;
    alpha3: string;
    ioc: string;
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
  isRemote: boolean;
  country: Country | null;
}

export interface CandidatesState {
  isLoading: boolean;
  error: any;
  data: Candidate[];
  isRemote: boolean;
  country: Country | null;
}

export interface Candidate {
  email: string;
  createdAt?: string;
  description: string;
  _id?: string;
  jobs: String[];
  location: string | null;
  name: string;
  url: string;
  yearsOfExperience: number;
  isremote: boolean;
}



export interface Job {
  _id: string;
  type: string;
  url: string;
  createdAt: string;
  company: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
  jobs: String[];
  isremote: boolean;
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
