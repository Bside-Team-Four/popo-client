import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const useToggleNotificationSettingMutation = (type: 'chosen' | 'hour') => {
  const toggleNotificationSetting = useMutation(
    () => apiService.toggleNotificationSetting(type),
  );

  return toggleNotificationSetting.mutate.bind(null, undefined);
};

export default useToggleNotificationSettingMutation;
