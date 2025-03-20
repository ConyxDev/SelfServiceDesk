import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from '../../services/API';
import { Recipe, Restaurant } from '../../pages/order-page/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit {
    public recipe: Recipe | undefined ;
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
  ) {}

  async ngOnInit() {
    const uuid = this._route.snapshot.params['uuid'];
    const dataFromResolver = this._route.snapshot.data['resto'];
    const resto: Restaurant = dataFromResolver.resto;
    const category = resto.data.find(c => c.recipes.find(r => r.uuid === uuid))
    const recipe = category?.recipes.find(r => r.uuid === uuid);
    this.recipe = recipe;
      if (!this.recipe) {
        this._router.navigate(['/order']);
        alert('Recipe not found')
      }
      console.log(recipe);
     
  }



}
