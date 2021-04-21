import CountrySelect from "react-bootstrap-country-select";
import { ICountriesProps } from "../../types";

const CountriesList = ({country, setCountry}: ICountriesProps ) => {
    return (
    <CountrySelect className="my-4"
        value={country}
        onChange={setCountry}
        flush={false}
    />
    );
}

export default CountriesList;