import Providers from '../components/client/Providers';
import './globals.css';

export const metadata = {
  title: 'GetLocals',
  description: 'GetLocals Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
