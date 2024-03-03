import { InfiniteData } from '@tanstack/react-query';

export default function trasformInfiniteQueryData<T extends { value:R[] }, R>(
  data:InfiniteData<T>,
  mapper: (value: R) => R,
) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      value: page.value.map(mapper),
    })),
  };
}
