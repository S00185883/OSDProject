import { Component } from '@angular/core';
import { NgAuthService } from './services/ng-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title: string = 'Angular OSD Project';
  gotoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
