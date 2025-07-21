import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { DayTimePipe } from '../../pipes/day-time-pipe';
import { WeatherService } from '../../Services/weather-service';
import { ToastrService } from 'ngx-toastr';
import { IweatherApiResponse } from '../../iWeatherData';

@Component({
  selector: 'app-left-container',
  imports: [FormsModule, CommonModule, DayTimePipe],
  templateUrl: './left-container.html',
  styleUrl: './left-container.scss',
})
export class LeftContainer implements OnInit {
  weatherData: IweatherApiResponse| undefined|null;
  searchCityName: string = '';
  defaultCity: string = 'Hyderabad';
  errorMessage:string='';
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
      .getWeatherForecast(cityName.trim())
      .pipe(take(1))
      .subscribe({
        next: (res:IweatherApiResponse) => {
          this.weatherData = res;
          this.searchCityName = '';
          this.errorMessage='';
          this.weatherService.setSearchCity(res.location.name);
        },
        error:(error)=>{
          this.errorMessage=error?.error?.error.message;
        }
      });
  }
}
