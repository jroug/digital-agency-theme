const { spawnSync } = require('node:child_process');
const { rmSync } = require('node:fs');
const path = require('node:path');

// Pin demo mode even if the Vercel project has old WordPress environment values.
const result = spawnSync(process.execPath, [require.resolve('react-scripts/scripts/build')], {
  stdio: 'inherit',
  env: {
    ...process.env,
    REACT_APP_DEMO_MODE: 'true',
    PUBLIC_URL: '',
    REACT_APP_GRAPHQL_URL: '',
    REACT_APP_CONTENT_URL: '',
    REACT_APP_CONTACT_URL: '',
    REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY: '',
    REACT_APP_BLOG_POST_PER_PAGE: '6',
  },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

// This static deployment does not execute the optional WordPress PHP proxy.
rmSync(path.join(__dirname, '../build/sitemap.php'), { force: true });
