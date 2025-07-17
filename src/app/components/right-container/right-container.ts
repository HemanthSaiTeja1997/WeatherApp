import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-right-container',
  imports: [MatButtonModule,MatCardModule,CommonModule],
  templateUrl: './right-container.html',
  styleUrl: './right-container.scss'
})
export class RightContainer {
  today:boolean = false;
  week:boolean = true;

  onTodayClick():void{
    this.today=true;
    this.week=false;
  }
onWeekClick():void{
  this.week=true;
  this.today=false;
}
}
