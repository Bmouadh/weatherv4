import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_KEY = '35cb9273871536470f882136779b829d';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  cityName!: String;

  // Setting the city name by user input value
  setCityName(cityName: string) {
    this.cityName = cityName;
  }

  // Call the OpenWeather Api for current weather
  getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`;

    const params = new HttpParams({ fromString: 'name=term' });
    return this.httpClient.request('GET', url, {
      responseType: 'json',
      params,
    });
  }

  // Call the OpenWeather Api for foreast weather
  getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&units=metric&&appid=${API_KEY}`;

    return this.httpClient.get(url);
  }
}
