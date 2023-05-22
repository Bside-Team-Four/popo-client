'use client';

import { useEffect } from 'react';

import ErrorComponent from '@/components/error';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }:ErrorPageProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <ErrorComponent onClick={() => reset()} />
  );
}
