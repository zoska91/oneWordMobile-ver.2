import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGlobalProvider } from '../../../layout/GlobalProvider';
import { Api, apiUrls } from '../../../api';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const IS_INFO_LEARNED_BUTTON_KEY = 'isInfoLearnedButtonVisible';

export const useLearnWrapper = () => {
  const api = new Api();
  const { t } = useTranslation();

  const { currentLearnType, todayWord, getTodayWord, setIsLoading } = useGlobalProvider();

  const windowHeight = Dimensions.get('window').height;

  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isLearnButtonVisible, setIsLearnButtonVisible] = useState(false);

  const getIsVisibleLearnedButtonStatus = async () => {
    const isVisible = await AsyncStorage.getItem('IsInfoLearnedButtonVisible');
    if (isVisible) setIsInfoVisible(true);
  };

  const setIsVisibleLearnedButtonStatus = async () => {
    await AsyncStorage.setItem(IS_INFO_LEARNED_BUTTON_KEY, 'hidden');
    setIsInfoVisible(false);
  };

  const handleLearnedButton = async () => {
    setIsLoading(true);
    try {
      if (todayWord?._id) {
        const resp = await api.put(apiUrls.updateWord(todayWord._id), { status: 2 });
        if (resp._id === todayWord?._id) {
          await getTodayWord();
        }
      }
    } catch (e) {
      console.log(e);
      Toast.show({ type: 'error', text2: t('api.error') });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIsVisibleLearnedButtonStatus();
  }, []);

  return {
    setIsLearnButtonVisible,
    isLearnButtonVisible,
    todayWord,
    windowHeight,
    currentLearnType,
    isInfoVisible,
    setIsVisibleLearnedButtonStatus,
    handleLearnedButton,
  };
};
