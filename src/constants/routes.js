export const ROUTES = {
  HOME: '/',
  HOW_IT_WORKS: '/how-it-works',
  ABOUT: '/about',
  SIGNUP: '/signup',
  LOGIN: '/login',
  
  // Services
  SERVICES: '/services',
  SERVICES_DOMESTIC: '/services/domestic',
  SERVICES_INTERNATIONAL: '/services/international',
  
  // Vehicles
  VEHICLES: '/vehicles',
  VEHICLES_CARS: '/vehicles/cars',
  VEHICLES_COMMERCIAL: '/vehicles/commercial',
  VEHICLES_SPECIALTY: '/vehicles/specialty',
  
  // Main Service Pages
  DOMESTIC: '/domestic',
  INTERNATIONAL: '/international',
  INTERNATIONAL_METHODS: '/international/methods',
  INTERNATIONAL_COUNTRIES: '/international/countries',
  INTERNATIONAL_DOCUMENTATION: '/international/documentation',
  INSURANCE: '/insurance',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_QUOTE: '/dashboard/quote',
  DASHBOARD_QUOTES: '/dashboard/quotes',
  DASHBOARD_BOOKINGS: '/dashboard/bookings',
  DASHBOARD_TRACK: '/dashboard/track',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_PAYMENTS: '/dashboard/payments',
  DASHBOARD_DOCUMENTS: '/dashboard/documents',
  DASHBOARD_SUPPORT: '/dashboard/support',
  
  // Help & Support
  HELP: '/help',
  HELP_FAQ: '/help/faq',
  HELP_SUPPORT: '/help/support',
  HELP_GUIDES: '/help/guides',
  
  // Resources
  RESOURCES: '/resources',
  RESOURCES_DOCUMENTS: '/resources/documents',
  RESOURCES_CALCULATORS: '/resources/calculators',
  
  // Partners
  PARTNERS: '/partners',
  PARTNERS_TRANSPORTERS: '/partners/transporters',
  PARTNERS_DEALERS: '/partners/dealers',
  PARTNERS_CORPORATE: '/partners/corporate',
  
  // Business
  CAREERS: '/careers',
  NEWS: '/news',
  CASE_STUDIES: '/case-studies',
  
  // Legal
  LEGAL_TERMS: '/legal/terms',
  LEGAL_PRIVACY: '/legal/privacy',
  LEGAL_REFUNDS: '/legal/refunds',
  LEGAL_INSURANCE_TERMS: '/legal/insurance-terms',
  LEGAL_INTERNATIONAL_TERMS: '/legal/international-terms',
  LEGAL_DATA_PROTECTION: '/legal/data-protection',
  
  // Other
  COMPLIANCE: '/compliance',
  APP: '/app',
  DEVELOPERS: '/developers',
  DEVELOPERS_API: '/developers/api',
  DEVELOPERS_PARTNERS: '/developers/partners',
  DEVELOPERS_WEBHOOKS: '/developers/webhooks',
  DEVELOPERS_LIMITS: '/developers/limits',
  
  // Promotional
  CORPORATE_DISCOUNT: '/corporate-discount',
  BULK_OFFERS: '/bulk-offers',
  INTERNATIONAL_PROMO: '/international-promo',
  REFER_AND_EARN: '/refer-and-earn'
};

export const MAIN_NAVIGATION = [
  { name: 'How It Works', href: ROUTES.HOW_IT_WORKS },
  { name: 'Services', href: ROUTES.SERVICES },
  { name: 'International', href: ROUTES.INTERNATIONAL },
  { name: 'About Us', href: ROUTES.ABOUT },
  { name: 'Help', href: ROUTES.HELP }
];

export const DASHBOARD_NAVIGATION = [
  { name: 'Overview', href: ROUTES.DASHBOARD, icon: 'home' },
  { name: 'Get Quote', href: ROUTES.DASHBOARD_QUOTE, icon: 'plus' },
  { name: 'My Quotes', href: ROUTES.DASHBOARD_QUOTES, icon: 'file-text' },
  { name: 'My Bookings', href: ROUTES.DASHBOARD_BOOKINGS, icon: 'package' },
  { name: 'Track Shipment', href: ROUTES.DASHBOARD_TRACK, icon: 'map-pin' },
  { name: 'Documents', href: ROUTES.DASHBOARD_DOCUMENTS, icon: 'folder' },
  { name: 'Payments', href: ROUTES.DASHBOARD_PAYMENTS, icon: 'credit-card' },
  { name: 'Profile', href: ROUTES.DASHBOARD_PROFILE, icon: 'user' },
  { name: 'Support', href: ROUTES.DASHBOARD_SUPPORT, icon: 'help-circle' }
];

export const FOOTER_NAVIGATION = {
  services: [
    { name: 'Domestic Transport', href: ROUTES.SERVICES_DOMESTIC },
    { name: 'International Shipping', href: ROUTES.SERVICES_INTERNATIONAL },
    { name: 'Vehicle Types', href: ROUTES.VEHICLES },
    { name: 'Insurance', href: ROUTES.INSURANCE }
  ],
  support: [
    { name: 'Help Center', href: ROUTES.HELP },
    { name: 'FAQ', href: ROUTES.HELP_FAQ },
    { name: 'Contact Support', href: ROUTES.HELP_SUPPORT },
    { name: 'Guides', href: ROUTES.HELP_GUIDES }
  ],
  company: [
    { name: 'About Us', href: ROUTES.ABOUT },
    { name: 'Careers', href: ROUTES.CAREERS },
    { name: 'News', href: ROUTES.NEWS },
    { name: 'Case Studies', href: ROUTES.CASE_STUDIES }
  ],
  legal: [
    { name: 'Terms of Service', href: ROUTES.LEGAL_TERMS },
    { name: 'Privacy Policy', href: ROUTES.LEGAL_PRIVACY },
    { name: 'Refund Policy', href: ROUTES.LEGAL_REFUNDS }
  ],
  partners: [
    { name: 'Partner With Us', href: ROUTES.PARTNERS },
    { name: 'For Transporters', href: ROUTES.PARTNERS_TRANSPORTERS },
    { name: 'Corporate Solutions', href: ROUTES.PARTNERS_CORPORATE }
  ]
}; 