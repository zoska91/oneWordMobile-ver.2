import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IAuth } from '../../types/forms';
import { Api, apiUrls } from '../../api';
import { useGlobalProvider } from '../../helpers/GlobalProvider';
import Toast from 'react-native-toast-message';

const useSignUpForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const api = new Api();
  const { setIsLoading } = useGlobalProvider();

  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onError: SubmitErrorHandler<IAuth> = (errors, e) => {
    return console.log(errors);
  };

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    console.log('submnit rtegister');
    try {
      setIsLoading(true);
      const respSignUp = await api.post(apiUrls.signup, { username: email, password });
      if (respSignUp.message === 'success') {
        const respLogin = await api.post(apiUrls.login, { username: email, password });

        await AsyncStorage.setItem('token', respLogin.token);

        if (respLogin.message === 'success') {
          Toast.show({ type: 'success', text2: 'success' });
          navigation.navigate('User');
        } else Toast.show({ type: 'error', text2: respLogin.message });
      } else Toast.show({ type: 'error', text2: respSignUp.message });
    } catch (e) {
      console.log(2, e);
    } finally {
      setIsLoading(false);
    }
  };

  return { methods, handleSubmit, onSubmit, onError };
};

export default useSignUpForm;
