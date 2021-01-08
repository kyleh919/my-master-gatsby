import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query siteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  return (
    // titleTemplate -> anytime we specify a title tag, it will automatically append
    //  Slicks Slices at the end now. Rather than hardcoding the titleTemplate...
    //  we can do a static GraphQL query to obtain the siteMetadata.title in gatsby-config.js
    //  (shown above)
    // <Helemet titleTemplate="%s - Slicks Slices">
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      {/* so the browser knows what language your website is in */}
      <html lang="en" />
      <title>{title}</title>

      {/* fav icons */}
      {/* by default, it looks in the static directory and looks for a
            .ico file. we overwrite it here with an svg but should always
            have a .ico file in case browsers don't support .svg icons
      */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />

      {/* meta tags */}
      {/* type meta: to see defaults, we picked meta:vp and provides the following */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />

      {/* open graph -> specification for things like facebook, pinterest, etc that
            looks for information on your website
      */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />

      {/* in case you want to add any tags from a component */}
      {children}
    </Helmet>
  );
}
