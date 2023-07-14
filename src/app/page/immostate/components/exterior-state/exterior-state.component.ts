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
      garden: [this.stepstate?.garden ?? false],
      pool: [this.stepstate?.pool ?? false],
      terrace: [this.stepstate?.terrace ?? false],
      garage: [this.stepstate?.garage] ?? false,
      parking: [this.stepstate?.parking ?? false],
      courtyard: [this.stepstate?.courtyard ?? false],
      commonOutdoorSpaces: [this.stepstate?.commonOutdoorSpaces ?? false],
      outsideSurface: [this.stepstate?.outsideSurface] ?? false,
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
