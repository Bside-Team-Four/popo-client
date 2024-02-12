import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        suspense: false,
        retry: process.env.NODE_ENV === 'development' ? false : 3,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
  },
);

export default queryClient;
