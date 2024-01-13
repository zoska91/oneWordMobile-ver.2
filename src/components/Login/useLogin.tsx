import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { IAuth } from '../../types/forms';
import { Api, apiUrls } from '../../api';
import { useGlobalProvider } from '../../layout/GlobalProvider';

const useLogin = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const api = new Api();
  const { setIsLoading, setIsLogin } = useGlobalProvider();

  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onError: SubmitErrorHandler<IAuth> = (errors, e) => {
    return console.log(errors);
  };

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    try {
      setIsLoading(true);

      const resp = await api.post(apiUrls.login, { username: email, password });
      if (resp.message === 'Login Successful') {
        await AsyncStorage.setItem('token', resp.token);
        Toast.show({ type: 'success', text2: 'success' });
        navigation.navigate('User');
        setIsLogin(true);
        return;
      } else {
        Toast.show({ type: 'error', text2: resp.message });
      }
    } catch (e) {
      console.log(2, e);
    } finally {
      setIsLoading(false);
    }
  };

  return { methods, handleSubmit, onSubmit, onError };
};

export default useLogin;
