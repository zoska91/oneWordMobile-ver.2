import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { IInputsPreferences, ISingleNotification } from '../../../types/forms';
import useNotifications from '../../../helpers/useNotifications';
import { Api, apiUrls } from '../../../api';
import Toast from 'react-native-toast-message';
import { useGlobalProvider } from '../../../layout/GlobalProvider';
import { useTranslation } from 'react-i18next';

const usePreferencesForm = () => {
  const api = new Api();
  const { t } = useTranslation();

  const { setIsLoading, isLoading } = useGlobalProvider();
  const triggerNotification = useNotifications();

  const [defaultValues, setDefaultValues] = useState<IInputsPreferences | null>(null);

  const methods = useForm<IInputsPreferences>();
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
      const formattedResp = {
        ...resp,
        summaryDay: Number(resp.summaryDay),
        breakDay: Number(resp.breakDay),
        notifications: resp.notifications.map((notification: ISingleNotification) => ({
          ...notification,
          type: Number(notification.type),
        })),
      };

      if (resp) setDefaultValues(formattedResp);
    } catch (e) {
      Toast.show({ type: 'success', text2: t('api.error') });
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

  const onSubmit: SubmitHandler<IInputsPreferences> = async (data) => {
    try {
      setIsLoading(true);

      const times = data.notifications.map((el) => {
        const [hour, minute] = el.time.split(':');
        return { hour: +hour, minute: +minute };
      });

      triggerNotification(times);
      if (defaultValues?._id) {
        const resp = await api.put(apiUrls.updateUserSettings, data);
        if (resp.message === 'Update success')
          Toast.show({ type: 'success', text2: 'Update success' });
        else Toast.show({ type: 'error', text2: t('api.error') });
      }
    } catch (e) {
      Toast.show({ type: 'error', text2: t('api.error') });
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
