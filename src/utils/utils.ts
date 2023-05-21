// eslint-disable-next-line import/prefer-default-export
export const targetFalseThenValue = (
  target?: boolean,
) => <T>(value: T): undefined | T => (target ? undefined : value);
