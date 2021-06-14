import CountrySelect from "react-bootstrap-country-select";
import { ICountriesProps } from "../../types";
import classes from "./CountriesList.module.css";

const CountriesList = ({country, setCountry}: ICountriesProps ) => {
    return (
    <CountrySelect 
        className={classes.CountriesList}
        value={country}
        onChange={setCountry}
        flush={true}
    />
    );
}

export default CountriesList;