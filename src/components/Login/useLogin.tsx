import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

// import { addDefaultSettingsIfNotExistsAPI } from '../../../db/API/settings';
import { IAuth } from '../../types/forms';
import { useNavigation } from '@react-navigation/native';

const useLogin = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const methods = useForm<IAuth>();

  const { handleSubmit } = methods;

  const onError: SubmitErrorHandler<IAuth> = (errors, e) => {
    return console.log(errors);
  };

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    try {
     
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return { methods, handleSubmit, onSubmit, onError };
};

export default useLogin;