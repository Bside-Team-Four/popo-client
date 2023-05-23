import { fireEvent, screen, waitFor } from '@testing-library/react';

import RewardPop from '@/components/popup/PollPopup/RewardPop';
import useGetPollStatus from '@/hooks/api/useGetPollStatus';
import MockTheme from '@/test/MockTheme';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import { renderWithPortal } from '@/utils/testHelper';

jest.mock('@/hooks/api/useGetPollStatus');

describe('RewardPop', () => {
  const mockRefetch = jest.fn();
  const onClose = jest.fn();
  const setShow = jest.fn();

  (useGetPollStatus as jest.Mock).mockImplementation(() => ({
    refetch: mockRefetch,
  }));

  const renderPollPopup = () => renderWithPortal(
    <ReactQueryWrapper>
      <MockTheme>
        <RewardPop
          show
          setShow={setShow}
          onClose={onClose}
        />
      </MockTheme>
    </ReactQueryWrapper>,
  );

  context('확인 버튼이 눌리면', () => {
    it('onCloseRewardPop 함수가 실행된다.', async () => {
      renderPollPopup();

      expect(screen.getByText('확인')).toBeInTheDocument();

      fireEvent.click(screen.getByText('확인'));

      await waitFor(() => {
        expect(mockRefetch).toHaveBeenCalled();
      });
    });
  });
});
