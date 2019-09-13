import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], field: string, searchText: string): any[] {

    console.log('items' + JSON.stringify(items));
    console.log('field' + field + ' Search Text' + searchText);
    if (!items) { return []; }

    if (!field || !searchText) { return items; }

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it[field].toLowerCase().includes(searchText);
    });
  }

}
