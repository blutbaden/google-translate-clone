import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchLanguage', standalone: true })
export class SearchLanguagePipe implements PipeTransform {
  transform(
    languages: { code: string; name: string; nativeName: string }[],
    searchText: string | null | undefined
  ): { code: string; name: string; nativeName: string }[] {
    if (!searchText) return languages;
    const lower = searchText.toLowerCase();
    return languages.filter(lang => lang.name.toLowerCase().includes(lower));
  }
}
