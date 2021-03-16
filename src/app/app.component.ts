import { Component } from '@angular/core';
import { NgAuthService } from './services/ng-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Fire Make Better';

  constructor(public ngAuthService: NgAuthService) { }
}
