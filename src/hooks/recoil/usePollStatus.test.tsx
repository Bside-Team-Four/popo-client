import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import usePollStatus from '@/hooks/recoil/usePollStatus';

describe('usePollStatus', () => {
  const renderUsePOPOStateHook = () => renderHook(() => usePollStatus(), {
    wrapper: ({ children }) => (
      <RecoilRoot>
        {children}
      </RecoilRoot>
    ),
  });

  it('popoState의 초깃값을 잘 가져오는가.', () => {
    const { result } = renderUsePOPOStateHook();

    expect(result.current.pollStatus).toEqual('START');
  });

  it('setPOPOState 통해 popoState를 변경할 수 있는가.', () => {
    const { result } = renderUsePOPOStateHook();

    act(() => {
      result.current.setPollStatus('DONE');
    });

    expect(result.current.pollStatus).toBe('DONE');
  });
});
