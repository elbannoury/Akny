import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { offers } from '../data/products';
import { ArrowRight, Sparkles, TrendingUp, Percent } from 'lucide-react';

export default function Offers() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getOfferTitle = (offer: typeof offers[0]) => {
    if (language === 'fr') return offer.titleFr;
    if (language === 'ar') return offer.titleAr;
    return offer.title;
  };

  const getOfferSubtitle = (offer: typeof offers[0]) => {
    if (language === 'fr') return offer.subtitleFr;
    if (language === 'ar') return offer.subtitleAr;
    return offer.subtitle;
  };

  const getOfferIcon = (offer: typeof offers[0]) => {
    if (offer.isNew) return Sparkles;
    if (offer.isTrending) return TrendingUp;
    return Percent;
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#f8e5d5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-black mb-2">
              {language === 'en' ? 'Special Offers' : language === 'fr' ? 'Offres Spéciales' : 'عروض خاصة'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' ? 'Don\'t miss out on these amazing deals!' : language === 'fr' ? 'Ne manquez pas ces offres incroyables !' : 'لا تفوت هذه العروض الرائعة!'}
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
            {t('offers.explore')}
            <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto pb-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {offers.map((offer, index) => {
          const Icon = getOfferIcon(offer);
          return (
            <div
              key={offer.id}
              className={`flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[40vw] group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div
                className="relative h-[400px] rounded-3xl overflow-hidden border-3 border-black cursor-pointer"
                style={{ backgroundColor: offer.color }}
              >
                {/* Background Image */}
                <img
                  src={offer.image}
                  alt={getOfferTitle(offer)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black"
                    >
                      <Icon size={18} />
                      <span className="text-sm font-bold">
                        {getOfferTitle(offer)}
                      </span>
                    </div>
                    
                    {offer.discount && (
                      <div className="w-16 h-16 rounded-full bg-[#f8cdec] border-2 border-black flex items-center justify-center animate-bounce-in">
                        <span className="text-lg font-bold">{offer.discount}%</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Content */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      {getOfferSubtitle(offer)}
                    </h3>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#f8cdec] transition-colors group/btn">
                      {t('offers.explore')}
                      <ArrowRight
                        size={18}
                        className={`group-hover/btn:translate-x-1 transition-transform ${
                          language === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {offers.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-black/30"
          />
        ))}
      </div>
    </section>
  );
}
