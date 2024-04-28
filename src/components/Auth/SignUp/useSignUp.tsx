import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { IAuth } from '../../../types/forms';
import { Api, apiUrls } from '../../../api';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

const useSignUpForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const api = new Api();
  const { setIsLoading, setIsLogin, getTodayWord } = useGlobalProvider();

  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const respSignUp = await api.post(apiUrls.signup, { username, password });
      console.log(6666, { respSignUp });
      if (respSignUp.message === 'success') {
        const respLogin = await api.post(apiUrls.login, { username, password });

        await AsyncStorage.setItem('token', respLogin.token);

        if (respLogin.message === 'Login Successful') {
          Toast.show({ type: 'success', text2: 'success' });
          navigation.navigate('User');
          setIsLogin(true);
          getTodayWord();
        } else Toast.show({ type: 'error', text2: respLogin.message });
      } else Toast.show({ type: 'error', text2: respSignUp.message });
    } catch (e) {
      if (e instanceof Error && e.message === '400') {
        Toast.show({ type: 'error', text2: t('api.existsMail') });
        return;
      }
      Toast.show({ type: 'error', text2: t('api.error') });
    } finally {
      setIsLoading(false);
    }
  };

  return { methods, handleSubmit, onSubmit };
};

export default useSignUpForm;
