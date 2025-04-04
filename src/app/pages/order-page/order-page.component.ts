import { Component, OnInit } from '@angular/core';
import { API } from '../../services/API';
import { CommonModule } from '@angular/common';
import { Restaurant, Category, Recipe, OrderDetails } from './interface';
import {
  ReactiveFormsModule,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/orderService';
import { Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { IonHeader, IonContent, IonCol, IonGrid, IonModal, IonRow, IonText, IonButton, IonItem, IonList, IonAvatar, IonLabel, IonCard, IonCardContent } from '@ionic/angular/standalone';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterModule,
    IonContent,
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonRow,
    IonButton,
    IonAvatar,
    IonLabel,

  ],
})
export class OrderPageComponent implements OnInit {
  public categories?: Category[];
  public restaurant?: Restaurant;
  public recipes?: Recipe[];
  public title?: string;
  public logo?: string;
  public product?: Recipe;
  public selectedCategory?: Category;
  public readonly categories$: Observable<Restaurant | null>;
  public cartItems?: Recipe[] = [];
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public productPrice: number = 0;
  public minOrder: boolean = false;
  public orderDetails: OrderDetails[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    public _orderService: OrderService,
    private readonly _api: API,
    private readonly _firestore: Firestore,
    private readonly _firestoreService: FirestoreService
  ) {
    this.categories$ = this._api.data$;
  }

  async ngOnInit() {
    console.log('ngOnInit');
    const resultFromResolver = this._route.snapshot.data['resto'];
    console.log(resultFromResolver);
    const result: Restaurant = resultFromResolver;
    this.categories = result.data;
    this.product = result.data[0].recipes[0];
    this.title = result.title;
    this.logo = result.photo;
    this.selectedCategory = this.categories[0];

    /*         const foodSuppResult: any = this._route.snapshot.data['food'];
        const resultFoodSupp: any = foodSuppResult;
        console.log(resultFoodSupp); */
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  public minOrderValidator = (control: AbstractControl) => {
    const minOrder = this.totalPrice >= 10;
    return minOrder ? null : { minOrder: true };
  };

  public order = new FormArray(
    [] as any,
    Validators.compose([
      this.minOrderValidator,
      Validators.required,
      Validators.minLength(1),
    ])
  );

// A FINIR +  CART
  public addToOrder(product: Recipe) {
    this._orderService.addToOrder(product);
    this.cartItems?.push(product);
    console.log(this._orderService.order.value);
  }

  async saveOrder() {
    const order = this._orderService.order.value;
    await this._firestoreService.saveOrder(order);
    alert('Order saved');
    /*   this._orderService.order.next([] */
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }
}
