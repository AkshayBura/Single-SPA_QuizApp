import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  @Input() isCorrect: Boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background',
        'rgba(0, 255, 38, 0.455)'
      );
      this.renderer.setStyle(
        this.el.nativeElement,
        'border',
        '2px solid green'
      );
      // this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    } else {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background',
        'rgba(255, 0, 0, 0.455)'
      );
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
      // this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    }
  }
}
