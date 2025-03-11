import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
