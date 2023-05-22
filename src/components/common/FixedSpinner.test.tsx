import { screen } from '@testing-library/react';

import FixedSpinner from '@/components/common/FixedSpinner';
import { renderWithProviders } from '@/utils/testHelper';

describe('FixedSpinner', () => {
  const renderFixedSpinner = () => renderWithProviders(<FixedSpinner type="pop" />);

  it('Loading 화면을 보여준다.', () => {
    renderFixedSpinner();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
