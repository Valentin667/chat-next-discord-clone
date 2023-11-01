import Head from 'next/head';
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    return (
      <div>
        <Head>
          <title>• Discord | Chat Next</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }