import { ResolveFn } from '@angular/router';
import { FoodAPI } from '../services/suppFoodFrApi';
import { inject } from '@angular/core';


export const foodResolver: ResolveFn<any> = async (route, state) => {

  const foodSupp = await inject (FoodAPI).getFoodApi();

  return foodSupp;
};
