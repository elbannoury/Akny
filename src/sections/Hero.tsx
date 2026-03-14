import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, Sparkles, Star, Heart } from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingShapes = [
    { Icon: Star, color: '#f8cdec', size: 40, delay: 0, x: '10%', y: '20%' },
    { Icon: Heart, color: '#ffefc0', size: 35, delay: 1, x: '85%', y: '15%' },
    { Icon: Sparkles, color: '#d5eef8', size: 45, delay: 2, x: '75%', y: '75%' },
    { Icon: Star, color: '#f8e5d5', size: 30, delay: 0.5, x: '15%', y: '70%' },
    { Icon: Heart, color: '#d5f8e8', size: 38, delay: 1.5, x: '90%', y: '50%' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src="/images/hero-main.jpg"
          alt="Happy kids jumping"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
      </div>

      {/* Floating Shapes */}
      {floatingShapes.map((shape, index) => (
        <div
          key={index}
          className="absolute z-10 pointer-events-none"
          style={{
            left: shape.x,
            top: shape.y,
            animation: `float ${6 + index}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
            transform: `translate(${mousePos.x * (index + 1)}px, ${mousePos.y * (index + 1)}px)`,
          }}
        >
          <shape.Icon
            size={shape.size}
            fill={shape.color}
            stroke="none"
            className="opacity-80"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#f8cdec] border-2 border-black transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <Sparkles size={16} className="text-black" />
            <span className="text-sm font-semibold text-black">
              {language === 'en' ? 'New Collection 2024' : language === 'fr' ? 'Nouvelle Collection 2024' : 'مجموعة جديدة 2024'}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`font-display text-6xl sm:text-7xl lg:text-8xl text-black mb-4 text-shadow-playful transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl sm:text-2xl text-gray-700 mb-8 font-medium transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.8s' }}
          >
            <button className="group relative px-8 py-4 bg-black text-white font-bold text-lg rounded-full border-3 border-black hover-squish animate-pulse-glow overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.cta')}
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f8cdec] via-[#ffefc0] to-[#d5eef8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full border-3 border-black hover-squish hover:bg-[#f8cdec] transition-colors">
              {language === 'en' ? 'View Lookbook' : language === 'fr' ? 'Voir le Lookbook' : 'عرض المجموعة'}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1s' }}
      >
        <span className="text-sm font-medium text-gray-600">{t('hero.scroll')}</span>
        <ChevronDown size={24} className="animate-bounce text-black" />
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
