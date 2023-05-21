import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import TosText from './TosText';

describe('TosText', () => {
  it('텍스트를 화면에 보여준다.', () => {
    renderWithProviders(<TosText text="텍스트" />);

    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });
});
