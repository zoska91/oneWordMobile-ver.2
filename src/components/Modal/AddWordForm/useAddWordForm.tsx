import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useGenerateOptionsFields from '../../../helpers/useGenereteOptionsFields';
import { IInputsAddWord } from '../../../types/forms';
import Toast from 'react-native-toast-message';
import { Api, apiUrls } from '../../../api';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

const useAddWordForm = () => {
  const api = new Api();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { setIsLoading } = useGlobalProvider();

  const { addLangOptions } = useGenerateOptionsFields();

  const methods = useForm<IInputsAddWord>({
    defaultValues: { addLang: 'en' },
  });

  const { handleSubmit, reset, setError } = methods;

  const onError: SubmitErrorHandler<IInputsAddWord> = (errors, e) => {
    console.log('-------');
    console.log(errors);
    // setError(errors)
  };

  const onSubmit: SubmitHandler<IInputsAddWord> = async (data) => {
    setIsLoading(true);

    try {
      const resp = await api.post(apiUrls.addWord, { ...data });
      console.log(resp.message);
      console.log(resp.message === 'Success');

      if (resp.message === 'Success') {
        Toast.show({ type: 'success', text2: t(`wordCreated`) });
        reset();
      } else {
        Toast.show({ type: 'success', text2: 'something went wrong' });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { navigation, addLangOptions, methods, onSubmit, handleSubmit, onError, t };
};

export default useAddWordForm;
