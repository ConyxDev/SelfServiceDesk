import { Component } from '@angular/core';
import { API } from '../../services/API';
import { NgFor, CommonModule } from '@angular/common';

//interface to do
interface Category {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  recipes: any[];
}

interface Restaurant {
  title: string;
  description: string;
  photo: string;
  etaRange: string;
  location: string;
}

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [NgFor, CommonModule]
})
export class OrderPageComponent {
  categories: Category[] = []; //interface to do
  restaurant: Restaurant = {} as Restaurant ;
  products: any[] = [];
  recipes: any[] = [];

  constructor() {
    this.getRecipes();
  }

  getRecipes() {
      new API().getRecipes().then((data) => {
      this.categories = data.data;
      this.restaurant = data;
      this.products = data.data.recipes;
      console.log('categories', this.categories);
      console.log('restaurant', this.restaurant);
      console.log('products', this.products);
    });
  }



}
