'use client';

import { store } from '@/app/store';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default Providers;
