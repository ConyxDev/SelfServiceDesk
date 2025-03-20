import { ResolveFn } from '@angular/router';
import { BitCoinHttp } from '../services/BitCoinApi';
import { inject } from '@angular/core';

export const bitcoinResolver: ResolveFn<any> = async (route, state) => {
  const bitcoin = await inject (BitCoinHttp).getBitCoin();
  return bitcoin;
};
