import { Component, signal } from '@angular/core';
import { SliderComponent, type SliderMark } from '../slider.component';

@Component({
  selector: 'demo-slider-with-marks',
  standalone: true,
  imports: [SliderComponent],
  template: `
    <div class="w-72 pb-6">
      <n-slider
        [(nValue)]="value"
        [nMarks]="marks"
        [nStep]="25"
        nLabel="Intensity"
      />
    </div>
  `,
})
export class SliderWithMarksDemo {
  value = signal<number>(50);

  marks: SliderMark[] = [
    { value: 0,   label: 'Off'    },
    { value: 25,  label: 'Low'    },
    { value: 50,  label: 'Medium' },
    { value: 75,  label: 'High'   },
    { value: 100, label: 'Max'    },
  ];
}
