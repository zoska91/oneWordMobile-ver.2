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

interface EventViewContextValue {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  todayWord: any;
  learnType: ILearnType;
}

interface IProps {
  children: ReactNode;
}

const EventViewContext = createContext<EventViewContextValue>({} as EventViewContextValue);

export const GlobalProvider: FC<IProps> = ({ children }) => {
  const api = new Api();
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayWord, setTodayWord] = useState({});
  const [learnType, setLearnType] = useState(ILearnType.SHOW_WORD);

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
        // await getTodayWord();
      }
    } catch (e) {
      console.log(2, e);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodayWord = async () => {
    const resp = await api.get(apiUrls.getTodayWord);
    console.log({ resp });
    // setTodayWord(resp);
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
    learnType,
  };

  return <EventViewContext.Provider value={value}>{children}</EventViewContext.Provider>;
};

export const useGlobalProvider = (): EventViewContextValue => {
  const context = useContext(EventViewContext);

  if (!context) {
    throw new Error('Component beyond Global Provider');
  }

  return context;
};
