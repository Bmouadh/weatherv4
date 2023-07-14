import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';

export type ErrorType = {
  cod: string;
  message: string;
};

// Create component of the forecast table weather
@Component({
  selector: 'forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.css'],
})
export class ForecastTableComponent implements OnInit {
  forecast: any;
  error: ErrorType | undefined;
  displayedColumns!: string[];

  constructor(private weatherService: WeatherService) {}

  // Execute this on component initialization
  ngOnInit() {
    this.weatherService.getForecast().subscribe(
      (response) => {
        this.forecast = response;
      },
      (error) => {
        this.error = error.error;
        console.error(error);
      }
    );

    // Setting the collumns of the angular material table
    this.displayedColumns = [
      'Date',
      'Temperature',
      'Humidity',
      'Pressure',
      'Wind speed',
      'See level',
      'Description',
    ];
  }
}
