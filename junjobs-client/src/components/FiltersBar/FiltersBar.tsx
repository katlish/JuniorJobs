import React from "react";
import CountriesList from "../CoutriesList/CountriesList";
import FilterCheckbox from "../FiltersBar/FilterCheckbox";

//TODO: frontend backend filters
const FiltersBar = ({country, onCountryChange, onFavouritesChange, isFavourite, role, onRemoteChange, isRemote}: any) => {
  return <div className="container-md d-flex flex-wrap justify-content-between align-items-center justify-content-center my-4 py-3 text-white-50 border border-dark rounded-3 bg-dark shadow-3-strong">
            <CountriesList country={country} setCountry={onCountryChange}/>
            
            <div className="d-flex flex-wrap flex-md-column flex-lg-row justify-content-between align-items-center justify-content-center">
                {role && <FilterCheckbox label="My Selected Jobs" onChange={onFavouritesChange} isChecked={isFavourite}/>}
                <FilterCheckbox label="Remote jobs only" onChange={onRemoteChange} isChecked={isRemote}/>
                <FilterCheckbox label="FrontEnd" onChange={()=> null} isChecked={null} disabled/>
                <FilterCheckbox label="BackEnd" onChange={()=> null} isChecked={null} disabled/>
            </div>
        </div>  
}

export default FiltersBar;