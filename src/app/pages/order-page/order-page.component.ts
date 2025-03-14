import { Component, OnInit } from '@angular/core';
import { API } from '../../services/API';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Restaurant, Category, Recipe } from './interface';
import { FilterByCategoryPipe } from '../../pipes/filterByCategory/filter-by-category.pipe';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [CommonModule, HeaderComponent, FilterByCategoryPipe]
})
export class OrderPageComponent implements OnInit {
  public categories: Category[] = [];
  public restaurant: Restaurant | null = null;
  public recipes: Recipe[] = [];
  public title?: string;
  public logo?: string;
  public product?: Recipe;
  public selectedCategory?: Category;
  /*public order = []; */

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

}

