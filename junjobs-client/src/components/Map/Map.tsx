import React from "react";
import { IMapProps } from "../../types";

const MY_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const Map = ({address}: IMapProps) => {
  const _url = `https://www.google.com/maps/embed/v1/place?key=${
    MY_API_KEY
  }&q=${address}`;

  return <iframe
          id="map"
          title="map"
          frameBorder="0"
          width="100%"
          height="100%"
          scrolling="no"
          src={_url}
        />
}

export default Map;