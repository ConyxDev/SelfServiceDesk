import { Component } from '@angular/core';
import { API } from '../../services/API';



@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  recipes: any[] = [];
  restaurant: any = {};


  constructor() {
    this.getRecipes();
  }

  getRecipes() {
    new API().getRecipes().then((data) => {
      this.recipes = data.data;
      this.restaurant = data;
      console.log(this.recipes);
      console.log(this.restaurant);
    });
  }



}
