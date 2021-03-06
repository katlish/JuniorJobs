import { FormikProps } from "formik";
import { userRole } from "./store/constants/constants";

export interface INavBarProps {
  user: any;
  loggedIn: any;
  logout: any;
}
//FIXME: user any
export interface IHeaderProps {
  user: any;
  loggedIn: any;
}


export interface IFiltersBarProps {
  country: string; 
  onCountryChange: Function; 
  onFavouritesChange: Function; 
  isFavourite: boolean; 
  role: userRole; 
  onRemoteChange: Function;  
  onBackendChange: Function;
  onFullstackChange: Function;
  onFrontendChange: Function;
  isRemote: boolean; 
  remoteLabel: string;
  selectedItemsLabel: string;
  isFilterHidden: boolean;
}

export interface IGenericPageWithCardsProps {
  visibleItems: ItemCard[]; 
  isLoading: boolean; 
  isRemote: boolean; 
  isFavourite: boolean; 
  country: string;
  error: string;
  userFavourites: string[];
  role: userRole;
  toggleIsRemoteAction: Function;
  toggleIsBackendAction: Function;
  toggleIsFrontendAction: Function;
  toggleIsFullstackAction: Function;
  toggleIsFavouriteAction: Function;
  addToFavouritesAction: Function;
  removeFromFavouritesAction: Function;
  setCountryAction: Function;
  remoteLabel: string;
  selectedItemsLabel: string;
  isFilterHidden: boolean;
  resultsText: string;
  resultsTextForFavourites: string;
  cardsWithAddCheckbox: boolean;
}

export interface ICardsListProps {
  items: ItemCard[];
  withAdd: boolean;
  checkedFavourites: string[];
  addToFavourites: Function;
  removeFromFavourites: Function;
}

export interface IGenericCardProps {
  item: ItemCard;
  withAdd: boolean;
  isChecked: boolean;
  addToFavourites: Function;
  removeFromFavourites: Function;
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
  isEmailConfirmed: boolean;
}

export interface JobsState {
  isLoading: boolean;
  data: Job[];
}

export interface CandidatesState {
  isLoading: boolean;
  data: Candidate[];
}

export interface CommonState {
  error: any;
  isRemote: boolean;
  isFavourite: boolean;
  country: Country | null;
  isBackend: boolean;
  isFullstack: boolean;
  isFrontend: boolean;
}

export interface Candidate {
  email: string;
  createdAt: string;
  description: string;
  _id: string;
  jobs: String[];
  location: string;
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
  type: string;
  resendEmail: Function;
}

export interface IAuthFormProps {
  formik: FormikProps<SignInData>;
  type: string;
}

export interface ItemCard {
  externalId: string;
  logo: string;
  title: string;
  subtitle: string;
  location: string;
  createdAt: string;
  description: string;
  url: string;
  tags: String[];
}

export interface IWelcomePage{
  verifyEmail: Function;
  resendEmail: Function;
}