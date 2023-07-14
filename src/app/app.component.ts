import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

// Create component of the current weather
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DashBoard Weather';
  activeTab = 0;
  matSidenavOpened = false;
  cityName!: string;

  constructor(private WeatherService: WeatherService) {}

  // SideBar function for opening and closing
  toggleMatSidenav(): void {
    this.matSidenavOpened = !this.matSidenavOpened;
  }

  // Setting the city name by user input value and sending it to the service component
  setCityName(cityName: string) {
    this.WeatherService.setCityName(cityName);
    this.cityName = cityName;
    this.activeTab = 1;
  }
}
