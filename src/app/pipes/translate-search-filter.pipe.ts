import { Translate } from './../models/entities/translate';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateSearchFilter',
})
export class TranslateSearchFilterPipe implements PipeTransform {
  transform(
    value: Translate[],
    searchText: string,
    languageFilter: number = 0
  ): Translate[] {
    let translates: Translate[] = value;

    searchText = searchText ? searchText.toLocaleLowerCase() : '';
    translates = searchText
      ? translates.filter(
          (t) =>
            t.key?.toLocaleLowerCase().indexOf(searchText) !== -1 ||
            t.value?.toLocaleLowerCase().indexOf(searchText) !== -1
        )
      : translates;

    translates =
      languageFilter !== 0
        ? translates.filter((t) => {
            return +t.languageId === +languageFilter;
          })
        : translates;

    return translates;
  }
}
