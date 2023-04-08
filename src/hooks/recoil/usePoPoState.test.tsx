import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import usePoPoState from '@/hooks/recoil/usePoPoState';
import popoState from '@/store/popo';
import RecoilObserver from '@/test/RecoilObserver';

describe('usePoPoState', () => {
  const onChange = jest.fn();

  const renderUsePoPoStateHook = () => renderHook(() => usePoPoState(), {
    wrapper: ({ children }) => (
      <RecoilRoot>
        <RecoilObserver node={popoState} onChange={onChange} />
        {children}
      </RecoilRoot>
    ),
  });

  it('popoState의 초깃값을 잘 가져오는가.', () => {
    const { result } = renderUsePoPoStateHook();

    expect(result.current.popoState).toEqual('start');
  });

  it('setPoPoState를 통해 popoState를 변경할 수 있는가.', () => {
    const { result } = renderUsePoPoStateHook();

    act(() => {
      result.current.setPoPoState('done');
    });

    expect(onChange).toHaveBeenCalledWith('done');
  });
});
