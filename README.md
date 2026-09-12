# Digital Agency Theme

A React digital agency frontend with local demo content and an optional WordPress/WPGraphQL backend.

## Branding

Edit `src/brand.js` for the agency name, description, email, and address. The
header and footer use `src/assets/images/agency-logo.svg`; browser and installation
icons live in `public/`. Colors are defined in `src/assets/css/custom.css`.
Additional footer contact and social fields can be configured in `src/App.js`.

## Demo mode

Demo mode is enabled by default. Run `npm install` and `npm start` to explore
without WordPress. `REACT_APP_DEMO_MODE=true` explicitly enables it.

Edit `src/demo/data.js` to customize sample pages, menus, services, projects,
posts, testimonials, and FAQs. Images are bundled locally. Blog search, category
and tag pages, and Load More use local data. Contact and newsletter forms show a
demo confirmation without sending or saving submissions; reCAPTCHA and sharing
scripts are disabled in demo mode. Fonts may still load from Google Fonts.

To reconnect WordPress, set `REACT_APP_DEMO_MODE=false`, configure the CMS URLs
and reCAPTCHA key, and restart or rebuild the app. The original WordPress
newsletter handler remains disabled pending its existing integration setup.

## WordPress setup

Run `npm install`, copy `.env.example` to `.env.local`, and set the CMS URLs.
Run `npm start` for development or
`npm run build` to generate the production build.

The theme requires the existing WordPress schema (WPGraphQL, custom fields,
menus, and custom post types defined in `src/components/queries/GraphQLQueries.jsx`).
Demo mode supplies local fixtures instead of a database. Replace CMS page content,
SEO titles/canonicals, contact-page details, project images, testimonials, and
menu labels with your agency's content. Global header/footer branding uses the
local defaults rather than the previous company's CMS options.

Configure your own reCAPTCHA site key and backend form handlers before enabling
contact and newsletter submissions. Add your own consent integration if needed;
no company-specific consent account is bundled. Set `PUBLIC_URL` to your deployed
site URL for production. The default GraphQL path is `/content/graphql`.

If serving `public/sitemap.php` through PHP, set the server environment variable
`SITEMAP_SOURCE_URL` to your CMS sitemap URL. It returns HTTP 503 until configured.
The React development server does not execute PHP.

## Vercel deployment

Import this Git repository into Vercel. Set the Root Directory to the folder
containing this `package.json` and `vercel.json` (the repository root if this
theme is the whole repository). The committed configuration selects Create React
App, installs with `npm ci`, runs `npm run build:vercel`, and serves `build`.
Keep the dashboard build settings aligned with this configuration.

Production and preview deployments always use demo data. The Vercel build script
forces `REACT_APP_DEMO_MODE=true`, clears WordPress and reCAPTCHA settings, and
uses root-relative assets even if older project environment variables exist.
No backend or extra environment variables are needed. Forms remain demo-only.
The SPA rewrite supports opening and refreshing nested URLs directly.

Run `CI=true npm run build:vercel` to check the same build locally. This removes
the PHP sitemap proxy from the static output; the original PHP file remains
available for non-Vercel WordPress hosting. The regular `npm run build` continues
to respect your demo/WordPress environment setting.

Configuration reference: [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json).

The committed `.npmrc` enables `legacy-peer-deps` to match the existing lockfile.
Keep this file in Git so Vercel and local `npm ci` use the same resolution settings.

## Data loading

`App.js` requests only shared menus, route definitions, and site settings.
Pages and sections request their own content when mounted; Apollo reuses cached
results. Loading indicators and retry controls keep individual content failures
visible without removing the shared header and footer. This applies to both
local demo data and WordPress mode. WordPress installations that restrict allowed
GraphQL operations must allow the component queries as well as `SITE_LAYOUT_QUERY`.
