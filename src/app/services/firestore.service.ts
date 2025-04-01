import { Injectable } from '@angular/core';
import { Firestore, collection, query, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, map, Observable, pipe, tap} from 'rxjs';
import { Order } from '../pages/order-page/interface';
import { OrderRecipe } from '../pages/order-page/interface';
import { API } from './API';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  private readonly _orders$: BehaviorSubject<Order[] | null> = new BehaviorSubject(null as any);
  public readonly order$: Observable<Order[]>;

  constructor(
    private readonly _firestore: Firestore,
    private readonly _api: API,
    ) {
      this.order$ = combineLatest([
      this._getOrders$(),
      this._api.data$
    ]).pipe(
      tap(([dataFromFirebase, dataFromHTTP]) => {
        console.log('>>>', dataFromFirebase);
        console.log('>>>', dataFromHTTP);
      }),
      map(([dataFromFirebase, dataFromHTTP]) => {
        if (!dataFromHTTP?.data) {
          console.warn('Pas de données HTTP disponibles');
          return dataFromFirebase;
        }

        const categoriesMap = dataFromHTTP.data.reduce((acc, category) => {
          if (category?.recipes) {
            category.recipes.forEach(recipe => {
              acc[recipe.uuid] = recipe;
            });
          }
          return acc;
        }, {} as { [uuid: string]: any });

        return dataFromFirebase.map(order => {
          if (!order?.detail) return order;
          
          const detail = order.detail.map((recipe: any) => {
            const recipeData = categoriesMap[recipe.uuid];
            if (!recipeData) {
              console.warn(`Pas de données pour la recette ${recipe.uuid}`);
              return recipe;
            }
            return {
              ...recipe,
              description: recipeData.description,
            };
          });

          return {
            ...order,
            detail,
          };
        });
        
      })
    )
     }

     private _getOrders$() {
      const colRef = collection(this._firestore, 'orders');
      const q = query(colRef);
      const data$ = collectionData(q, { idField: 'id'});
      return data$ as Observable<Order[]>;
    }
  



async saveOrder(orderRecipes: OrderRecipe[]) {
  const colRef = collection(this._firestore, 'orders');
  const order: Order = {
    date: Date,
    detail: orderRecipes,
  };
  await addDoc(colRef, order);
}

  async deleteOrder(orderId: string) {
    const docRef = doc(this._firestore, 'orders', orderId);
    await deleteDoc(docRef);
  }


}


