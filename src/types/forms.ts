export interface IInputsAddWord {
  basicWord: string;
  transWord: string;
  addLang: string;
}

export interface ISingleNotification {
  type: number;
  time: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IPasswordReminder {
  email: string;
}

export interface IInputsPreferences {
  id?: string;
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
  addLang: string;
}

export interface ITodayWord {
  _id?: string;
  addLang: string;
  basicWord: string;
  createdDate: any;
  status: number;
  transWord: string;
  userId: string;
  wordId?: string;
}
