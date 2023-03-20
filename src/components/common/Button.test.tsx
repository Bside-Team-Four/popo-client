import { render, screen } from '@testing-library/react';

import MockTheme from '@/utils/test/MockTheme';

import Button from './Button';

describe('Button', () => {
  it('PoPo 버튼이 보인다.', () => {
    render(<MockTheme><Button /></MockTheme>);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(screen.getByText('PoPo')).toBeInTheDocument();
  });
});
