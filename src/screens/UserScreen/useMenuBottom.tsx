import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as Notification from 'expo-notifications';

const useMenuBottom = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const openModal = (action: string) => {
    navigation.navigate('Modal', {
      screen: 'Modal',
      params: {
        action,
      },
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Home');
    Toast.show({ type: 'success', text2: 'Log out successful' });
    Notification.cancelAllScheduledNotificationsAsync();
  };

  const actions = [
    {
      icon: { name: 'add', color: '#fff' },
      name: t('actionsBottomMenu.addWord'),
      onClick: () => openModal('addWord'),
    },
    {
      icon: { name: 'add', color: '#fff' },
      name: t('actionsBottomMenu.addCsv'),
      onClick: () => openModal('addCsv'),
    },
    {
      icon: { name: 'list', color: '#fff' },
      name: t('actionsBottomMenu.wordsList'),
      onClick: () => openModal('list'),
    },
    {
      icon: { name: 'settings', color: '#fff' },
      name: t('actionsBottomMenu.preferences'),
      onClick: () => openModal('preferences'),
    },
    {
      icon: { name: 'logout', color: '#fff' },
      name: t('actionsBottomMenu.logout'),
      onClick: () => handleLogout(),
    },
  ];

  return {
    actions,
  };
};

export default useMenuBottom;
