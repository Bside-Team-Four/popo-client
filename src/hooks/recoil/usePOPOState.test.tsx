import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import usePOPOState from '@/hooks/recoil/usePOPOState';

describe('usePOPOState', () => {
  const renderUsePOPOStateHook = () => renderHook(() => usePOPOState(), {
    wrapper: ({ children }) => (
      <RecoilRoot>
        {children}
      </RecoilRoot>
    ),
  });

  it('popoState의 초깃값을 잘 가져오는가.', () => {
    const { result } = renderUsePOPOStateHook();

    expect(result.current.popoState).toEqual('start');
  });

  it('setPOPOState 통해 popoState를 변경할 수 있는가.', () => {
    const { result } = renderUsePOPOStateHook();

    act(() => {
      result.current.setPOPOState('done');
    });

    expect(result.current.popoState).toBe('done');
  });
});
