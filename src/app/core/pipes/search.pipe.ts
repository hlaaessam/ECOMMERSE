// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'search',
//   standalone: true,
// })
// export class SearchPipe implements PipeTransform {
//   transform(array: any[], text: string): any[] {
//     return array.filter((item) =>
//       item.title.toLowerCase().includes(text.toLowerCase()),
//     );
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(array: any[], text: string, key: string = 'title'): any[] {
    if (!text.trim()) return array;
    return array.filter((item) =>
      item[key].toLowerCase().includes(text.toLowerCase()),
    );
  }
}
