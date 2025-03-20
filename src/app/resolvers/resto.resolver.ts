import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { API } from '../services/API';
import { Restaurant } from '../pages/order-page/interface';

export const restoResolver: ResolveFn<Restaurant> = async (route, state) => {
  const resto = await inject(API).getHttpClient();

  return resto;
};
