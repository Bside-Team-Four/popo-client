import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('버튼이 보인다.', () => {
    render(<Button />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(screen.getByText('버튼')).toBeInTheDocument();
  });
});
