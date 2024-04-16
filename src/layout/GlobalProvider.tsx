import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigation } from '@react-navigation/native';

import { Api, apiUrls } from '../api';
import { ILearnType } from '../types/learn';
import { ITodayWord } from '../types/forms';
import { checkIsBreakDay, getCurrentLearnType } from '../helpers/useGetCurretnLearnType';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

interface GLobalProviderContextValue {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  todayWord: ITodayWord | null;
  currentLearnType: ILearnType;
  setIsBreakDay: Dispatch<SetStateAction<boolean>>;
  isBreakDay: boolean;
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

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayWord, setTodayWord] = useState<ITodayWord | null>(null);
  const [currentLearnType, setCurrentLearnType] = useState(ILearnType.SHOW_WORD);
  const [isBreakDay, setIsBreakDay] = useState(false);

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
      Toast.show({ type: 'error', text2: t('api.error') });
    } finally {
      setIsLoading(false);
    }
  };

  const getTodayWord = async () => {
    const respSettings = await api.get(apiUrls.getUserSettings);

    const isBreakDay = checkIsBreakDay(respSettings?.breakDay);
    if (isBreakDay) return setIsBreakDay(true);

    const learnType = getCurrentLearnType(respSettings.notifications);
    if (learnType) setCurrentLearnType(learnType);

    const respWord = await api.get(apiUrls.getTodayWord);
    setTodayWord(respWord);
  };

  useEffect(() => {
    getUser();
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
