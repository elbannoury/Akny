import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.categories': 'Categories',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    
    // Hero
    'hero.title': 'Style Playground',
    'hero.subtitle': 'Where Comfort Meets Joy',
    'hero.cta': 'Shop Collection',
    'hero.scroll': 'Scroll to explore',
    
    // Categories
    'categories.title': 'Shop by Category',
    'categories.boys': 'Boys',
    'categories.girls': 'Girls',
    'categories.newborn': 'New Born',
    'categories.accessories': 'Accessories',
    'categories.shopNow': 'Shop Now',
    
    // Offers
    'offers.weekend': 'Weekend Sale',
    'offers.new': 'New Arrivals',
    'offers.trending': 'Trending Now',
    'offers.upTo': 'Up to',
    'offers.off': 'OFF',
    'offers.explore': 'Explore',
    
    // Products
    'products.title': 'Curated Picks',
    'products.addToCart': 'Add to Cart',
    'products.viewAll': 'View All Products',
    'products.filter': 'Filter by',
    'products.sort': 'Sort by',
    
    // Testimonials
    'testimonials.title': 'Happy Parents',
    'testimonials.subtitle': 'What families say about us',
    
    // Features
    'features.title': 'Why Choose Us',
    'features.shipping': 'Free Shipping',
    'features.shippingDesc': 'On orders over 500 MAD',
    'features.returns': 'Easy Returns',
    'features.returnsDesc': '30-day return policy',
    'features.support': '24/7 Support',
    'features.supportDesc': 'Always here to help',
    'features.secure': 'Secure Payment',
    'features.secureDesc': '100% secure checkout',
    
    // Instagram
    'instagram.title': '#AkKids',
    'instagram.subtitle': 'Follow us for daily inspiration',
    'instagram.follow': 'Follow @akkids',
    
    // Footer
    'footer.newsletter': 'Join the Fun',
    'footer.newsletterDesc': 'Subscribe for exclusive offers and updates',
    'footer.email': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.links': 'Quick Links',
    'footer.help': 'Help & Support',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.inMorocco': 'in Morocco',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continue': 'Continue Shopping',
    'cart.checkout': 'Checkout',
    'cart.total': 'Total',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    
    // Common
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.language': 'Language',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.categories': 'Catégories',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    
    // Hero
    'hero.title': 'Parcours de Style',
    'hero.subtitle': 'Où le Confort Rencontre la Joie',
    'hero.cta': 'Voir la Collection',
    'hero.scroll': 'Défiler pour explorer',
    
    // Categories
    'categories.title': 'Acheter par Catégorie',
    'categories.boys': 'Garçons',
    'categories.girls': 'Filles',
    'categories.newborn': 'Nouveau-né',
    'categories.accessories': 'Accessoires',
    'categories.shopNow': 'Acheter',
    
    // Offers
    'offers.weekend': 'Soldes du Weekend',
    'offers.new': 'Nouveautés',
    'offers.trending': 'Tendances',
    'offers.upTo': 'Jusqu\'à',
    'offers.off': 'DE RÉDUCTION',
    'offers.explore': 'Explorer',
    
    // Products
    'products.title': 'Sélection Curée',
    'products.addToCart': 'Ajouter au Panier',
    'products.viewAll': 'Voir Tous les Produits',
    'products.filter': 'Filtrer par',
    'products.sort': 'Trier par',
    
    // Testimonials
    'testimonials.title': 'Parents Heureux',
    'testimonials.subtitle': 'Ce que les familles disent de nous',
    
    // Features
    'features.title': 'Pourquoi Nous Choisir',
    'features.shipping': 'Livraison Gratuite',
    'features.shippingDesc': 'Sur les commandes de 500+ MAD',
    'features.returns': 'Retours Faciles',
    'features.returnsDesc': 'Politique de retour 30 jours',
    'features.support': 'Support 24/7',
    'features.supportDesc': 'Toujours là pour vous aider',
    'features.secure': 'Paiement Sécurisé',
    'features.secureDesc': 'Paiement 100% sécurisé',
    
    // Instagram
    'instagram.title': '#AkKids',
    'instagram.subtitle': 'Suivez-nous pour l\'inspiration quotidienne',
    'instagram.follow': 'Suivre @akkids',
    
    // Footer
    'footer.newsletter': 'Rejoignez le Fun',
    'footer.newsletterDesc': 'Abonnez-vous pour des offres exclusives',
    'footer.email': 'Entrez votre email',
    'footer.subscribe': 'S\'abonner',
    'footer.links': 'Liens Rapides',
    'footer.help': 'Aide & Support',
    'footer.contact': 'Contactez-nous',
    'footer.rights': 'Tous droits réservés.',
    'footer.madeWith': 'Fait avec',
    'footer.inMorocco': 'au Maroc',
    
    // Cart
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.continue': 'Continuer vos Achats',
    'cart.checkout': 'Commander',
    'cart.total': 'Total',
    'cart.remove': 'Retirer',
    'cart.quantity': 'Quantité',
    
    // Common
    'common.close': 'Fermer',
    'common.loading': 'Chargement...',
    'common.search': 'Rechercher',
    'common.language': 'Langue',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'تسوق',
    'nav.categories': 'الفئات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.cart': 'سلة التسوق',
    
    // Hero
    'hero.title': 'ملعب الأناقة',
    'hero.subtitle': 'حيث يلتقي الراحة بالفرح',
    'hero.cta': 'تسوق المجموعة',
    'hero.scroll': 'مرر للاستكشاف',
    
    // Categories
    'categories.title': 'تسوق حسب الفئة',
    'categories.boys': 'أولاد',
    'categories.girls': 'بنات',
    'categories.newborn': 'حديثي الولادة',
    'categories.accessories': 'إكسسوارات',
    'categories.shopNow': 'تسوق الآن',
    
    // Offers
    'offers.weekend': 'تخفيضات الويكند',
    'offers.new': 'وصل حديثاً',
    'offers.trending': 'الأكثر رواجاً',
    'offers.upTo': 'خصم يصل إلى',
    'offers.off': '%',
    'offers.explore': 'استكشف',
    
    // Products
    'products.title': 'منتجات مختارة',
    'products.addToCart': 'أضف إلى السلة',
    'products.viewAll': 'عرض جميع المنتجات',
    'products.filter': 'تصفية حسب',
    'products.sort': 'ترتيب حسب',
    
    // Testimonials
    'testimonials.title': 'آباء سعداء',
    'testimonials.subtitle': 'ماذا يقول عنا الأهل',
    
    // Features
    'features.title': 'لماذا تختارنا',
    'features.shipping': 'شحن مجاني',
    'features.shippingDesc': 'للطلبات فوق 500 درهم',
    'features.returns': 'إرجاع سهل',
    'features.returnsDesc': 'سياسة إرجاع 30 يوماً',
    'features.support': 'دعم 24/7',
    'features.supportDesc': 'دائماً هنا للمساعدة',
    'features.secure': 'دفع آمن',
    'features.secureDesc': 'دفع 100% آمن',
    
    // Instagram
    'instagram.title': '#AkKids',
    'instagram.subtitle': 'تابعنا للإلهام اليومي',
    'instagram.follow': 'تابع @akkids',
    
    // Footer
    'footer.newsletter': 'انضم إلى المرح',
    'footer.newsletterDesc': 'اشترك للحصول على عروض حصرية',
    'footer.email': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.links': 'روابط سريعة',
    'footer.help': 'المساعدة والدعم',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.madeWith': 'صنع بـ',
    'footer.inMorocco': 'في المغرب',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلة التسوق فارغة',
    'cart.continue': 'مواصلة التسوق',
    'cart.checkout': 'إتمام الشراء',
    'cart.total': 'المجموع',
    'cart.remove': 'إزالة',
    'cart.quantity': 'الكمية',
    
    // Common
    'common.close': 'إغلاق',
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.language': 'اللغة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  }, [language]);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
