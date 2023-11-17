import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

// import { addDefaultSettingsIfNotExistsAPI } from '../../../db/API/settings';
import { IAuth } from '../../types/forms';
import { useNavigation } from '@react-navigation/native';
import { Api, apiUrls } from '../../api';
import { useGlobalProvider } from '../../helpers/GlobalProvider';
import Toast from 'react-native-toast-message';

const useLogin = () => {
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
    try {
      setIsLoading(true);
      const resp = await api.post(apiUrls.login, { username: email, password });
      if (resp.message === 'success') {
        Toast.show({ type: 'success', text2: 'success' });
        navigation.navigate('User');
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
