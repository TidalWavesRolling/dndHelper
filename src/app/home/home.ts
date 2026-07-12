import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CountUpDirective } from '../count-up-directive/count-up-directive';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [CountUpDirective, SplitterModule, CardModule, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  targetNumber: number = 5000;
  animationDuration: number = 2.5;

  add5000() {
    this.targetNumber += 5000;
    console.log(this.targetNumber);
  }
}
