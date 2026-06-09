import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TranslateService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST to the translate endpoint', () => {
    service.translate('en', 'fr', 'hello').subscribe();

    const req = httpTesting.expectOne(r => r.url.includes('/language/translate/v2'));
    expect(req.request.method).toBe('POST');
    req.flush({ data: { translations: [{ translatedText: 'bonjour' }] } });
  });
});
