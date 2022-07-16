import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, field: string, field2:string): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      if (a[field][field2] < b[field][field2]) {
        return -1;
      } else if (a[field][field2] > b[field][field2]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
