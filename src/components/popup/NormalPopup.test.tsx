import { screen } from '@testing-library/react';

import MockProvider from '@/test/MockProvider';
import { renderWithPortal } from '@/utils/testHelper';

import NormalPopup from './NormalPopup';

describe('NormalPopup', () => {
  const onClose = jest.fn();
  const onOk = jest.fn();

  const renderNormalPopup = () => renderWithPortal(
    <MockProvider>
      <NormalPopup
        show
        onClose={onClose}
        title="Title"
        okText="ok"
        cancelText="cancel"
        onOk={onOk}
      />
    </MockProvider>,
  );

  it('Title render', () => {
    renderNormalPopup();

    expect(screen.getByText(/Title/)).toBeInTheDocument();
  });
});
