import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaType?: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'Article' | 'Service' | 'WebSite';
  schemaData?: any;
  breadcrumbs?: { name: string; url: string }[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Ayan Web Studio • Premium Web Development & 3D Experiences in Patna, India',
  description = 'Ayan Web Studio engineers high-performance business websites, 3D web applications, e-commerce storefronts, and custom React applications with sub-second page loads and 3-month free maintenance.',
  keywords = 'website design company patna, web development agency bihar, ayan web studio, custom react development, 3d website development, ecommerce website patna, website developer boring road',
  canonicalUrl = 'https://ayanwebstudio.xyz',
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  schemaType = 'LocalBusiness',
  schemaData,
  breadcrumbs
}) => {

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Meta Description & Keywords
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Ayan Web Studio');

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Inject JSON-LD Structured Data Schemas
    const schemaScriptId = 'ayan-studio-schema';
    let existingScript = document.getElementById(schemaScriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = schemaScriptId;
    script.type = 'application/ld+json';

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://ayanwebstudio.xyz/#organization',
      'name': 'Ayan Web Studio',
      'alternateName': 'Ayan Web Design Agency',
      'image': ogImage,
      'logo': 'https://ayanwebstudio.xyz/logo.png',
      'telephone': '+917033221791',
      'email': 'hello@ayanwebstudio.xyz',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Boring Road',
        'addressLocality': 'Patna',
        'addressRegion': 'Bihar',
        'postalCode': '800001',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 25.613333,
        'longitude': 85.116666
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '20:00'
      },
      'url': canonicalUrl,
      'priceRange': '₹11,999 - ₹80,000+',
      'founder': {
        '@type': 'Person',
        'name': 'Ayan',
        'jobTitle': 'Founder & Chief Architect'
      },
      'sameAs': [
        'https://wa.me/917033221791'
      ]
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Ayan Web Studio',
      'url': 'https://ayanwebstudio.xyz'
    };

    const schemas: any[] = [localBusinessSchema, websiteSchema];

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.url
        }))
      };
      schemas.push(breadcrumbSchema);
    }

    if (schemaData) {
      schemas.push(schemaData);
    }

    script.text = JSON.stringify(schemas);
    document.head.appendChild(script);

  }, [title, description, keywords, canonicalUrl, ogImage, schemaType, schemaData, breadcrumbs]);

  return null;
};
