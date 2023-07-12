import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IStateStep } from 'src/app/interfaces/IstateStep.interface';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-exterior-state',
  templateUrl: './exterior-state.component.html',
  styleUrls: ['./exterior-state.component.scss'],
})
export class ExteriorStateComponent {
  constructor(private _fb: FormBuilder, private _stepService: StepService) {}
  step!: FormGroup;
  private stepstate: IStateStep = this._stepService.stateStep.getValue();
  ngOnInit(): void {
    this.step = this._fb.group({
      garden: [this.stepstate?.garden],
      pool: [this.stepstate?.pool],
      terrace: [this.stepstate?.terrace],
      garage: [this.stepstate?.garage],
      parking: [this.stepstate?.parking],
      courtyard: [this.stepstate?.courtyard],
      commonOutdoorSpaces: [this.stepstate?.commonOutdoorSpaces],
      outsideSurface: [this.stepstate?.outsideSurface],
    });
  }

  stepSubmit() {
    if (this.step.valid) {
      this._stepService.stateStep.next({
        ...this.stepstate,
        ...this.step.value,
      });
      this._stepService.stepFour(this.step.value).subscribe({
        next: (p: any) => {
          console.log(p);
        },
      });
    }
  }
}
