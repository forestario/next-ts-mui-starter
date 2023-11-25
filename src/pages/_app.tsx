import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import { AuthProvider } from '@/auth/JwtContext';
import ThemeProvider from '@/themes';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </AuthProvider>
  );
}
