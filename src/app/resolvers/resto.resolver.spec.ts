import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { restoResolver } from './resto.resolver';

describe('restoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => restoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
