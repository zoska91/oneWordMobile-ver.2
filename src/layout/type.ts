import { Dispatch, ReactNode, SetStateAction } from 'react';
import { DimensionValue } from 'react-native';

export interface IBubble {
  colors: string[];
  height: string;
  width: string;
  r: string;
  top: DimensionValue;
  left: DimensionValue;
  cx: string;
  cy: string;
  fx: string;
  fy: string;
  rx: string;
  ry: string;
  opacity?: number;
  zIndex?: number;
  flyParams: { x: number; y: number; time: number };
}

export interface GlobalContextValue {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}
