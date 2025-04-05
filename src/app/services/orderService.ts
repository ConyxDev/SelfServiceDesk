import { Injectable } from "@angular/core";
import { Recipe } from "../pages/order-page/interface";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    public order = new FormArray<FormGroup>([]);
    public totalPrice: number = 0;
    public totalQuantity: number = 0;
    public minOrder: boolean = false;

    addToOrder(product: Recipe) {
        const productIndex = this.order.value.findIndex((r: any)=>{
          return r.uuid === product.uuid;
        });
        if(productIndex >= 0) {
          const existingItem = this.order.at(productIndex) as FormGroup;
          const newQuantity = existingItem.value.quantity + 1;
          existingItem.patchValue({
            quantity: newQuantity,
          });
        } else {
          const newFormGroup = new FormGroup({
            title: new FormControl(product.title, Validators.required),
            uuid: new FormControl(product.uuid),
            price: new FormControl(product.price),
            quantity: new FormControl(1, Validators.compose([
              Validators.min(1),
            ])),
          })
          this.order.push(newFormGroup);
          console.log(this.order);
        }
        this.updateTotal();
    }

    public removeFromOrder(product: Recipe) {
      const productIndex = this.order.value.findIndex((r: any) =>{
        return r.uuid === product.uuid;
      });
      if(productIndex >= 0) {
        const existingItem = this.order.at(productIndex) as FormGroup;
        const newQuantity = existingItem.value.quantity - 1;
        if(newQuantity > 0) {
          existingItem.patchValue({
            quantity: newQuantity,
          });
        } else {
          this.order.removeAt(productIndex);
        }
        this.updateTotal();
      }

    }


    public updateTotal() {
        this.totalPrice = this.order.value.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
        this.totalQuantity = this.order.value.reduce((acc: number, item: any) => acc + item.quantity, 0);
        this.minOrder = this.totalPrice >= 10 ? false : true;
    }

    public resetOrder() {
        this.order.clear();
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.minOrder = false;
    }
}


