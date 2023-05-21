import { screen } from '@testing-library/react';

import LoadingHandler from '@/components/common/LoadingHandler';
import { renderWithProviders } from '@/utils/testHelper';

describe('LoadingHandler', () => {
  const renderLoadingHandler = () => renderWithProviders(
    <LoadingHandler isLoading={given.isLoading} loadingComponent={<div>Loading</div>}>
      <div>컨텐츠</div>
    </LoadingHandler>,
  );

  context('화면이 로딩중일 때는', () => {
    given('isLoading', () => true);

    it('로딩 컴포넌트를 보여준다.', () => {
      renderLoadingHandler();

      expect(screen.getByText('Loading')).toBeInTheDocument();
    });
  });

  context('화면이 로딩중이 아닐 때는', () => {
    given('isLoading', () => false);

    it('로딩 컴포넌트를 보여주지 않는다.', () => {
      renderLoadingHandler();

      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });

    it('자식 컴포넌트를 보여준다.', () => {
      renderLoadingHandler();

      expect(screen.getByText('컨텐츠')).toBeInTheDocument();
    });
  });
});
