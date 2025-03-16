import { Component, OnInit } from '@angular/core';
import { API } from '../../services/API';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Restaurant, Category, Recipe } from './interface';
import { FilterByCategoryPipe } from '../../pipes/filterByCategory/filter-by-category.pipe';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [CommonModule, HeaderComponent, FilterByCategoryPipe]
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
  public cartService: CartService = new CartService();
  public quantity: number = 0;
  public productPrice: number = 0;

ngOnInit(): void {
      new API().getRecipes().then((data) => {
      this.categories = data.data;
      this.product = data.data.recipes;
      this.restaurant = data;
      this.title = this.restaurant?.title;
      this.logo = this.restaurant?.photo;
      this.selectedCategory = this.categories[0];
      console.log(this.product);
      
    });
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  addToCart(product: Recipe) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Recipe) {
    this.cartService.removeFromCart(product);
  }
}

