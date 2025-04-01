import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { foodResolver } from '../food.resolver';

describe('foodResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => foodResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
