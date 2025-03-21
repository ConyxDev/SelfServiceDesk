import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { bitcoinResolver } from './bitcoin.resolver';

describe('bitcoinResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => bitcoinResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
