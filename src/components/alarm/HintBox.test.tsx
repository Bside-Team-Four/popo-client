import { fireEvent, screen, waitFor } from '@testing-library/react';

import hint from '@/fixtures/hint';
import { apiService } from '@/lib/api/ApiService';
import { renderWithProviders } from '@/utils/testHelper';

import HintBox from './HintBox';

jest.mock('@/lib/api/ApiService');

describe('HintBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiService.fetchHints as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
      value: given.hints,
    }));

    (apiService.purchaseHint as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderHintBox = () => {
    renderWithProviders(<HintBox userId={0} voteId={0} />);
  };

  it('"힌트 보기" 버튼을 렌더링한다.', async () => {
    given('hints', () => hint);

    renderHintBox();

    await waitFor(() => {
      expect(screen.getByText(/힌트 보기/)).toBeInTheDocument();
    });
  });

  it('"힌트 보기" 버튼을 누를 경우 첫 힌트를 보여준다.', async () => {
    given('hints', () => hint);

    renderHintBox();

    await waitFor(() => {
      screen.getByText('힌트 보기');
    });

    const hintButton = screen.getByText('힌트 보기');

    expect(hintButton).toBeInTheDocument();

    const hints = hint.map(
      (item) => (item.hintId === 1 ? { ...item, isPurchased: true } : item),
    );
    given('hints', () => hints);

    fireEvent.click(hintButton);

    await waitFor(() => {
      expect(screen.getByText(/ㄱ이 들어가는 이름/)).toBeInTheDocument();
    });
  });

  context('힌트가 2개 이상일 경우', () => {
    it('"힌트 보기" 버튼을 한 번 누를 경우 "더보기" 버튼이 보인다.', async () => {
      given('hints', () => hint);

      renderHintBox();

      await waitFor(() => {
        screen.getByText('힌트 보기');
      });

      const hintButton = screen.getByText('힌트 보기');

      const purchasedHints = hint.map(
        (item) => (item.hintId === 1 ? { ...item, isPurchased: true } : item),
      );

      given('hints', () => purchasedHints);

      fireEvent.click(hintButton);

      await waitFor(() => {
        expect(screen.getByText(/더보기.../)).toBeInTheDocument();
      });
    });

    it('"더보기"버튼을 누를 경우 두번째 힌트가 보인다.', async () => {
      const purchasedHints = hint.map(
        (item) => (item.hintId === 1 ? { ...item, isPurchased: true } : item),
      );
      given('hints', () => purchasedHints);

      renderHintBox();

      await waitFor(() => {
        screen.getByText(/더보기.../);
      });

      const moreButton = screen.getByText(/더보기.../);

      const hints = purchasedHints.map(
        (item) => (item.hintId === 2 ? { ...item, isPurchased: true } : item),
      );
      given('hints', () => hints);

      fireEvent.click(moreButton);

      await waitFor(() => {
        expect(screen.getByText(/ㄴ이 들어가는 이름/)).toBeInTheDocument();
      });
    });
  });
});
