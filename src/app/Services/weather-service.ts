import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { IweatherApiResponse } from '../iWeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData: IweatherApiResponse | undefined | null;
  private baseUrl = environment.weatherapi;
  private apiKey = environment.weatherApiKey;
  private citySearchSubject = new BehaviorSubject<string>('Hyderabad');
  citySearch$ = this.citySearchSubject.asObservable();

  constructor(private _http: HttpClient) { }
  setSearchCity(city: string): void {
    if (city && city.trim()) {
      this.citySearchSubject.next(city.trim());
    }
  }
  getWeatherForecast(city: string, days: number = 7): Observable<IweatherApiResponse> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=${days}&aqi=yes&alerts=yes`;
    return this._http.get<IweatherApiResponse>(url).pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Global Error Handler:', error);
    return throwError(() => error);
  }

}
