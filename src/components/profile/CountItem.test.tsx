import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import CountItem from './CountItem';

describe('CountItem', () => {
  it('카운트 숫자와, 타이틀을 보여준다.', () => {
    renderWithProviders(<CountItem title="테스트 타이틀" count={100} />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('테스트 타이틀')).toBeInTheDocument();
  });
});
