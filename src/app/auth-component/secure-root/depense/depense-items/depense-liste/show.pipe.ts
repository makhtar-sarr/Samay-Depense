import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'show'
})
export class ShowPipe implements PipeTransform {

  transform(values: any[], show: boolean): any[] {
    if (!show){
      return [];
    }
    return values;
  }

}
