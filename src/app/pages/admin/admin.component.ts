import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { Order, OrderDetails } from '../order-page/interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public readonly orders$: Observable<Order[]>;
  public orderSelected: Order | undefined;


  constructor(private readonly _firestoreService: FirestoreService) {
    this.orders$ = this._firestoreService.order$.pipe(
    tap(orders => {
      alert(`il y a ${orders.length} une nouvelle commande`)
    })
  )};

  async deleteOrder(orderId: string, done: boolean) {
    await this._firestoreService.updateOrderStatus(orderId, done);
    alert('commande terminée');
  }

  async showDetails(orderId: string) {
    const orders = await firstValueFrom(this._firestoreService.order$);
    const order = orders.find(o => o._id === orderId);
    this.orderSelected = order;
  }
}

