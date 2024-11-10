import { Helmet } from 'react-helmet';

export const SEO = () => {
  return (
    <Helmet>
      {/* ... existing meta tags ... */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
    </Helmet>
  );
}; 