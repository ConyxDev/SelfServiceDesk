import { Component, OnInit, Input } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/orderService';
import { Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { IonHeader, IonContent, IonCol, IonGrid, IonModal, IonRow, IonText, IonButton, IonItem, IonList, IonAvatar, IonLabel, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { ProductDetailPageComponent } from '../../container/product-detail-page/product-detail-page.component';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IonModal,
    IonContent,
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonRow,
    IonButton,
    IonAvatar,
    IonLabel,
    ProductDetailPageComponent,
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
  public selectedProduct: Recipe | undefined;
  presentingElement!: HTMLElement | null;
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    public _orderService: OrderService,
    private readonly _api: API,
    private readonly _firestore: Firestore,
    private readonly _firestoreService: FirestoreService,
  ) {
    this.categories$ = this._api.data$;
  }

  async ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    const resultFromResolver = this._route.snapshot.data['resto'];
    const result: Restaurant = resultFromResolver;
    this.categories = result.data;
    this.product = result.data[0].recipes[0];
    this.title = result.title;
    this.logo = result.photo;
    this.selectedCategory = this.categories[0];

    /*         const foodSuppResult: any = this._route.snapshot.data['food'];
        const resultFoodSupp: any = foodSuppResult;
*/
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    setTimeout(() => {
      document.getElementById('category-' + category.uuid)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
  }

  public removeFromOrder(product: Recipe) {
    this._orderService.removeFromOrder(product);
    this.cartItems = this.cartItems?.filter(item => item.uuid !== product.uuid);
  }

  async saveOrder() {
    const order = this._orderService.order.value;
    await this._firestoreService.saveOrder(order);
    alert('Order saved');
    this._orderService.resetOrder();
    }
}

