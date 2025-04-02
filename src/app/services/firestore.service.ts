import { Injectable } from '@angular/core';
import { OrderDetails } from '../pages/order-page/interface';
import { Firestore, collection, query, addDoc, collectionData, deleteDoc, doc, updateDoc, QueryConstraint, where } from '@angular/fire/firestore';
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
      }),
      tap((orders) => {
        console.log('>>>', orders);
/*         alert('nouvelle commande enregistrée'); */
      })
    );
  }

     private _getOrders$() {
      const colRef = collection(this._firestore, 'orders');
      const q = query(colRef);
      const data$ = collectionData(q, { idField: '_id'});
      const onlyNotDone: QueryConstraint = where('done', '!=', true);
      return data$ as Observable<Order[]>;
    }
  



async saveOrder(orderRecipes: OrderRecipe[]) {
  const colRef = collection(this._firestore, 'orders');
  const order: Omit<Order, '_id'> = {
    date: Date.now(),
    detail: orderRecipes,
    done: false,
  };
  await addDoc(colRef, order);
}

  async updateOrderStatus(orderId: string, done: boolean) {
    const docRef = doc(this._firestore, `orders/${orderId}`);
    await updateDoc(docRef, { done : true });
    await deleteDoc(docRef);
    console.log('commande supprimée');
    
  }


}


