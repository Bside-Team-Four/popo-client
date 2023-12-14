import { fireEvent, screen, waitFor } from '@testing-library/react';

import Notification from '@/components/notification/index';
import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('@/lib/api/ApiService');

describe('Notification', () => {
  (apiService.fetchNotificationSettings as jest.Mock).mockImplementation(
    () => given.notificationSetting,
  );

  (apiService.toggleNotificationSetting as jest.Mock).mockImplementation(
    () => {
      given('notificationSetting', () => ({
        code: 0,
        message: 'ok',
        value: { chosenOption: true, hourOption: true },
      }));
      return {
        code: 0,
        message: 'ok',
      };
    },
  );

  const renderNotification = () => renderWithProviders(<Notification />);

  it('알림 설정 페이지를 보여준다.', () => {
    renderNotification();

    expect(screen.getByText('POPO 회차 시작 푸시')).toBeInTheDocument();
    expect(screen.getByText('선택된 POPO 알림 푸시')).toBeInTheDocument();
  });

  context('POPO 회차 시작 푸시 스위치를 클릭했을 때', () => {
    given('notificationSetting', () => ({
      code: 0,
      message: 'ok',
      value: fixtures.notificationSettings,
    }));

    it('스위치의 상태가 변경된다.', async () => {
      renderNotification();

      const switchItem = screen.getByTestId('POPO 회차 시작 푸시 switch');

      fireEvent.click(switchItem);
      await waitFor(() => {
        expect(switchItem).toHaveStyleRule('background-color', '#AF52DE');
      });
    });
  });

  context('선택된 POPO 알림 푸시를 클릭했을 때', () => {
    it('스위치의 상태가 변경된다.', async () => {
      renderNotification();

      const switchItem = screen.getByTestId('선택된 POPO 알림 푸시 switch');

      fireEvent.click(switchItem);

      await waitFor(() => {
        expect(switchItem).toHaveStyleRule('background-color', '#AF52DE');
      });
    });
  });
});
