import { Injectable } from '@angular/core';
import { Recipe } from "../pages/order-page/interface";

export interface CartItem {
  product: Recipe;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
    public cartItems: CartItem[] = [];
    public totalPrice: number = 0;
    public quantity: number = 0;

    addToCart(product: Recipe) {
        const existingItem = this.cartItems.find(item => item.product.uuid === product.uuid);
        if (existingItem) {
            existingItem.quantity += 1;
            this.totalPrice += product.price;
            this.quantity++;
        } else {
            this.cartItems.push({ product, quantity: 1 });
            this.totalPrice += product.price;
            this.quantity++;
        }
    }

    removeFromCart(product: Recipe) {
        this.cartItems = this.cartItems.filter(item => item.product.uuid !== product.uuid);
        this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        this.quantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }
}
