import { screen } from '@testing-library/react';

import alarm from '@/fixtures/alarm';
import useGetInfiniteAlarms from '@/hooks/api/useGetInfiniteAlarms';
import { renderWithProviders } from '@/utils/testHelper';

import AlarmPage from './index';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
  useIsMounted: () => true,
}));

jest.mock('@/hooks/api/useGetInfiniteAlarms');

describe('Alarm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetInfiniteAlarms as jest.Mock).mockImplementation(() => ({
      alarms: given.alarms,
      refState: { lastItemRef: { current: null } },
    }));
  });

  const renderAlarm = () => renderWithProviders(<AlarmPage />);

  context('조회 결과가 있으면', () => {
    given('alarms', () => alarm);

    it('결과를 보여준다.', () => {
      renderAlarm();

      expect(screen.getAllByTestId('alarm_item_box')[0]).toBeInTheDocument();
    });
  });
});
