import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦' },
];

export default function Navigation() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { totalItems, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'nav.home', href: '#hero' },
    { key: 'nav.categories', href: '#categories' },
    { key: 'nav.shop', href: '#products' },
    { key: 'nav.about', href: '#features' },
    { key: 'nav.contact', href: '#footer' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-[#f8cdec] rounded-full flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                <span className="font-display text-xl font-bold">Ak</span>
              </div>
              <span
                className={`font-display text-2xl font-bold ${
                  isScrolled ? 'text-black' : 'text-black'
                }`}
              >
                Kids
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className={`text-sm font-semibold hover:text-[#f8cdec] transition-colors relative group ${
                    isScrolled ? 'text-black' : 'text-black'
                  }`}
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8cdec] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 border-black hover:bg-[#f8cdec] transition-colors ${
                    isScrolled ? 'bg-white' : 'bg-white/80'
                  }`}
                >
                  <Globe size={18} />
                  <span className="text-sm font-semibold uppercase">{language}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isLangMenuOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-xl border-2 border-black shadow-lg overflow-hidden min-w-[150px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'en' | 'fr' | 'ar');
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f8cdec] transition-colors ${
                          language === lang.code ? 'bg-[#f8cdec]' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setIsOpen(true)}
                className={`relative p-3 rounded-full border-2 border-black hover:bg-[#f8cdec] transition-colors ${
                  isScrolled ? 'bg-white' : 'bg-white/80'
                }`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f8cdec] text-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-black">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-full border-2 border-black bg-white hover:bg-[#f8cdec] transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : dir === 'rtl' ? 'translate-x-full' : 'translate-x-[-100%]'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-[#f8cdec] transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
          
          {/* Mobile Language Selector */}
          <div className="flex gap-4 mt-8">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'fr' | 'ar');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-full border-2 border-black ${
                  language === lang.code ? 'bg-[#f8cdec]' : 'bg-white'
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
