import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Api, CustomError, apiUrls } from '../api';
import { ILearnType } from '../types/learn';
import { ITodayWord } from '../types/forms';
import { checkIsBreakDay, getCurrentLearnType } from '../helpers/useGetCurretnLearnType';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { AppState } from 'react-native';
import { AvailableLanguages } from '../types/languages';

interface GLobalProviderContextValue {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  todayWord: ITodayWord | null;
  currentLearnType: ILearnType;
  setIsBreakDay: Dispatch<SetStateAction<boolean>>;
  isBreakDay: boolean;
  getTodayWord: () => Promise<void>;
  currentLanguage: AvailableLanguages;
}

interface IProps {
  children: ReactNode;
}

const EventViewContext = createContext<GLobalProviderContextValue>(
  {} as GLobalProviderContextValue
);

export const GlobalProvider: FC<IProps> = ({ children }) => {
  const api = new Api();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayWord, setTodayWord] = useState<ITodayWord | null>(null);
  const [currentLearnType, setCurrentLearnType] = useState(ILearnType.SHOW_WORD);
  const [isBreakDay, setIsBreakDay] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(AvailableLanguages.en);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const resp = await api.get(apiUrls.user);
      if (resp.message === 'no logged user') {
        setIsLogin(false);
        return navigation.navigate('Home');
      } else {
        setIsLogin(true);
        navigation.navigate('User');
        await getTodayWord();
      }
    } catch (e) {
      if (e instanceof Error && e.message === '404') return;
    } finally {
      setIsLoading(false);
    }
  };

  const getTodayWord = async () => {
    try {
      const respSettings = await api.get(apiUrls.getUserSettings);

      setCurrentLanguage(respSettings?.selectLanguage || AvailableLanguages.en);

      const isBreakDay = checkIsBreakDay(respSettings?.breakDay);
      if (isBreakDay) return setIsBreakDay(true);

      const learnType = getCurrentLearnType(respSettings.notifications);
      if (learnType) setCurrentLearnType(learnType);

      const respWord = await api.get(apiUrls.getTodayWord);

      setTodayWord(respWord);
    } catch (e) {
      const error = e as CustomError;
      if (error.status === 404 && error.url === 'words/today-word') {
        Toast.show({ type: 'info', text2: t('api.noWords') });
        setTodayWord(null);
        return;
      }

      Toast.show({ type: 'error', text2: t('api.error') });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current !== nextAppState && nextAppState === 'active') {
        getUser();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const value = {
    isLoading,
    isLogin,
    setIsLoading,
    setIsLogin,
    todayWord,
    currentLearnType,
    isBreakDay,
    setIsBreakDay,
    getTodayWord,
    currentLanguage,
  };

  return <EventViewContext.Provider value={value}>{children}</EventViewContext.Provider>;
};

export const useGlobalProvider = (): GLobalProviderContextValue => {
  const context = useContext(EventViewContext);

  if (!context) {
    throw new Error('Component beyond Global Provider');
  }

  return context;
};
