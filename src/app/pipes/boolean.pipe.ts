import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean',
})
export class BooleanPipe implements PipeTransform {
  transform(value: Boolean): string {
    return value ? 'oui' : 'non';
  }
}
