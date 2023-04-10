import { fireEvent, screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import Hint from '@/types/Hint';
import { renderWithThemeProviders } from '@/utils/testHelper';

import HintBox from './HintBox';

describe('HintBox', () => {
  const { hint } = fixtures;

  const renderHintBox = (hintdata: Hint[]) => {
    renderWithThemeProviders(<HintBox hintData={hintdata} />);
  };

  context('"힌트 보기" 버튼이 있을 경우', () => {
    it('"힌트 보기" 버튼을 렌더링한다.', () => {
      renderHintBox(hint);
      const buttonElement = screen.getByText('힌트 보기');
      expect(buttonElement).toBeInTheDocument();
    });
  });

  context('"힌트 보기" 버튼이 한 번 클릭되면', () => {
    it('첫번째 힌트를 "힌트제목 : 힌트 내용" 으로 보여준다.', () => {
      renderHintBox(hint);
      const buttonElement = screen.getByText('힌트 보기');
      fireEvent.click(buttonElement);
      const hintButtonElement = screen.getByTestId('hint-button');
      expect(hintButtonElement).toBeInTheDocument();
      expect(hintButtonElement.textContent).toBe(
        `${hint[0].hintTitle} : ${hint[0].hintContent}`,
      );
    });
  });

  context('"더보기..." 버튼을 계속 누르면', () => {
    it('모든 힌트를 보여준다', () => {
      renderHintBox(hint);

      const buttonElement = screen.getByText('힌트 보기');
      fireEvent.click(buttonElement);
      const moreButtonElement = screen.getByText('더보기...');
      fireEvent.click(moreButtonElement);
      const hint1ButtonElement = screen.getAllByTestId('hint-button')[0];
      expect(hint1ButtonElement).toBeInTheDocument();
      expect(hint1ButtonElement.textContent).toBe(
        `${hint[0].hintTitle} : ${hint[0].hintContent}`,
      );
      const hint2ButtonElement = screen.getAllByTestId('hint-button')[1];
      expect(hint2ButtonElement).toBeInTheDocument();
      expect(hint2ButtonElement.textContent).toBe(
        `${hint[1].hintTitle} : ${hint[1].hintContent}`,
      );
    });
  });
});
