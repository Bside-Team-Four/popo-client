// eslint-disable-next-line import/prefer-default-export
import { Children, isValidElement, JSXElementConstructor } from 'react';

export function getChildByType<T>(
  type:string | JSXElementConstructor<T>,
  children?: React.ReactElement[],
) {
  if (!children) {
    return null;
  }

  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter(
      (child) => isValidElement(child) && child.type === type,
    )[0];
}

export const targetFalseThenValue = (
  target?: boolean,
) => <T>(value: T): undefined | T => (target ? undefined : value);
