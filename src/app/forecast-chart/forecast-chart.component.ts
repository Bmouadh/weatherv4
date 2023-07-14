import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export type ErrorType = {
  cod: string;
  message: string;
};

// Create component of the forecast chart weather
@Component({
  selector: 'forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.css'],
})
export class ForecastChartComponent implements OnInit, AfterViewInit {
  chart: am4charts.XYChart | null = null;
  error: ErrorType | undefined;
  forecast!: any;

  constructor(private weatherService: WeatherService) {}

  // Execute this on component initialization
  ngOnInit() {
    // Call the service function and store the response into local variable
    this.weatherService.getForecast().subscribe(
      (response) => {
        this.forecast = response;
        this.createChart(this.forecast.list);
        console.log(response);
      },

      // catch the error
      (error) => {
        this.error = error.error;
        console.error(error);
        console.error('Error fetching forecast:', error.error.message);
      }
    );
  }

  // Execute this after component initialization
  ngAfterViewInit() {
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
  }

  // Function to create a chart
  createChart(data: any[]) {
    if (!this.chart) {
      return;
    }

    // Initialization of data chart by the data from API response
    this.chart.data = data.map((item) => ({
      date: new Date(item.dt_txt),
      temperature: item.main.temp,
      temperatureFeelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: item.wind.speed,
      seaLevel: item.main.sea_level,
    }));

    // Create axes
    const categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = 45;
    categoryAxis.renderer.minGridDistance = 50;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const temperatureSeries = this.chart.series.push(
      new am4charts.LineSeries()
    );
    temperatureSeries.dataFields.valueY = 'temperature';
    temperatureSeries.dataFields.dateX = 'date';
    temperatureSeries.tooltipText =
      'Temperature: {valueY}°C and feels like: {openValueY}°C';
    temperatureSeries.dataFields.openValueY = 'temperatureFeelsLike';
    temperatureSeries.name = 'Temperature';
    temperatureSeries.strokeWidth = 2;
    temperatureSeries.minBulletDistance = 10;

    const humiditySeries = this.chart.series.push(new am4charts.LineSeries());
    humiditySeries.dataFields.valueY = 'humidity';
    humiditySeries.dataFields.dateX = 'date';
    humiditySeries.tooltipText = 'Humidity: {valueY}%';
    humiditySeries.name = 'Humidity';
    humiditySeries.strokeWidth = 2;
    humiditySeries.minBulletDistance = 10;

    const pressureSeries = this.chart.series.push(new am4charts.LineSeries());
    pressureSeries.dataFields.valueY = 'pressure';
    pressureSeries.dataFields.dateX = 'date';
    pressureSeries.tooltipText = 'Pressure: {valueY}mBar';
    pressureSeries.name = 'Pressure';
    pressureSeries.strokeWidth = 2;
    pressureSeries.minBulletDistance = 10;

    const windSpeedSeries = this.chart.series.push(new am4charts.LineSeries());
    windSpeedSeries.dataFields.valueY = 'windSpeed';
    windSpeedSeries.dataFields.dateX = 'date';
    windSpeedSeries.tooltipText = 'Wind speed: {valueY}Kmh';
    windSpeedSeries.name = 'Wind speed';
    windSpeedSeries.strokeWidth = 2;
    windSpeedSeries.minBulletDistance = 10;

    const seaLevelSeries = this.chart.series.push(new am4charts.LineSeries());
    seaLevelSeries.dataFields.valueY = 'seaLevel';
    seaLevelSeries.dataFields.dateX = 'date';
    seaLevelSeries.tooltipText = 'Sea level: {valueY}M';
    seaLevelSeries.name = 'Sea level';
    seaLevelSeries.strokeWidth = 2;
    seaLevelSeries.minBulletDistance = 10;

    // Add chart cursor
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.behavior = 'zoomXY';

    // Add legend
    this.chart.legend = new am4charts.Legend();

    // Add scrollbar
    this.chart.scrollbarX = new am4core.Scrollbar();
  }
}
