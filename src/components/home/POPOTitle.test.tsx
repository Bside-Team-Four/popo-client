import { screen } from '@testing-library/react';

import POPOTitle from '@/components/home/POPOTitle';
import usePOPOState from '@/hooks/recoil/usePOPOState';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('@/hooks/recoil/usePOPOState');

jest.useFakeTimers();

describe('POPOTitle', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    (usePOPOState as jest.Mock).mockImplementation(() => ({
      popoState: given.popoState,
    }));
  });

  const renderPOPOTitle = (dateValue: string) => {
    jest.setSystemTime(new Date(dateValue));

    renderWithProviders(
      <POPOTitle />,
    );
  };

  context('when popo state is sleep', () => {
    given('popoState', () => 'sleep');

    it('renders sleep Title, SubTitle, Message', () => {
      renderPOPOTitle('December 17, 2023 03:33:30');

      expect(screen.getByText('POPO')).toBeInTheDocument();
      expect(screen.getByText('자고 있어')).toBeInTheDocument();
      expect(screen.getByText('새벽 3시에서 7시에는 잠에 들 시간이야')).toBeInTheDocument();
    });
  });

  context('when popo state is done', () => {
    given('popoState', () => 'done');

    it('renders done Title, SubTitle, Message', () => {
      renderPOPOTitle('December 17, 2023 21:33:10');

      expect(screen.getByText('POPO')).toBeInTheDocument();
      expect(screen.getByText('곧 시작할거야')).toBeInTheDocument();
      expect(screen.getByText('뒤에 봐')).toBeInTheDocument();
    });
  });

  context('when popo state is start', () => {
    given('popoState', () => 'start');

    it('renders start Title, SubTitle, Message', () => {
      renderPOPOTitle('December 17, 2023 20:33:30');

      expect(screen.getByText('POPO_오후 8시')).toBeInTheDocument();
      expect(screen.getByText('남았어')).toBeInTheDocument();
      expect(screen.getByText('시작하기를 눌러줘')).toBeInTheDocument();
    });
  });
});
