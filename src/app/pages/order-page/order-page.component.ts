import { Component } from '@angular/core';
import { API } from '../../services/API';

//interface to do





@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  recipes: any[] = []; //interface to do
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
