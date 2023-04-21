import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import NameField from './NameField';

describe('NameField', () => {
  it('이름 입력 필드를 화면에 보여준다.', () => {
    renderWithProviders(<NameField name={signupField.name} />);

    expect(screen.getByText('이름')).toBeInTheDocument();
  });
});
