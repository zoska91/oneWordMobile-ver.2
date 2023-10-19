import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorPrimary: string;
    colorSecondary: string;
    colorLight: string;
    correctAnsw: string;

    status: string[];
  }
}

export const theme: DefaultTheme = {
  colorPrimary: '#2e2757',
  colorSecondary: '#8c3a68',
  colorLight: '#e5e6ef',

  correctAnsw: '#009300',

  status: ['#7d90f2', '#8c3a68', '#009300'],
};