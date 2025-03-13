import { Component, OnInit } from '@angular/core';
import { API } from '../../services/API';
import { NgFor, CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

interface Category {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  recipes: Product[];
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
  imports: [CommonModule, HeaderComponent]
})
export class OrderPageComponent implements OnInit {
  categories: Category[] = []
  restaurant: Restaurant = {} as Restaurant ;
  products: Product[] = [];
  recipes: Product[] = [];
/*   categories: Category[]; */
  title?: string;
  logo?: string;
  

ngOnInit(): void {
      new API().getRecipes().then((data) => {
      this.categories = data.data;
      this.restaurant = data;
      this.title = this.restaurant.title;
      this.logo = this.restaurant.photo;
      this.recipes = data.data.flatMap((category: any) => category.recipes);
      console.log('categories', this.categories);
      console.log('restaurant', this.restaurant);
      console.log('recipes', this.recipes);
    });
  }


}

