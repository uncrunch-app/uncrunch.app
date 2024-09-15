import { ReactNode } from 'react';
import { Header } from '@/src/3-widgets/header';

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru">
      <body>
          <Header />
          {children}
      </body>
    </html>
  );
};

export default HomePageLayout;
