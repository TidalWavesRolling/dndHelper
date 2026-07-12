import { Directive, ElementRef, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CountUp } from 'countup.js';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, AfterViewInit, OnChanges {
  // Convert inputs to numbers safely in case the template passes them as strings
  @Input('appCountUp')
  set endVal(value: number | string) {
    this._endVal = Number(value) || 0;
  }
  get endVal(): number {
    return this._endVal;
  }
  private _endVal: number = 0;

  @Input()
  set duration(value: number | string) {
    this._duration = Number(value) || 2;
  }
  get duration(): number {
    return this._duration;
  }
  private _duration: number = 2; // in seconds

  private countUp: CountUp | undefined;
  private viewInitialized = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.countUp = new CountUp(this.el.nativeElement, this.endVal, {
      duration: this.duration,
      separator: ','
    });
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.startCount();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Ignore changes that fire before the view (and thus countUp) is ready —
    // ngOnInit/ngAfterViewInit already handle the initial value.
    if (!this.viewInitialized || !this.countUp) {
      return;
    }

    if (changes['endVal'] && !changes['endVal'].firstChange) {
      this.updateCount();
    }
  }

  private startCount() {
    if (!this.countUp?.error) {
      this.countUp?.start();
    } else {
      console.error(this.countUp.error);
    }
  }

  private updateCount() {
    if (!this.countUp?.error) {
      this.countUp?.update(this.endVal);
    } else {
      console.error(this.countUp.error);
    }
  }

  // Type hints for Angular template compiler
  static ngAcceptInputType_endVal: number | string;
  static ngAcceptInputType_duration: number | string;
}