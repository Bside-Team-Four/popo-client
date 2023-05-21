import { screen } from '@testing-library/react';

import Spinner from '@/components/common/Spinner';
import { renderWithProviders } from '@/utils/testHelper';

describe('Spinner', () => {
  const renderSpinner = () => renderWithProviders(<Spinner type={given.type} />);

  context('type이 normal일 때', () => {
    given('type', () => 'normal');

    it('배경색이 없는 Spinner가 렌더링된다.', () => {
      renderSpinner();

      expect(screen.getByTestId('spinner-container')).toHaveStyleRule('background-color', undefined);
    });
  });

  context('type이 pop일 때', () => {
    given('type', () => 'pop');

    it('배경색이 있는 Spinner와 로딩 메세지가 렌더링된다.', () => {
      renderSpinner();

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByTestId('spinner-container')).toHaveStyleRule('background-color', '#FFFFFF40');
    });
  });
});
