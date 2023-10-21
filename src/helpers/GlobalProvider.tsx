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
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    try {
      setIsLogin(true);
      const resp = api.get(apiUrls.user);
      console.log(resp);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLogin(false);
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
