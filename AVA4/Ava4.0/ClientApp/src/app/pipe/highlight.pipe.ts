import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'

@Pipe({ name: 'highlight' })
export class HighlightSearch implements PipeTransform {
	constructor(private sanitizer: DomSanitizer){}
    
	
	transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<span style='color: #4EC8F0'>" + match[0] + "</span>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}