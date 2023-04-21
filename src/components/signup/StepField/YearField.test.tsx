import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import YearField from './YearField';

describe('YearField', () => {
  it('년도 입력 필드를 화면에 보여준다.', () => {
    renderWithProviders(<YearField year={signupField.year} />);

    expect(screen.getByText('태어난 년도')).toBeInTheDocument();
  });
});
