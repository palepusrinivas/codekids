# SEO Implementation Guide for CodeKids React App

## Overview
This React application now has comprehensive SEO support using `react-helmet-async` and custom SEO components.

## What's Included

### 1. SEO Component (`src/components/SEO.tsx`)
A reusable SEO component that handles:
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Robots meta tags
- ✅ Structured Data (JSON-LD)
- ✅ Theme colors

### 2. SEO Utilities (`src/lib/seo-utils.ts`)
Helper functions for generating structured data:
- Organization structured data
- Course structured data
- Breadcrumb structured data
- FAQ structured data
- LocalBusiness structured data

## How to Use

### Basic Usage
```tsx
import SEO from '@/components/SEO';

function MyPage() {
  return (
    <>
      <SEO
        title="My Page Title"
        description="Page description for SEO"
        keywords="keyword1, keyword2, keyword3"
        canonical="https://codekidstech.com/my-page"
      />
      {/* Your page content */}
    </>
  );
}
```

### Advanced Usage with Structured Data
```tsx
import SEO from '@/components/SEO';
import { 
  generateCourseStructuredData, 
  generateBreadcrumbStructuredData 
} from '@/lib/seo-utils';

function CoursePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateCourseStructuredData(
        'Course Name',
        'Course description',
        '₹1000',
        'INR',
        ['Skill 1', 'Skill 2'],
        'Beginner'
      ),
      generateBreadcrumbStructuredData([
        { name: 'Home', url: 'https://codekidstech.com' },
        { name: 'Courses', url: 'https://codekidstech.com/courses' },
      ]),
    ],
  };

  return (
    <>
      <SEO
        title="Course Name"
        description="Course description"
        canonical="https://codekidstech.com/course"
        structuredData={structuredData}
      />
      {/* Your page content */}
    </>
  );
}
```

## SEO Features

### 1. Meta Tags
- Title (with site name suffix)
- Description
- Keywords
- Author
- Robots (index/noindex, follow/nofollow)

### 2. Open Graph (Social Media)
- og:title
- og:description
- og:image
- og:url
- og:type
- og:site_name

### 3. Twitter Cards
- twitter:card
- twitter:title
- twitter:description
- twitter:image
- twitter:creator

### 4. Structured Data (Schema.org)
Supports:
- Organization
- Course
- BreadcrumbList
- FAQPage
- LocalBusiness

## Configuration

Update these values in `src/components/SEO.tsx`:
```tsx
const defaultSEO = {
  siteName: 'CodeKids Technologies',
  siteUrl: 'https://codekidstech.com', // Update with your domain
  twitterHandle: '@codekidstech', // Update with your Twitter handle
  // ... other defaults
};
```

## Best Practices

1. **Unique Titles**: Each page should have a unique, descriptive title
2. **Descriptions**: Keep descriptions between 150-160 characters
3. **Keywords**: Use relevant, natural keywords (don't stuff)
4. **Canonical URLs**: Always set canonical URLs to avoid duplicate content
5. **Structured Data**: Use structured data for better search visibility
6. **Images**: Use high-quality images (1200x630px) for Open Graph

## Testing SEO

### Tools to Test:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Schema Markup Validator**: https://validator.schema.org/

### Check:
- ✅ Meta tags are present
- ✅ Open Graph tags work
- ✅ Structured data is valid
- ✅ Canonical URLs are correct
- ✅ Images load properly

## Additional SEO Tips

1. **Sitemap**: Create a `sitemap.xml` file
2. **robots.txt**: Add a `robots.txt` file in public folder
3. **Performance**: Optimize images and use lazy loading
4. **Mobile**: Ensure responsive design (already implemented)
5. **HTTPS**: Use HTTPS in production
6. **Analytics**: Add Google Analytics or similar

## Example: Complete Page with SEO

```tsx
import SEO from '@/components/SEO';
import { generateFAQStructuredData } from '@/lib/seo-utils';

const faqs = [
  {
    question: 'What age groups do you cater to?',
    answer: 'We cater to students aged 6-17 for CodeKids Jr programs.',
  },
  // ... more FAQs
];

export default function MyPage() {
  return (
    <>
      <SEO
        title="Page Title"
        description="Page description"
        keywords="keyword1, keyword2"
        canonical="https://codekidstech.com/page"
        ogImage="/assest/image.jpg"
        structuredData={generateFAQStructuredData(faqs)}
      />
      <div>
        {/* Your content */}
      </div>
    </>
  );
}
```

## Next Steps

1. Update `siteUrl` in SEO component with your actual domain
2. Update social media handles
3. Add structured data to all pages
4. Create sitemap.xml
5. Add robots.txt
6. Set up Google Search Console
7. Submit sitemap to Google

