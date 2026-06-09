import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[copy-clipboard]', standalone: true })
export class CopyClipboardDirective {
  @Input('copy-clipboard')
  public payload = '';

  @Output('copied')
  public copied = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.payload) return;

    navigator.clipboard.writeText(this.payload).then(
      () => this.copied.emit(this.payload),
      () => console.warn('Clipboard write failed — page may not be served over HTTPS.')
    );
  }
}
