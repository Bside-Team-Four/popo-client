import { useQueryClient } from '@tanstack/react-query';

import useGetNotificationSettings, { GET_NOTIFICATION_SETTINGS_KEY } from './api/useGetNotificationSettings';
import useToggleNotificationSettingMutation from './api/useToggleNotificationSettingMutation';

const useNotificationSetting = () => {
  const queryClient = useQueryClient();

  const {
    data: settings,
  } = useGetNotificationSettings();

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATION_SETTINGS_KEY] });
  }

  const toggleNotificationSettingHourType = useToggleNotificationSettingMutation('hour').bind(null, {
    onSuccess: handleSuccess,
  });

  const toggleNotificationSettingChosenType = useToggleNotificationSettingMutation('chosen').bind(null, {
    onSuccess: handleSuccess,
  });

  return { settings, toggleNotificationSettingHourType, toggleNotificationSettingChosenType };
};

export default useNotificationSetting;
