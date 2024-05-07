export interface IInputsAddWord {
  basicWord: string;
  transWord: string;
  addLang: number;
}

export interface ISingleNotification {
  type: number;
  time: string;
  id?: number;
}

export interface IAuth {
  username: string;
  password: string;
}

export interface IPasswordReminder {
  username: string;
}

export interface IInputsPreferences {
  _id?: string;
  notifications: ISingleNotification[];
  lang: string;
  isSummary: boolean;
  summaryDay: number;
  isBreak: boolean;
  breakDay: number;
}

export interface IInputsAddWord {
  basicWord: string;
  transWord: string;
  addLang: number;
}

export interface ITodayWord {
  _id?: string;
  addLang: number;
  basicWord: string;
  createdDate: string;
  status: number;
  transWord: string;
  userId: string;
  wordId?: string;
  shuffleWords?: { id: string; text: string }[];
}
