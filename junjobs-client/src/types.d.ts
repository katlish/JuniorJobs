import { FormikProps } from "formik";
import { userRole } from "./store/constants/constants";

//FIXME: user any
export interface IHeaderProps {
  user: any;
  loggedIn: any;
  logout: any;
}


//FIXME: add remove any
export interface IJobsListProps {
  jobs: Job[];
  withAdd: boolean;
  checkedJobs: string[];
  addJob: any;
  removeJob: any;
}

export interface ICandidatesListProps {
  candidates: Candidate[];
}

//FIXME: add remove any
export interface IJobProps {
  job: Job;
  withAdd: boolean;
  isChecked: boolean;
  addJob: any;
  removeJob: any;
}

export interface ICandidateProps {
  candidate: Candidate;
}

export interface IMapProps {
  address: string;
}

export interface IAddCandidatePageProps {
  email: string;
  existingCandidate: Candidate | undefined;
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

//FIXME: data any
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
  externalId: string;
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


export interface SignInData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: userRole;
}


export function logIn(data: SignInData): void {}
export function signUp(): void {}


export interface IAuthProps {
  show: boolean;
  logIn: logIn;
  signUp: signUp;
}

export interface IAuthFormProps {
  formik: FormikProps<SignInData>;
  type: string;
}

