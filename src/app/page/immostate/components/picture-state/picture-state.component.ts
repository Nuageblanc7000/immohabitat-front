// import { Component } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-picture-state',
//   templateUrl: './picture-state.component.html',
//   styleUrls: ['./picture-state.component.scss'],
// })
// export class PictureStateComponent {
//   step!: FormGroup;
//   counterFile: number = 0;
//   constructor(private _fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.step = this._fb.group({
//       files: this._fb.array([]),
//     });
//   }
//   get files() {
//     return this.step?.get('files') as FormArray;
//   }
//   stepSubmit() {}
//   fileSize: number = 2000000;
//   uploadedFiles: any[] = [];
//   onUpload(e: UploadEvent) {
//     console.log(e.files);
//   }
//   addFile() {
//     const fileGroup = this._fb.group({
//       file: [null], // Ajoutez ici des validations ou des valeurs par défaut si nécessaire
//     });
//     if (this.files.length < 8) {
//       this.files.push(fileGroup);
//       this.counterFile = this.files.length;
//       console.log(this.counterFile);
//     }
//   }
//   deleteFile(index: number) {
//     this.files.removeAt(index);

//     this.counterFile = this.files.length;
//   }
// }
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IStateStep, Iimages } from 'src/app/interfaces/IstateStep.interface';
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
  constructor(private _fb: FormBuilder, private _stepService: StepService) {}
  private stateStep: IStateStep = this._stepService.stateStep.getValue();
  fileSize: number = 2000000;
  uploadedFiles: File[] = this.stateStep?.images
    ? [...this.stateStep?.images]
    : [];
  step!: FormGroup;
  counterFile: number = 0;

  ngOnInit(): void {
    this.step = this._fb.group({
      images: [this.uploadedFiles],
    });
  }

  ngAfterViewInit() {
    if (this.uploadedFiles.length > 0) {
      console.log('ok');
    }
  }
  onFileSelect(event: UploadEvent) {
    this.uploadedFiles = [...this.uploadedFiles, ...event.files];
    console.log(this.uploadedFiles);
    this.step?.get('images')?.setValue(this.uploadedFiles);
  }

  removeFile(event: any) {
    const removedFile = event.file;
    this.uploadedFiles = this.uploadedFiles.filter(
      (file: File) => file !== removedFile
    );
    this.step?.get('images')?.setValue(this.uploadedFiles);
  }

  removeAllFiles() {
    this.uploadedFiles = [];
    this.step?.get('images')?.setValue(this.uploadedFiles);
  }

  stepSubmit() {
    this._stepService.stateStep.next({ ...this.stateStep, ...this.step.value });
    console.log(this._stepService.stateStep.getValue());
  }
}
