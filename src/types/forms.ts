export interface IInputsAddWord {
  basicWord: string;
  transWord: string;
  addLang: string;
}

interface ISingleNotification {
  type: string;
  time: string;
}

export interface IInputsPreferences {
  notifications: ISingleNotification[];
  lang: string;
  isSummary: boolean;
  summaryDay: ['week', 'month', 'none'];
  isBreak: boolean;
  breakDay: ['week', 'month', 'none'];
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IPasswordReminder {
  email: string;
}

export interface INotification {
  type: string;
  time: string;
}

export interface ISettings {
  id?: string;
  selectLanguage: string;
  isSummary: boolean;
  isBreak: boolean;
  notifications: INotification[];
  summaryDay: number;
  breakDay: number;
}

export interface IInputsPreferences {
  notifications: ISingleNotification[];
  lang: string;
  isSummary: boolean;
  summaryDay: ['week', 'month', 'none'];
  isBreak: boolean;
  breakDay: ['week', 'month', 'none'];
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
