import { Injectable } from '@angular/core';
import type { Highlighter } from 'shiki';
import { createHighlighter } from 'shiki';

const LANG_MAP: Record<string, string> = {
  ts: 'typescript',
  typescript: 'typescript',
  html: 'html',
  bash: 'bash',
  sh: 'bash',
  json: 'json',
};

@Injectable({ providedIn: 'root' })
export class HighlighterService {
  private highlighterPromise: Promise<Highlighter> | null = null;

  private init(): Promise<Highlighter> {
    if (!this.highlighterPromise) {
      this.highlighterPromise = createHighlighter({
        themes: ['dark-plus', 'light-plus'],
        langs: ['typescript', 'html', 'bash', 'json'],
      });
    }
    return this.highlighterPromise;
  }

  async highlight(code: string, lang: string, darkMode: boolean): Promise<string> {
    const h = await this.init();
    const resolvedLang = LANG_MAP[lang] ?? 'typescript';
    const theme = darkMode ? 'dark-plus' : 'light-plus';
    return h.codeToHtml(code, { lang: resolvedLang, theme });
  }
}
