import type { AppProps } from 'next/app';
import Head from 'next/head';

import ThemeProvider from '@/providers/ThemeProvider';

interface Props extends AppProps {}

const DriftAIApp = ({ Component, pageProps }: Props) => {
  return (
    <>
      <Head>
        <title>Drift AI</title>
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='og:type' content='website' />
        <meta property='og:title' content='Drift chat platform' />
        <meta
          property='og:decription'
          content='An open ai drift chat platform'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default DriftAIApp;
