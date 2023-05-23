import {
  act, fireEvent, screen, waitFor,
} from '@testing-library/react';

import PollPopDetail from '@/components/popup/PollPopup/PollPopDetail';
import fixtures from '@/fixtures';
import useGetPollStatus from '@/hooks/api/useGetPollStatus';
import { apiService } from '@/lib/api/ApiService';
import MockTheme from '@/test/MockTheme';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import { renderWithPortal } from '@/utils/testHelper';

jest.useFakeTimers();

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
  useIsMounted: () => true,
}));

jest.mock('@/hooks/api/useGetPollStatus');
jest.mock('@/lib/api/ApiService');

describe('PollPopup', () => {
  const mockRefetch = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetPollStatus as jest.Mock).mockImplementation(() => ({
      refetch: mockRefetch,
    }));

    (apiService.vote as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
    (apiService.skip as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderPollPopup = () => renderWithPortal(
    <ReactQueryWrapper>
      <MockTheme>
        <PollPopDetail
          polls={fixtures.polls}
          totalQuestionCount={3}
          userCurrentIndex={1}
          onClose={onClose}
        />
      </MockTheme>
    </ReactQueryWrapper>,
    'full-portal-root',
  );

  context('goNextStep 버튼이 눌리면', () => {
    it('다음 step 으로 넘어간다.', async () => {
      renderPollPopup();

      expect(screen.getByText('1 / 3')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      await waitFor(() => {
        expect(screen.getByText('2 / 3')).toBeInTheDocument();
      });
    });

    it('마지막 step일 경우 onClose가 호출된다.', async () => {
      renderPollPopup();

      expect(screen.getByText('1 / 3')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      await waitFor(() => {
        expect(screen.getByText('2 / 3')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('이강호'));

      await waitFor(() => {
        expect(screen.getByText('3 / 3')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      await act(() => {
        setTimeout(() => {
          expect(screen.getByText('100 리워드가 적립 완료.')).toBeInTheDocument();
        }, 1000);
      });
    });
  });
});
