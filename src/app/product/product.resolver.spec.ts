import { TestBed } from '@angular/core/testing';

import { ProductResolver } from './product.resolver';

describe('ProductResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductResolver = TestBed.get(ProductResolver);
    expect(service).toBeTruthy();
  });
});
