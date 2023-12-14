import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

export const GET_NOTIFICATION_SETTINGS_KEY = 'getNotificationSettings';

const useGetNotificationSettings = () => useQuery(
  [GET_NOTIFICATION_SETTINGS_KEY],
  async () => apiService.fetchNotificationSettings(),
  {
    select: (data) => data.value,
  },
);

export default useGetNotificationSettings;
