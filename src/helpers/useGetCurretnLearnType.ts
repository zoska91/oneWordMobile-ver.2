import { ISingleNotification } from '../types/forms';
import { ILearnType } from '../types/learn';

export const checkIsBreakDay = (breakDay: number) => {
  const todayDate = new Date();
  const todayDay = todayDate.getDay();
  return +breakDay === +todayDay;
};

export const getCurrentLearnType = (notifications: ISingleNotification[]) => {
  const times: { time: number; type: number }[] = notifications
    .map((el) => {
      const [h, min] = el.time.split(':');

      const notificationTime = Number(h) * 60 * 60 + Number(min) * 60;
      return { time: notificationTime, type: +el.type };
    })
    .sort((a, b) => b.time - a.time);

  for (const noti of times) {
    const currentTime =
      Number(new Date().getHours()) * 60 * 60 + Number(new Date().getMinutes()) * 60;

    if (currentTime > noti.time) {
      return noti.type;
    }
  }
};
