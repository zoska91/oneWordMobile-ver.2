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

interface EventViewContextValue {
  isLoading: boolean;
  isLogin: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
      }
    } catch (e) {
      console.log(2, e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = { isLoading, isLogin, setIsLoading };

  return <EventViewContext.Provider value={value}>{children}</EventViewContext.Provider>;
};

export const useGlobalProvider = (): EventViewContextValue => {
  const context = useContext(EventViewContext);

  if (!context) {
    throw new Error('Component beyond Global Provider');
  }

  return context;
};
