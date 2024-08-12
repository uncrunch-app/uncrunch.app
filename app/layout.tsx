import { ReactNode } from 'react';
import Providers from '../src/components/Providers';
import Header from '@/src/components/Header';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
