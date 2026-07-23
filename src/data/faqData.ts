export interface FAQItem {
  id: string;
  category: 'General' | 'Process & Timeline' | 'Design & Tech' | 'Pricing & Payment' | 'Support';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What services do you provide?',
    answer: 'Ayan Web Studio provides full-stack web development, custom UI/UX design, business websites, e-commerce storefronts, web application development, 3D interactive experiences, website redesigns, search engine optimization (SEO), and post-launch maintenance.'
  },
  {
    id: 'faq-2',
    category: 'Process & Timeline',
    question: 'How long does development take?',
    answer: 'Standard business websites take between 7 to 14 days. Custom web applications and e-commerce stores take 3 to 6 weeks depending on feature complexity. We define a strict milestone schedule before work begins to guarantee on-time delivery.'
  },
  {
    id: 'faq-3',
    category: 'Design & Tech',
    question: 'Do you provide custom designs?',
    answer: 'Yes! Every website crafted by Ayan Web Studio is custom-designed from scratch to align with your brand identity and conversion goals. We do not use generic off-the-shelf templates.'
  },
  {
    id: 'faq-4',
    category: 'Design & Tech',
    question: 'Can I update my website myself?',
    answer: 'Absolutely. We integrate intuitive content management panels (CMS) or custom admin dashboards so you can easily edit text, update photos, post blog articles, and add new products without technical knowledge.'
  },
  {
    id: 'faq-5',
    category: 'Design & Tech',
    question: 'Do you provide an admin panel?',
    answer: 'Yes, an easy-to-use admin dashboard is included in our business and custom web application packages to give you total control over your website content, user inquiries, and site analytics.'
  },
  {
    id: 'faq-6',
    category: 'Design & Tech',
    question: 'Will my website be mobile responsive?',
    answer: 'Yes. Every website is built with a mobile-first philosophy, ensuring liquid-smooth responsiveness and flawless layout rendering across smartphones, tablets, laptops, and ultra-wide desktop monitors.'
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'Do you provide SEO?',
    answer: 'Yes! On-page technical SEO is included standard in every build. This includes meta title & description optimization, structured JSON-LD schemas, sitemap generation, search engine indexing, and Core Web Vitals speed optimization.'
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'Do you redesign existing websites?',
    answer: 'Yes. We specialize in modernizing outdated websites into high-speed, high-converting digital storefronts while preserving existing SEO rankings and URL domain authority.'
  },
  {
    id: 'faq-9',
    category: 'Process & Timeline',
    question: 'Do you provide hosting?',
    answer: 'We assist with cloud hosting configuration on fast global platforms like Vercel, Cloudflare Pages, AWS, or DigitalOcean, ensuring sub-second global response times and free automatic SSL security certificates.'
  },
  {
    id: 'faq-10',
    category: 'Pricing & Payment',
    question: 'How does payment work?',
    answer: 'Our standard terms are structured into milestones: 50% initial deposit upon contract signing, and 50% upon final sign-off and live deployment. Flexible milestone structures are available for enterprise builds.'
  },
  {
    id: 'faq-11',
    category: 'Support',
    question: 'Do you provide maintenance?',
    answer: 'Yes! Every project includes 3 months of complimentary technical support and proactive maintenance after launch. Optional ongoing monthly care plans are available for continuous updates and monitoring.'
  },
  {
    id: 'faq-12',
    category: 'Design & Tech',
    question: 'Can you build custom web applications?',
    answer: 'Yes. We engineer full-stack web applications using React, TypeScript, Node.js, Express, and cloud databases (Supabase, PostgreSQL, Firestore) featuring user authentication, payment processing, and real-time data.'
  },
  {
    id: 'faq-13',
    category: 'Design & Tech',
    question: 'Can you integrate payment gateways?',
    answer: 'Yes. We integrate secure Indian and global payment gateways including Razorpay, UPI, Paytm, Stripe, and PayPal with automated invoice generation and order confirmation receipts.'
  },
  {
    id: 'faq-14',
    category: 'Support',
    question: 'Can I request future updates?',
    answer: 'Yes! After your initial 3-month support period, you can request feature enhancements or content updates on an hourly basis, or enroll in a flexible monthly studio retainer.'
  }
];
