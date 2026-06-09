import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateComponent } from './translate.component';

describe('TranslateComponent', () => {
  let component: TranslateComponent;
  let fixture: ComponentFixture<TranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        provideToastr()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no source or destination language selected by default', () => {
    expect(component.sourceLanguage).toBeUndefined();
    expect(component.destinationLanguage).toBeUndefined();
  });

  it('checkBeforeTranslate should return false when languages are not selected', () => {
    expect(component.checkBeforeTranslate('hello')).toBeFalse();
  });
});
