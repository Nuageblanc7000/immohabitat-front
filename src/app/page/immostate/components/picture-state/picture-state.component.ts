import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStateStep, Iimages } from 'src/app/interfaces/IstateStep.interface';
import { PropertyService } from 'src/app/services/property.service';
import { StepService } from 'src/app/services/step.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-picture-state',
  templateUrl: './picture-state.component.html',
  styleUrls: ['./picture-state.component.scss'],
})
export class PictureStateComponent {
  constructor(
    private _fb: FormBuilder,
    private _stepService: StepService,
    private _propertyService: PropertyService
  ) {}
  private stateStep: IStateStep = this._stepService.stateStep.getValue();
  fileSize: number = 2000000;
  typeAuthorize: string[] = ['image/jpeg', 'image/jpg', 'image/png'];
  uploadedFiles: File[] = this.stateStep?.images
    ? [...this.stateStep?.images]
    : [];
  step!: FormGroup;
  counterFile: number = 0;

  ngOnInit(): void {
    this.step = this._fb.group({
      images: [this.uploadedFiles],
    });

    this.counterFile = this.uploadedFiles.length;
  }

  onFileSelect(event: UploadEvent) {
    for (const file of event.files) {
      if (file.size > this.fileSize || !this.typeAuthorize.includes(file.type))
        return;
    }
    this.uploadedFiles = [...this.uploadedFiles, ...event.files];
    this.step?.get('images')?.setValue(this.uploadedFiles);
    this.counterFile = this.uploadedFiles.length;
  }

  removeFile(fileToRemove: File) {
    console.log(this.uploadedFiles);
    this.uploadedFiles = this.uploadedFiles.filter(
      (file: File) => file.name !== fileToRemove.name
    );
    this.step?.get('images')?.setValue(this.uploadedFiles);
    this.counterFile = this.uploadedFiles.length;
  }

  removeAllFiles() {
    this.uploadedFiles = [];
    this.step?.get('images')?.setValue(this.uploadedFiles);
    this.counterFile = this.uploadedFiles.length;
  }

  stepSubmit() {
    this._stepService.stateStep.next({ ...this.stateStep, ...this.step.value });

    if (this.step.valid) {
      this._stepService.stepFive(this.step.value).subscribe({
        next: (p) => {
          console.log(p);
          this._propertyService
            .create(this._stepService.stateStep.getValue())
            .subscribe({
              next: (p) => console.log(p),
            });
        },
      });
    }
  }
}
