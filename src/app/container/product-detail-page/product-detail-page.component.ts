import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { API } from '../../services/API';
import { Recipe, Restaurant } from '../../pages/order-page/interface';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/orderService';
import { IonContent, IonButton, IonRow, IonCol } from '@ionic/angular/standalone';


@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule,RouterModule,IonContent,IonButton,IonRow,IonCol],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit {
    
  
  public recipe: Recipe | undefined ;
  public recipes?: Recipe[];
  public product?: string;
  public title?: string;
  public price?: number;


  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    public orderService: OrderService
  ) {}

  




  async ngOnInit() {
    const uuid = this._route.snapshot.params['uuid'];
    const dataFromResolver = this._route.snapshot.data['resto'];
    const resto: Restaurant = dataFromResolver;
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
