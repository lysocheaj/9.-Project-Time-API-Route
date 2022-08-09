import Head from 'next/head';

import Layout from "../components/layout/layout";
import Notification from '../components/ui/notification';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* set to all components that doesn't have head setting */}
        <title>NextJs Events</title> 
        <meta name='description' content='NextJs Events'/>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
      <Notification title="test" message='error' status='success' />
    </Layout>
  );
}

export default MyApp;
