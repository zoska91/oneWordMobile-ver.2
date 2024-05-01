import { ISingleNotification } from './forms';

export interface PreferencesResp {
  userId: string;
  breakDay: number;
  isBreak: number;
  isSummary: boolean;
  notifications: ISingleNotification[];
  languageToLearn: number;
  summaryDay: number;
}

export interface TodayWordResp {
  _id: string;
  userId: string;
  basicWord: string;
  transWord: string;
  addLang: number;
  status: number;
  createdDate: string;
  updatedDate: string;
  shuffleWords: { id: string; text: string }[];
}
