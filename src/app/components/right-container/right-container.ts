import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WeatherService } from '../../Services/weather-service';
import { DayTimePipe } from '../../pipes/day-time-pipe';

@Component({
  selector: 'app-right-container',
  imports: [MatButtonModule, MatCardModule, CommonModule, DayTimePipe],
  templateUrl: './right-container.html',
  styleUrl: './right-container.scss',
})
export class RightContainer implements OnInit {
  evenHours: any[] = [];
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.getHourlyWeather();
  }
  today: boolean = false;
  week: boolean = true;
  weatherData: any;

  onTodayClick(): void {
    this.today = true;
    this.week = false;
  }
  onWeekClick(): void {
    this.week = true;
    this.today = false;
  }
  getHourlyWeather() {
    this.weatherService.citySearch$.subscribe({
      next: (res) => {
        this.weatherData = res;
        console.log('....>>>>>Inside right container', this.weatherData);
        const hours = this.weatherData?.forecast?.forecastday[0]?.hour;
        if (hours && Array.isArray(hours)) {
          this.evenHours = hours.filter((item: any) => {
            const hour = new Date(item.time).getHours();
            return hour % 2 === 0;
          });
        }
        console.log('evenhour', this.evenHours);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
