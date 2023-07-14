import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

export type ErrorType = {
  cod: string;
  message: string;
};

// Create component of the current weather
@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  weather: any;
  error: ErrorType | undefined;

  constructor(private weatherService: WeatherService) {}
  // Execute this on component initialization
  ngOnInit() {
    // Call the service function and store the response into local variable
    this.weatherService.getCurrentWeather().subscribe(
      (response) => {
        this.weather = response;
      },
      // catch the error
      (error) => {
        this.error = error.error;
        console.error(error);
      }
    );
  }
}
