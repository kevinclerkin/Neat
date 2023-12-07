import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor],
    });

    interceptor = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept the request', () => {
    const req = new HttpRequest('GET', 'https://example.com');
    const next: HttpHandler = {
      handle: (request) => {
        expect(request).toBeTruthy();
        return null!;
      },
    };

    interceptor.intercept(req, next);
  });
});
