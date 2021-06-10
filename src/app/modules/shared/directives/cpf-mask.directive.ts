import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  public previousValue = '';
  constructor(private el: ElementRef) {}
  static createMask(cpf: string): string {
    let newVal = cpf.replace(/\D/g, '');

    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(.*)/, '$1.$2');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '$1.$2.$3');
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(.*)/, '$1.$2.$3-$4');
    }

    return newVal;
  }
  @HostListener('input')
  setMask(): void {
    const mask = CpfMaskDirective.createMask(this.el.nativeElement.value);
    if (this.el.nativeElement.value !== this.previousValue) {
      this.el.nativeElement.value = mask;
      this.previousValue = mask;
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.setMask(), 0);
  }

}
