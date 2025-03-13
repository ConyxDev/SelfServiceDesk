import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  imports: [],
  templateUrl: './welcome-component.component.html',
  styleUrl: './welcome-component.component.css'
})
export class WelcomeComponent {

  @Output() public welcomeClick: EventEmitter<string> = new EventEmitter();

  emitEvent() {
    console.log('Welcome clicked');
    this.welcomeClick.emit();
  }

}
