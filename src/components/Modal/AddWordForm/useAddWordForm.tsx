import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import useGenerateOptionsFields from '../../../helpers/useGenereteOptionsFields';
import { IInputsAddWord } from '../../../types/forms';
import { Api, apiUrls } from '../../../api';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

const useAddWordForm = () => {
  const api = new Api();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { setIsLoading, todayWord, getTodayWord } = useGlobalProvider();

  const { langOptions } = useGenerateOptionsFields();

  const methods = useForm<IInputsAddWord>({
    defaultValues: { addLang: 7 },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<IInputsAddWord> = async (data) => {
    setIsLoading(true);

    try {
      const resp = await api.post(apiUrls.addWord, { ...data });

      if (resp.message === 'Success') {
        Toast.show({ type: 'success', text2: t(`wordCreated`) });
        // when there is no words then after adding app still showing sad icon (means no words)
        if (!todayWord) await getTodayWord();

        reset();
      } else {
        Toast.show({ type: 'error', text2: t('api.error') });
      }
    } catch (e) {
      Toast.show({ type: 'error', text2: t('api.error') });
    } finally {
      setIsLoading(false);
    }
  };

  return { navigation, langOptions, methods, onSubmit, handleSubmit, t };
};

export default useAddWordForm;
