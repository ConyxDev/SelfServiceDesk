import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent {

  @Input() public title?: string;
  @Input() public logo?: string;

  emitEvent() {
    console.log('logo clicked');
  }

}
