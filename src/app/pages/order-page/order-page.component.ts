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
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/orderService';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [CommonModule,WelcomeComponent, HeaderComponent, FilterByCategoryPipe, ReactiveFormsModule, FormsModule, RouterLink, RouterModule],
})
export class OrderPageComponent implements OnInit {
  public categories?: Category[];
  public restaurant?: Restaurant;
  public recipes?: Recipe[];
  public title?: string;
  public logo?: string;
  public product?: Recipe;
  public selectedCategory?: Category;
  public cartItems?: Recipe[] = [];
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public productPrice: number = 0;
  public minOrder: boolean = false;
  public bitCoinPrice?: number;
  public buyerTendance?: number;
  public sellerTendance?: number;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _Bitcoinservice: BitCoinHttp,
    public _orderService: OrderService
  ) { }


async ngOnInit() {
      console.log('ngOnInit');
      const resultFromResolver = this._route.snapshot.data['resto'];
      const result: Restaurant = resultFromResolver;
      this.categories = result.data;
      this.product = result.data[0].recipes[0];
      this.title = result.title;
      this.logo = result.photo;
      this.selectedCategory = this.categories[0];
  

        const bitcoinresult: any = this._route.snapshot.data['bitcoin'];
        const resultBitcoin: any = bitcoinresult.data;
        console.log(resultBitcoin);
        const bitCoinPrice = bitcoinresult.market_data.current_price.chf;
        const buyerTendance = bitcoinresult.sentiment_votes_up_percentage;
        const sellerTendance = bitcoinresult.sentiment_votes_down_percentage;
        console.log(buyerTendance);
        console.log(sellerTendance);
        console.log(bitCoinPrice);
        this.bitCoinPrice = bitCoinPrice;
        this.buyerTendance = buyerTendance;
        this.sellerTendance = sellerTendance;
  };


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
}
