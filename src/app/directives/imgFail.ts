import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
})
export class ImageFallbackDirective {
  @Input() appImageFallback?: string; // Chemin vers l'image par défaut

  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  onError() {
    console.log('error');
    this.elementRef.nativeElement.src = this.appImageFallback;
  }
}
