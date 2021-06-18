import CountriesList from "../CoutriesList/CountriesList";
import FilterCheckbox from "../FiltersBar/FilterCheckbox";
import { IFiltersBarProps} from "../../types";

//TODO: frontend backend filters
const FiltersBar = ({country, onCountryChange, onFavouritesChange, isFavourite, role, onRemoteChange, isRemote, remoteLabel}: IFiltersBarProps) => {
  return <div className="container-md d-flex justify-content-between align-items-center my-4 py-3 px-md-5 text-white-50 border border-dark rounded-3 bg-dark shadow-3-strong">
            <div className="w-25">
                <CountriesList country={country} setCountry={onCountryChange}/>
            </div>
            
            <div className="d-flex flex-column flex-lg-row flex-wrap justify-content-between">
                {role && <FilterCheckbox label="My Selected Jobs" onChange={onFavouritesChange} isChecked={isFavourite}/>}
                <FilterCheckbox label={remoteLabel} onChange={onRemoteChange} isChecked={isRemote}/>
                <FilterCheckbox label="FrontEnd" onChange={()=> null} isChecked={null} disabled/>
                <FilterCheckbox label="BackEnd" onChange={()=> null} isChecked={null} disabled/>
                <FilterCheckbox label="Fullstack" onChange={()=> null} isChecked={null} disabled />
            </div>
        </div>  
}

export default FiltersBar;