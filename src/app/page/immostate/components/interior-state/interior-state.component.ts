import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interior-state',
  templateUrl: './interior-state.component.html',
  styleUrls: ['./interior-state.component.scss'],
})
export class InteriorStateComponent {
  step!: FormGroup;
  selectedItem: string = '';
  constructor(private _fb: FormBuilder) {}
  kitchenSelect: string[] = ['équipée', 'non équipée', 'sans cuisine'];
  ngOnInit(): void {
    this.step = this._fb.group({
      room: [0],
      floor: [0],
      bedrooms: [0],
      bathrooms: [0],
      livingRoom: [false],
      diningRoom: [false],
      balcony: [false],
      kitchenType: [''],
      insideSurface: [''],
    });
  }

  stepSubmit() {
    if (this.step.valid) {
      console.log(this.step.value);
    }
  }
}
