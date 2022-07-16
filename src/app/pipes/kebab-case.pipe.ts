import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
