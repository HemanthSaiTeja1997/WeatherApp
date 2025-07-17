import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../Services/weather-service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-left-container',
  imports: [FormsModule],
  templateUrl: './left-container.html',
  styleUrl: './left-container.scss'
})
export class LeftContainer{
  weatherData:any;
  searchCityName:string='';
constructor(private weatherService:WeatherService){}


onCitySearchChange(cityName: string): void {
    this.weatherService.setSearchCity(cityName);
  }
  getData(cityName: string): void {
  if (!cityName.trim()) return;

  this.weatherService.getWeatherForecast(cityName).subscribe({
    next: (res) => {
      this.weatherData = res;
      console.log(">>>>>>",this.weatherData);
      
      this.weatherService.setSearchCity(res); // 🔁 Share data to other components
    },
    error: (err) => {
      console.error('API Error:', err);
      this.weatherData = null;
    },
  });
}

}
