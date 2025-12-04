/**
 * SEO Utility Functions
 * Helper functions for generating structured data and SEO metadata
 */

export interface OrganizationStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface CourseStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  courseCode?: string;
  educationalLevel?: string;
  teaches?: string[];
  inLanguage?: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export interface BreadcrumbStructuredData {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationStructuredData(): OrganizationStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'CodeKids Technologies',
    url: 'https://codekidstech.com',
    logo: 'https://codekidstech.com/assest/codekids_finallogo.jpg',
    description: 'CodeKids Technologies offers the best coding courses for kids, robotics training for students, AI & ML programs, and job-ready tech skills.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot no 264, Flat no 102 & 202, Road no 14, Swamy Ayyappa society',
      addressLocality: 'Madhapur',
      addressRegion: 'Telangana',
      postalCode: '500081',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8008937902',
      contactType: 'Customer Service',
      email: 'codekidstech2025@gmail.com',
    },
    sameAs: [
      'https://www.facebook.com/codekidstech',
      'https://www.instagram.com/codekidstech',
      'https://www.linkedin.com/company/codekidstech',
      'https://twitter.com/codekidstech',
    ],
  };
}

/**
 * Generate Course structured data
 */
export function generateCourseStructuredData(
  courseName: string,
  description: string,
  price?: string,
  priceCurrency: string = 'INR',
  teaches: string[] = [],
  educationalLevel?: string
): CourseStructuredData {
  const courseData: CourseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'CodeKids Technologies',
      url: 'https://codekidstech.com',
    },
    teaches: teaches,
    inLanguage: 'en-IN',
  };

  if (educationalLevel) {
    courseData.educationalLevel = educationalLevel;
  }

  if (price) {
    courseData.offers = {
      '@type': 'Offer',
      price: price,
      priceCurrency: priceCurrency,
      availability: 'https://schema.org/InStock',
    };
  }

  return courseData;
}

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): BreadcrumbStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CodeKids Technologies',
    image: 'https://codekidstech.com/assest/codekids_finallogo.jpg',
    '@id': 'https://codekidstech.com',
    url: 'https://codekidstech.com',
    telephone: '+91-8008937902',
    email: 'codekidstech2025@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot no 264, Flat no 102 & 202, Road no 14, Swamy Ayyappa society',
      addressLocality: 'Madhapur',
      addressRegion: 'Telangana',
      postalCode: '500081',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.4486, // Update with actual coordinates
      longitude: 78.3908, // Update with actual coordinates
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    priceRange: '₹₹',
    servesCuisine: 'Educational Technology Services',
  };
}

