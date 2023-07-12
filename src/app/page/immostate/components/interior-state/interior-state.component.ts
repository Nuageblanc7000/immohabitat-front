import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStateStep } from 'src/app/interfaces/IstateStep.interface';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-interior-state',
  templateUrl: './interior-state.component.html',
  styleUrls: ['./interior-state.component.scss'],
})
export class InteriorStateComponent {
  constructor(private _fb: FormBuilder, private _stepService: StepService) {}
  step!: FormGroup;
  private stepstate: IStateStep = this._stepService.stateStep.getValue();
  selectedItem: string = this.stepstate.kitchenType;
  kitchenSelect: string[] = ['équipée', 'non équipée', 'sans cuisine'];
  ngOnInit(): void {
    this.step = this._fb.group({
      room: [this.stepstate?.room ?? 0],
      floor: [this.stepstate?.floor ?? 0],
      bedrooms: [this.stepstate?.bedrooms ?? 0],
      bathrooms: [this.stepstate?.bathrooms ?? 0],
      livingRoom: [this.stepstate?.livingRoom ?? false],
      diningRoom: [this.stepstate?.diningRoom ?? false],
      balcony: [this.stepstate?.balcony ?? false],
      kitchenType: [this.stepstate?.kitchenType],
      insideSurface: [this.stepstate?.insideSurface ?? 0],
    });
  }

  stepSubmit() {
    if (this.step.valid) {
      console.log(this.step.value);
      this._stepService.stateStep.next({
        ...this.stepstate,
        ...this.step.value,
      });
      this._stepService.stepThree(this.step.value).subscribe({
        next: (p: any) => {
          console.log(p);
        },
      });
    }
  }
}
