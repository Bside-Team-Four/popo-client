import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import MockTheme from '@/test/MockTheme';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

export function renderWithProviders(node:ReactNode) {
  return render(
    <ReactQueryWrapper>
      <RecoilRoot>
        <MockTheme>
          {node}
        </MockTheme>
      </RecoilRoot>
    </ReactQueryWrapper>,
  );
}

export function renderWithPortal<P>(ui: ReactElement<P, string | JSXElementConstructor<P>>, elementId = 'popup-portal') {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', elementId);

  return render(ui, {
    container: document.body.appendChild(portalContainer),
  });
}
