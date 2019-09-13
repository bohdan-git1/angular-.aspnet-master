import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, length: number): string {
   
    const elipses = "...";
 
    if(typeof value === "undefined") return value;
    if(value.length <= length) return value;
 
    //.. truncate to about correct lenght
    let truncatedText = value.slice(0, length);
 
    //.. now nibble ends till correct length
    while (truncatedText.length > length - elipses.length) {
 
        let lastSpace = truncatedText.lastIndexOf(" ");
        if(lastSpace === -1) break;
        truncatedText = truncatedText.slice(0, lastSpace).replace(/[!,.?;:]$/, '');
 
    };
 
   return truncatedText + elipses;
 
  }
}
