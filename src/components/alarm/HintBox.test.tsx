import { fireEvent, screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import Hint from '@/types/Hint';
import { renderWithProviders } from '@/utils/testHelper';

import HintBox from './HintBox';

describe('HintBox', () => {
  const { hint } = fixtures;

  const renderHintBox = (hintData: Hint[]) => {
    renderWithProviders(<HintBox hintData={hintData} />);
  };

  it('"힌트 보기" 버튼을 렌더링한다.', () => {
    renderHintBox(hint);

    expect(screen.getByText(/힌트 보기/)).toBeInTheDocument();
  });

  it('"힌트 보기" 버튼을 한 번 누를 경우 메인 힌트를 보여준다.', () => {
    renderHintBox([hint[0]]);

    const hintButton = screen.getByText('힌트 보기');

    expect(hintButton).toBeInTheDocument();

    fireEvent.click(hintButton);

    expect(screen.getByText(/ㄱ이 들어가는 이름/)).toBeInTheDocument();
  });

  context('힌트가 2개 이상일 경우', () => {
    it('"힌트 보기" 버튼을 한 번 누를 경우 "더보기" 버튼이 보인다.', () => {
      renderHintBox(hint);

      const hintButton = screen.getByText('힌트 보기');

      fireEvent.click(hintButton);

      expect(screen.getByText(/더보기.../)).toBeInTheDocument();
    });

    it('"더보기"버튼을 누를 경우 두번째 힌트가 보인다.', () => {
      renderHintBox(hint);

      const hintButton = screen.getByText('힌트 보기');

      fireEvent.click(hintButton);

      const moreButton = screen.getByText(/더보기.../);

      fireEvent.click(moreButton);

      expect(screen.getByText(/ㄴ이 들어가는 이름/)).toBeInTheDocument();
    });
  });
});
