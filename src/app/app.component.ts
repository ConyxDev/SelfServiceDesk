import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { WelcomeComponent } from './components/welcome/welcome-component.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderPageComponent, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  
}
