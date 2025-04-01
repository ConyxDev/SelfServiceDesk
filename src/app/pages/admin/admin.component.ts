import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { Order } from '../order-page/interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public readonly orders$: Observable<Order[]>;


  constructor(private readonly _firestoreService: FirestoreService) {
    this.orders$ = this._firestoreService.order$;
  }

  async deleteOrder(order$: any) {
    await this._firestoreService.deleteOrder(order$);
  }
}

