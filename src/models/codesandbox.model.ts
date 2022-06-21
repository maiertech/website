type ZeroOrOne = '0' | '1';

// https://codesandbox.io/docs/embedding#embed-options
export type EmbedOptions = {
  autoresize?: ZeroOrOne;
  codemirror?: ZeroOrOne;
  editorsize?: string;
  eslint?: ZeroOrOne;
  expanddevtools?: ZeroOrOne;
  hidedevtools?: ZeroOrOne;
  fontsize?: string;
  forcerefresh?: ZeroOrOne;
  hidenavigation?: ZeroOrOne;
  highlights?: string;
  initialpath?: string;
  module?: string;
  moduleview?: ZeroOrOne;
  previewwindow?: 'console' | 'tests' | 'browser';
  runonclick?: ZeroOrOne;
  view?: 'editor' | 'split' | 'preview';
  theme?: 'dark' | 'light';
};

// https://codesandbox.io/docs/api
export type Files = {
  [path: string]: { content: string; isBinary?: boolean };
};
