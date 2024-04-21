import { useForm, SubmitHandler } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { IAuth, IInputsPreferences } from '../../../types/forms';
import { Api, apiUrls } from '../../../api';
import { useGlobalProvider } from '../../../layout/GlobalProvider';
import { useTranslation } from 'react-i18next';
import useNotifications from '../../../helpers/useNotifications';

const useLogin = () => {
  const api = new Api();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { setIsLoading, setIsLogin } = useGlobalProvider();
  const triggerNotification = useNotifications();

  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    const setNotification = async () => {
      const respSettings: IInputsPreferences = await api.get(apiUrls.getUserSettings);
      const times = respSettings.notifications.map((el) => {
        const [hour, minute] = el.time.split(':');
        return { hour: +hour, minute: +minute };
      });
      triggerNotification(times);
    };

    try {
      setIsLoading(true);

      const resp = await api.post(apiUrls.login, { username: email, password });
      if (resp.message === 'Login Successful') {
        await AsyncStorage.setItem('token', resp.token);
        Toast.show({ type: 'success', text2: t('api.success') });
        navigation.navigate('User');

        setNotification();

        setIsLogin(true);
        return;
      } else {
        Toast.show({ type: 'error', text2: resp.message });
      }
    } catch (e) {
      Toast.show({ type: 'error', text2: t('api.error') });
    } finally {
      setIsLoading(false);
    }
  };

  return { methods, handleSubmit, onSubmit };
};

export default useLogin;
