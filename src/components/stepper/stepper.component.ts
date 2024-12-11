import { AfterContentChecked, Component, ContentChildren, QueryList } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { StepComponent } from './step/step.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements AfterContentChecked {

  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>;

  constructor() {
    interval(1000).subscribe(() => {
      this.next();
    });
  }

  ngAfterContentChecked(): void {
    this.steps.forEach((step, index) => {
      step.index = index;
      step.changeRef.detectChanges();
    });
  }

  prev() {
    const current = this.currentIndex.value;
    const newIndex = current === 0 ? this.steps.length - 1 : current - 1;
    this.currentIndex.next(newIndex);
  }

  next() {
    const current = this.currentIndex.value;
    const newIndex = current + 1 === this.steps.length ? 0 : current + 1;
    this.currentIndex.next(newIndex);
  }
}
