import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  step!: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      files: this._fb.array([]),
    });
  }
  get files() {
    return this.step.get('files') as FormArray;
  }
  stepSubmit() {}
  fileSize: number = 2000000;
  uploadedFiles: any[] = [];
  onUpload(e: UploadEvent) {
    console.log(e.files);
  }
  addFile() {
    const fileGroup = this._fb.group({
      file: [null], // Ajoutez ici des validations ou des valeurs par défaut si nécessaire
    });
    this.files.push(fileGroup);
  }
}
