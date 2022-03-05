import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from "./weather.service";
import { AutocompleteLocation } from "./location";
import { WeatherForecast } from "./forecast";
import * as dayjs from "dayjs";
import { distinctUntilChanged, filter, fromEvent, map, Observable, switchMap } from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('query') queryInput: ElementRef;

  forecasts$: Observable<WeatherForecast[]>;
  location$: Observable<AutocompleteLocation>;

  math = Math;

  constructor(private weatherService: WeatherService) {
  }

  ngAfterViewInit() {
    this.location$ = fromEvent<Event>(this.queryInput.nativeElement, 'keyup').pipe(
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged(),
      filter(query => query.length > 3),
      switchMap(query => this.weatherService.autocomplete(query)),
      map(locations => locations[0]));


    this.forecasts$ = this.location$.pipe(
      switchMap(location => this.weatherService.forecast(location.lat, location.lon)),
      map(forecast => forecast.forecast.forecastday)
    )
  }

  getDayFromDate(forecast: WeatherForecast) {
    return dayjs(forecast.date).format('dddd');
  }
}
