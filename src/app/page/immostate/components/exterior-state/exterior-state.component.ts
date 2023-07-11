import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-exterior-state',
  templateUrl: './exterior-state.component.html',
  styleUrls: ['./exterior-state.component.scss'],
})
export class ExteriorStateComponent {
  step!: FormGroup;
  selectedItem: string = '';
  constructor(private _fb: FormBuilder) {}
  kitchenSelect: string[] = ['équipée', 'non équipée', 'sans cuisine'];
  ngOnInit(): void {
    this.step = this._fb.group({
      garden: [false],
      pool: [false],
      terrace: [false],
      garage: [false],
      parking: [false],
      courtyard: [false],
      commonOutdoorSpaces: [false],
      exteriorSurface: [0],
    });
  }

  stepSubmit() {
    if (this.step.valid) {
      console.log(this.step.value);
    }
  }
}
