import { Component } from '@angular/core';
import { TranslateComponent } from './components/translate/translate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year = new Date().getFullYear();
}
