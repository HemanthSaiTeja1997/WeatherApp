import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../Services/weather-service';
import { DayTimePipe } from '../../pipes/day-time-pipe';
import { IweatherApiResponse } from '../../iWeatherData';

@Component({
  selector: 'app-right-container',
  imports: [CommonModule, DayTimePipe],
  templateUrl: './right-container.html',
  styleUrl: './right-container.scss',
})
export class RightContainer implements OnInit {
  evenHours: any[] = [];
  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getHourlyWeather();
  }
  today: boolean = false;
  week: boolean = true;
  weatherData: IweatherApiResponse | undefined | null;

  onTodayClick(): void {
    this.today = true;
    this.week = false;
  }
  onWeekClick(): void {
    this.week = true;
    this.today = false;
  }
  getHourlyWeather(): void {
    this.weatherService.citySearch$.subscribe({
      next: (city: string) => {
        this.weatherService.getWeatherForecast(city).subscribe({
          next: (res: IweatherApiResponse) => {
            this.weatherData = res;
            const hours = res?.forecast?.forecastday[0]?.hour;
            if (hours && Array.isArray(hours)) {
              this.evenHours = hours.filter((item: any) => {
                const hour = new Date(item.time).getHours();
                return hour % 2 === 0;
              });
            }
          },
          error: (error) => {
            console.error('Forecast API error:', error);
          },
        });
      },
      error: (error) => {
        console.error('City stream error:', error);
      },
    });
  }
}
