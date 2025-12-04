import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: object;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultSEO = {
  siteName: 'CodeKids Technologies',
  defaultTitle: 'CodeKids Technologies | Best Coding Courses for Kids & Students | STEM Education India',
  defaultDescription: 'CodeKids Technologies offers the best coding courses for kids, robotics training for students, AI & ML programs, and job-ready tech skills. Leading STEM education platform in India for schools and colleges.',
  defaultKeywords: 'coding for kids, robotics for children, AI education, STEM programs, coding courses, tech education India, programming for kids',
  siteUrl: 'https://codekidstech.com', // Update with your actual domain
  defaultOgImage: '/assest/codekids_finallogo.jpg',
  twitterHandle: '@codekidstech', // Update with your actual Twitter handle
};

export default function SEO({
  title,
  description,
  keywords,
  author = 'CodeKids Technologies',
  canonical,
  ogImage = defaultSEO.defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const pageTitle = title 
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle;
  
  const pageDescription = description || defaultSEO.defaultDescription;
  const pageKeywords = keywords || defaultSEO.defaultKeywords;
  const pageCanonical = canonical || '';
  const fullOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `${defaultSEO.siteUrl}${ogImage}`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      {pageCanonical && <link rel="canonical" href={pageCanonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageCanonical || defaultSEO.siteUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={pageCanonical || defaultSEO.siteUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      {defaultSEO.twitterHandle && (
        <meta name="twitter:creator" content={defaultSEO.twitterHandle} />
      )}
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#FF4FD8" />
      <meta name="msapplication-TileColor" content="#FF4FD8" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

