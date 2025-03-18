import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './welcome-component.component.html',
  styleUrl: './welcome-component.component.css'
})
export class WelcomeComponent {

  @Input() public welcomeTitle: string = 'Welcome';
  @Output() public welcomeClick: EventEmitter<string> = new EventEmitter();
  public welcomeForm: FormGroup;

  constructor() {
    this.welcomeForm = new FormGroup({
      titleWelcome: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])
    });
  }

  emitEvent() {
    console.log('Welcome clicked');
    this.welcomeClick.emit();
  }






}
