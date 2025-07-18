import { WeekDay } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayTime'
})
export class DayTimePipe implements PipeTransform {

  transform(value: string,format: 'timeOnly' | 'dayTime' | 'day' | 'today'= 'dayTime'): string {
    if(!value) {
      return '';
    }
    const date = new Date(value);
    const day = date.toLocaleDateString('en-us',{weekday:'long'});
    const dayshort = date.toLocaleDateString('en-us',{weekday:'short'});
    const whatDate=date.getDate();

     const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    if (format === 'timeOnly') {
      return `${hour} ${ampm}`;
    }
    else  if (format === 'day') {
      return `${whatDate} ${dayshort}`;
    }
      else  if (format === 'today') {
      return `${whatDate} ${day}`;
    }

    return `${whatDate} ${day}  ${hour}:${minute} ${ampm}`;
  
  }

}
