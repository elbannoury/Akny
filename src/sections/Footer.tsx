import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.shop'), href: '#products' },
    { label: t('nav.categories'), href: '#categories' },
    { label: t('nav.about'), href: '#features' },
  ];

  const helpLinks = [
    { label: t('footer.contact'), href: '#' },
    { label: t('features.shipping'), href: '#' },
    { label: t('features.returns'), href: '#' },
    { label: t('features.support'), href: '#' },
  ];

  return (
    <footer id="footer" className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-4xl sm:text-5xl mb-4">
                {t('footer.newsletter')}
              </h3>
              <p className="text-gray-400">
                {t('footer.newsletterDesc')}
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.email')}
                  className="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#f8cdec] transition-colors"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-[#f8cdec] text-black font-bold rounded-full hover:bg-[#ffefc0] transition-colors flex items-center gap-2"
              >
                {t('footer.subscribe')}
                <Send size={18} className={language === 'ar' ? 'rotate-180' : ''} />
              </button>
            </form>
            {isSubscribed && (
              <div className="lg:col-start-2 text-[#f8cdec] font-semibold animate-bounce-in">
                {language === 'en'
                  ? 'Thank you for subscribing!'
                  : language === 'fr'
                  ? 'Merci de vous être abonné !'
                  : 'شكراً للاشتراك!'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-[#f8cdec] rounded-full flex items-center justify-center border-2 border-white">
                <span className="font-display text-2xl font-bold text-black">Ak</span>
              </div>
              <span className="font-display text-3xl font-bold">Kids</span>
            </div>
            <p className="text-gray-400 mb-6">
              {language === 'en'
                ? 'Premium kids clothing brand from Morocco. Style, comfort, and joy for every child.'
                : language === 'fr'
                ? 'Marque de vêtements premium pour enfants du Maroc. Style, confort et joie pour chaque enfant.'
                : 'علامة ملابس أطفال فاخرة من المغرب. الأناقة والراحة والفرح لكل طفل.'}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f8cdec] hover:text-black transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f8cdec] hover:text-black transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f8cdec] hover:text-black transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#f8cdec] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.help')}</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#f8cdec] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#f8cdec] flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Avenue Mohammed V<br />
                  Casablanca, Morocco
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#f8cdec] flex-shrink-0" />
                <span className="text-gray-400">+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#f8cdec] flex-shrink-0" />
                <span className="text-gray-400">hello@akkids.ma</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Ak Kids. {t('footer.rights')}
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              {t('footer.madeWith')} <Heart size={14} fill="#f8cdec" className="text-[#f8cdec]" />{' '}
              {t('footer.inMorocco')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
