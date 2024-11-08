import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    const matchingControl = formGroup.controls[matchingControlName];

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ confirmerd: true });
      return true;
    } else {
      return null;
    }
  };
}
