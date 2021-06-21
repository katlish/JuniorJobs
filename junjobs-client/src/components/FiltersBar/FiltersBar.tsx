import CountriesList from "../CoutriesList/CountriesList";
import FilterCheckbox from "../FiltersBar/FilterCheckbox";
import { IFiltersBarProps} from "../../types";

const FiltersBar = ({
    country, 
    onCountryChange, 
    onFavouritesChange, 
    onBackendChange,
    onFrontendChange,
    onFullstackChange,
    isFavourite, 
    role, 
    onRemoteChange, 
    isRemote, 
    remoteLabel, 
    selectedItemsLabel, 
    isFilterHidden }: IFiltersBarProps) => {
  return <div className="container-md d-flex justify-content-between align-items-center my-4 py-3 px-md-5 text-white-50 border border-dark rounded-3 bg-dark shadow-3-strong">
            <div className="w-25">
                <CountriesList country={country} setCountry={onCountryChange}/>
            </div>
            
            <div className="d-flex flex-column flex-lg-row flex-wrap justify-content-between">
                {role && <FilterCheckbox label={selectedItemsLabel} onChange={onFavouritesChange} isChecked={isFavourite} isHidden={isFilterHidden}/>}
                <FilterCheckbox label={remoteLabel} onChange={onRemoteChange} isChecked={isRemote}/>
                <FilterCheckbox label="FrontEnd" onChange={onFrontendChange} />
                <FilterCheckbox label="BackEnd" onChange={onBackendChange} />
                <FilterCheckbox label="Fullstack" onChange={onFullstackChange} />
            </div>
        </div>  
}

export default FiltersBar;