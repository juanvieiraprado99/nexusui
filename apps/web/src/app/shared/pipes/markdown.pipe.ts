import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({ name: 'markdown', standalone: true, pure: true })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return '';
    return marked(value) as string;
  }
}
