import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { IInputsPreferences, ISettings } from '../../../types/forms';
import useNotifications from '../../../helpers/useNotifications';
import { Api, apiUrls } from '../../../api';
import Toast from 'react-native-toast-message';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

const usePreferencesForm = () => {
  const { setIsLoading, isLoading } = useGlobalProvider();
  const api = new Api();
  const triggerNotification = useNotifications();
  const navigation = useNavigation();

  const [defaultValues, setDefaultValues] = useState<ISettings | null>(null);

  const methods = useForm();
  const { control, handleSubmit, watch, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'notifications',
  });
  const watchSummary = watch('isSummary');
  const watchBreak = watch('isBreak');

  const getUserSettings = async () => {
    try {
      setIsLoading(true);
      const resp = await api.get(apiUrls.getUserSettings);
      console.log({ resp });
      if (resp) setDefaultValues(resp);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserSettings();
  }, []);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues]);

  const onSubmit: SubmitHandler<IInputsPreferences> = (data) => {
    try {
      setIsLoading(true);

      console.log(222, data);

      const times = data.notifications.map((el) => {
        const [hour, minute] = el.time.split(':');
        return { hour: +hour, minute: +minute };
      });

      // triggerNotification(times);

      if (defaultValues?.id) api.put(`${apiUrls.updateUserSettings}/${defaultValues.id}`, data);

      Toast.show({ type: 'success', text2: 'Update success' });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    defaultValues,
    watchSummary,
    watchBreak,
    handleSubmit,
    fields,
    append,
    remove,
    methods,
    isLoading,
  };
};

export default usePreferencesForm;
