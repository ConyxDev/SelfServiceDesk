import { Component, Output, EventEmitter, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  imports: [],
  templateUrl: './welcome-component.component.html',
  styleUrl: './welcome-component.component.css'
})
export class WelcomeComponent {

  @Input() public welcomeTitle: string = 'Welcome';
  @Output() public welcomeClick: EventEmitter<string> = new EventEmitter();

  emitEvent() {
    console.log('Welcome clicked');
    this.welcomeClick.emit();
  }

}
