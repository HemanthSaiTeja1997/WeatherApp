import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData:any;
  private baseUrl=environment.weatherapi;
  private apiKey=environment.weatherApiKey;
  private citySearchSubject = new BehaviorSubject<string>('');
  citySearch$ = this.citySearchSubject.asObservable();

  constructor(private _http:HttpClient){}
  setSearchCity(city: string) {
    this.citySearchSubject.next(city);
  }
  getWeatherForecast(city: string, days:number = 7): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=${days}&aqi=yes&alerts=yes`;
    return this._http.get(url);
  }
 
}
