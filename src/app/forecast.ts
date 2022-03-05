import { AutocompleteLocation } from "./location";

export interface Forecast {
  location: AutocompleteLocation;
  forecast: {
    forecastday: WeatherForecast[]
  }

}

export interface WeatherForecast {
  "date": string,
  "date_epoch": number,
  "day":
    {
      "maxtemp_c": number,
      "maxtemp_f": number,
      "mintemp_c": number,
      "mintemp_f": number,
      "avgtemp_c": number,
      "avgtemp_f": number,
      "maxwind_mph": number,
      "maxwind_kph": number,
      "totalprecip_mm": number,
      "totalprecip_in": number,
      "avgvis_km": number,
      "avgvis_miles": number,
      "avghumidity": number,
      "condition":
        {
          "text": string,
          "icon": string,
          "code": number
        },
      "uv": 2.0
    }
}
