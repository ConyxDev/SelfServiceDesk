import { Component, OnInit } from '@angular/core';
import { API } from '../../services/API';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Restaurant, Category, Recipe, OrderProduct } from './interface';
import { FilterByCategoryPipe } from '../../pipes/filterByCategory/filter-by-category.pipe';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from '../../components/welcome/welcome-component.component';
import { BitCoinHttp } from '../../services/BitCoinApi';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [CommonModule,WelcomeComponent, HeaderComponent, FilterByCategoryPipe, ReactiveFormsModule, FormsModule],
})
export class OrderPageComponent implements OnInit {
  public categories: Category[] = [];
  public restaurant?: Restaurant;
  public recipes: Recipe[] = [];
  public title?: string;
  public logo?: string;
  public product?: Recipe;
  public selectedCategory?: Category;
  public cartItems: Recipe[] = [];
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public productPrice: number = 0;
  public minOrder: boolean = false;
  public bitCoinPrice?: number;


constructor (
  private readonly _APIservice: API,
  private readonly _Bitcoinservice: BitCoinHttp
) { }


ngOnInit(): void {
      this._APIservice.getHttpClient().then((data) => {
      this.categories = data.data;
      this.product = data.data[0].recipes[0];
      this.restaurant = data;
      this.title = this.restaurant?.title;
      this.logo = this.restaurant?.photo;
      this.selectedCategory = this.categories[0];
      console.log(this.product);
      
    });
      this._Bitcoinservice.getBitCoin().then((market_data) => {
        console.log(market_data);
        const bitCoinPrice = market_data.market_data.current_price.chf;
        console.log(bitCoinPrice);
        this.bitCoinPrice = bitCoinPrice;
      })
  }



  selectCategory(category: Category) {
    this.selectedCategory = category;
  }



public minOrderValidator = (control: AbstractControl) => {
  const minOrder = this.totalPrice >= 10;
  return minOrder ? null : { minOrder: true };
}



public order = new FormArray([] as any, Validators.compose([
  this.minOrderValidator,
  Validators.required,
  Validators.minLength(1),

]));

addToOrder(product: Recipe) {
  const productIndex = this.order.value.findIndex((r: any)=>{
    return r.uuid === product.uuid;
  });
  if(productIndex >= 0) {
    const existingItem = this.order.at(productIndex) as FormGroup;
    const newQuantity = existingItem.value.quantity + 1;
    existingItem.patchValue({
      quantity: newQuantity,
    });
  } else {
    const newGroup = new FormGroup({
      title: new FormControl(product.title, Validators.required),
      uuid: new FormControl(product.uuid),
      price: new FormControl(product.price),
      quantity: new FormControl(1, Validators.compose([
        Validators.min(1),
      ])),
    })
    this.order.push(newGroup);
    console.log(this.order);
  }
  this.updateTotal();
}
  public updateTotal() {
    this.totalPrice = this.order.value.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    this.totalQuantity = this.order.value.reduce((acc: number, item: any) => acc + item.quantity, 0);
    this.minOrder = this.totalPrice >= 10 ? false : true;
  }
}