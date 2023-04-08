import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Question from './Question';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe('Question', () => {
  const renderQuestion = () => renderWithProviders(<Question category="romance" content="질문" />);

  it('category icon 을 category에 맞게 렌더링한다.', () => {
    renderQuestion();

    const icon = screen.getByAltText('romance icon');

    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute('src')).toBe('/images/category-romance.svg');
  });

  it('질문(content)를 렌더링한다.', () => {
    renderQuestion();

    const content = screen.getByText('질문');

    expect(content).toBeInTheDocument();
  });
});
