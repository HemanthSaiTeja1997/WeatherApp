import { Component } from '@angular/core';
import { LeftContainer } from '../left-container/left-container';
import { RightContainer } from '../right-container/right-container';

@Component({
  selector: 'app-home',
  imports: [
    LeftContainer,
    RightContainer
    ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
