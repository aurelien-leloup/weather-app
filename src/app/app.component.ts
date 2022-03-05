import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from "./weather.service";
import { AutocompleteLocation } from "./location";
import { WeatherForecast } from "./forecast";
import * as dayjs from "dayjs";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  forecasts: WeatherForecast[] = [];
  location: AutocompleteLocation | undefined;
  query = '';
  math = Math;
  subscriptions = new Subscription();


  constructor(private weatherService: WeatherService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onQueryChanged() {
    if (this.query.length > 3) {
      this.subscriptions.add(this.weatherService.autocomplete(this.query).subscribe(
        (locations) => {
          this.location = locations[0];
          this.subscriptions.add(this.weatherService.forecast(this.location.lat, this.location.lon).subscribe(
            forecast => this.forecasts = forecast.forecast.forecastday
          ));
        }
      ));
    }
  }

  getDayFromDate(forecast: WeatherForecast) {
    return dayjs(forecast.date).format('dddd');
  }
}
