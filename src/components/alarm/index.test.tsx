import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import AlarmPage from './index';

describe('Alarm', () => {
  const renderAlarm = () => renderWithProviders(<AlarmPage />);

  it('Alarm Title 출력', () => {
    renderAlarm();

    expect(screen.getByText(/나를 뽑은 사람/)).toBeInTheDocument();
  });
});
