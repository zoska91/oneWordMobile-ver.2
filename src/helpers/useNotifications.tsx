import { useEffect } from 'react';
import * as Notification from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      soundName: 'default',
    };
  },
});

const useNotifications = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const getPermission = async () => {
    const { status } = await Notification.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notification.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert('So sad');
        return;
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const triggerNotification = (data: { hour: number; minute: number }[]) => {
    Notification.cancelAllScheduledNotificationsAsync();

    data.map(({ hour, minute }) => {
      Notification.scheduleNotificationAsync({
        content: {
          title: t('itsTime'),
          body: t('takeAMoment'),
          sound: 'default',
          data: {
            id: 'learn',
          },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
    });
  };

  useEffect(() => {
    // triggerNotification();
    // const backgroundSubscription = Notification.addNotificationResponseReceivedListener(
    //   response => {
    //     // console.log(response);
    //     if (response && response.notification.request.content.data.id === 'test') {
    //       // navigation.navigate('Modal');
    //     }
    //   }
    // );
    // co się dzieje kiedy przychodzi notyfikacja i aplikacja jest otwarta
    const foreGroundSubscription = Notification.addNotificationReceivedListener((notification) => {
      if (notification.request.content.data.id === 'learn') {
        navigation.navigate('User');
      }
    });

    return () => {
      //  czyści subskrypcje
      foreGroundSubscription.remove();
      //   backgroundSubscription.remove();
    };
  }, []);

  return triggerNotification;
};

export default useNotifications;
