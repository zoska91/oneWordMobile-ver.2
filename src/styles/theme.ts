import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorPrimary: string;
    colorSecondary: string;
    colorLight: string;
    correctAnsw: string;
    colorDanger: string;

    status: string[];
    tipColors: {
      success: string;
      info: string;
      error: string;
      warning: string;
    };
  }
}

export const theme: DefaultTheme = {
  colorPrimary: '#2e2757',
  colorSecondary: '#8c3a68',
  colorLight: '#e5e6ef',
  colorLighter: '#f5f5f9',

  colorDanger: 'rgb(178, 35, 52)',

  correctAnsw: '#009300',

  status: ['#7d90f2', '#8c3a68', '#009300'],
  tipColors: {
    success: '56, 142, 60',
    info: '2, 136, 209',
    error: '178, 35, 52',
    warning: '245, 124, 0',
  },
};
