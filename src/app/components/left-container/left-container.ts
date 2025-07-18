import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../Services/weather-service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DayTimePipe } from '../../pipes/day-time-pipe';

@Component({
  selector: 'app-left-container',
  imports: [FormsModule,CommonModule,DayTimePipe],
  templateUrl: './left-container.html',
  styleUrl: './left-container.scss'
})
export class LeftContainer implements OnInit{
  weatherData:any;
  searchCityName:string='';
  defaultCity:string='';
constructor(private weatherService:WeatherService){}
  ngOnInit(): void {
    this.getData(this.defaultCity);
  }


onCitySearchChange(cityName: string): void {
    this.weatherService.setSearchCity(cityName);
  }
  getData(cityName: string): void {
  if (!cityName.trim()) return;
  this.weatherService.getWeatherForecast(cityName).subscribe({
    next: (res) => {
      this.weatherData = res;
      console.log(">>>>>>",this.weatherData);
      this.searchCityName=''
      this.weatherService.setSearchCity(res);
    },
    error: (err) => {
      console.error('API Error:', err);
      this.weatherData = null;
    },
  });
}

}
