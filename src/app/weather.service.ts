import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AutocompleteLocation } from "./location";
import { Forecast } from "./forecast";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly ENDPOINT = 'https://api.weatherapi.com/v1';
  private readonly FORECAST_DAYS = 10;

  constructor(private http: HttpClient) {
  }

  autocomplete(query: string): Observable<AutocompleteLocation[]> {
    const params = new HttpParams()
      .set('key', environment.apiKey)
      .set('q', query);
    return this.http.get<AutocompleteLocation[]>(this.ENDPOINT + '/search.json', {params});
  }

  forecast(lat: number, lon: number): Observable<Forecast> {
    const params = new HttpParams()
      .set('key', environment.apiKey)
      .set('days', this.FORECAST_DAYS)
      .set('q',lat+','+lon);
    return this.http.get<Forecast>(this.ENDPOINT + '/forecast.json', {params});
  }

}
