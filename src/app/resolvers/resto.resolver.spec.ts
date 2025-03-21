import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { restoResolver } from './resto.resolver';
import { Restaurant } from '../pages/order-page/interface';

describe('restoResolver', () => {
  const executeResolver: ResolveFn<Restaurant> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => restoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
