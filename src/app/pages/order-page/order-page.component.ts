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

interface Product {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [NgFor, CommonModule]
})
export class OrderPageComponent {
  categories: Category[] = []
  restaurant: Restaurant = {} as Restaurant ;
  products: Product[] = [];
  recipes: Product[] = [];

  constructor() {
    this.getRecipes();
  }

  getRecipes() {
      new API().getRecipes().then((data) => {
      this.categories = data.data;
      this.restaurant = data;
      this.recipes = data.data.flatMap((category: any) => category.recipes);
      console.log('categories', this.categories);
      console.log('restaurant', this.restaurant);
      console.log('recipes', this.recipes);
    });
  }



}
