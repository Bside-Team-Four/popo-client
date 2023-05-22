import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import InviteFriends from './InviteFriends';

describe('InviteFriends', () => {
  const writeText = jest.fn();

  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
  });

  it('친구 초대 박스를 보여준다.', () => {
    renderWithProviders(<InviteFriends />);

    fireEvent.click(screen.getByText(/친구 초대하기/));

    expect(screen.getByText(/POPO로 초대하세요/)).toBeInTheDocument();
  });
});
