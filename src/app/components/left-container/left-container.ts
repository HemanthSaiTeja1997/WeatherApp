import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { DayTimePipe } from '../../pipes/day-time-pipe';
import { WeatherService } from '../../Services/weather-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-left-container',
  imports: [FormsModule, CommonModule, DayTimePipe],
  templateUrl: './left-container.html',
  styleUrl: './left-container.scss',
})
export class LeftContainer implements OnInit {
  weatherData: any;
  searchCityName: string = '';
  defaultCity: string = 'Hyderabad';
  constructor(
    private weatherService: WeatherService,
    private toastMessage:ToastrService
  ) {}
  ngOnInit(): void {
    this.getData(this.defaultCity);
  }

  onCitySearchChange(cityName: string): void {
    this.weatherService.setSearchCity(cityName);
  }
  getData(cityName: string): void {   
    if (!cityName.trim()){
      this.toastMessage.warning('Please enter a city name.');
      return
    }  ;
    this.weatherService
      .getWeatherForecast(cityName)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.weatherData = res;
          this.searchCityName = '';
          this.weatherService.setSearchCity(res);
        },
      });
  }
}
