import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EMPTY, fromEvent, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../../shared/services/translate.service';
import { languagesCodes } from '../../shared/data/languagesCodes';
import { SearchLanguagePipe } from '../../shared/pipes/search-language.pipe';
import { CopyClipboardDirective } from '../../shared/directives/CopyClipboardDirective';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [FormsModule, SearchLanguagePipe, CopyClipboardDirective],
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements AfterViewInit, OnDestroy {
  sourceLanguage: { code: string; name?: string; nativeName?: string } | undefined;
  destinationLanguage: { code: string; name?: string; nativeName?: string } | undefined;
  translatedText: string | undefined;
  languageToSearch: string | undefined;

  isLoading = false;
  isSelectLanguageBtnClicked = false;
  isSelectSourceBtnClicked = false;
  isError = false;
  errorMessage: string | undefined;

  languagesCodes: { code: string; name: string; nativeName: string }[] = languagesCodes;

  private sub: Subscription | undefined;

  @ViewChild('textToTranslateInput') input: ElementRef | undefined;

  constructor(
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    this.sub = fromEvent<Event>(this.input!.nativeElement, 'keyup').pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(text => this.getTranslation(text).pipe(
        catchError(error => {
          this.isError = true;
          this.isLoading = false;
          const { status } = error;
          this.errorMessage = status === 400
            ? 'Sorry, this language is not supported!'
            : 'An error has occurred! Please retry later.';
          return EMPTY;
        })
      ))
    ).subscribe({
      next: value => {
        this.translatedText = value;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getTranslation(textToTranslate: string) {
    if (this.checkBeforeTranslate(textToTranslate)) {
      this.isLoading = true;
      return this.translateService
        .translate(this.sourceLanguage?.code ?? '', this.destinationLanguage?.code ?? '', textToTranslate)
        .pipe(map(res => res.data.translations[0].translatedText as string));
    }
    this.isLoading = false;
    return EMPTY;
  }

  checkBeforeTranslate(textToTranslate: string): boolean {
    return !!(this.sourceLanguage && this.destinationLanguage && textToTranslate?.trim());
  }

  selectLanguage(language: { code: string; name: string; nativeName: string }): void {
    if (this.isSelectSourceBtnClicked) {
      this.sourceLanguage = language;
    } else {
      this.destinationLanguage = language;
    }
    this.isSelectLanguageBtnClicked = false;
    this.languageToSearch = '';
  }

  getLanguages(isSelectSourceBtnClicked: boolean): void {
    this.isSelectLanguageBtnClicked = !this.isSelectLanguageBtnClicked;
    this.isSelectSourceBtnClicked = isSelectSourceBtnClicked;
    this.languageToSearch = '';
  }

  isSelectedLanguage(languageCode: string): boolean {
    return this.isSelectSourceBtnClicked
      ? languageCode === this.sourceLanguage?.code
      : languageCode === this.destinationLanguage?.code;
  }

  notify(_payload: string): void {
    this.toastr.info('Copied to clipboard!');
  }

  reload(): void {
    location.reload();
  }
}
