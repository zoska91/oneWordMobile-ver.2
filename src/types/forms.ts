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