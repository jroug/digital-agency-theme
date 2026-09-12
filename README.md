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
Existing `.env.development.local` and `.env.production.local` files override
`.env.local`, so update those if present. Run `npm start` for development or
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
