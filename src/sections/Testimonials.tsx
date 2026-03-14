import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { testimonials } from '../data/products';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const getTestimonialText = (testimonial: typeof testimonials[0]) => {
    if (language === 'fr') return testimonial.textFr;
    if (language === 'ar') return testimonial.textAr;
    return testimonial.text;
  };

  const getTestimonialName = (testimonial: typeof testimonials[0]) => {
    if (language === 'ar') return testimonial.nameAr;
    return testimonial.name;
  };

  // Position configurations for cloud layout
  const positions = [
    { top: '5%', left: '5%', delay: 0, floatDelay: 0 },
    { top: '10%', right: '10%', delay: 0.2, floatDelay: 1 },
    { top: '45%', left: '15%', delay: 0.4, floatDelay: 2 },
    { top: '50%', right: '5%', delay: 0.6, floatDelay: 0.5 },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#d5eef8] relative overflow-hidden min-h-[800px]"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#f8cdec] rounded-full opacity-50 animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#ffefc0] rounded-full opacity-50 animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#f8e5d5] rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl text-black mb-4">
            {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full mb-4" />
          <p className="text-gray-700">{t('testimonials.subtitle')}</p>
        </div>

        {/* Testimonials Cloud Layout */}
        <div className="relative h-[600px]">
          {testimonials.map((testimonial, index) => {
            const pos = positions[index];
            return (
              <div
                key={testimonial.id}
                className={`absolute w-full sm:w-[400px] transition-all duration-700 cursor-pointer ${
                  isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                } ${
                  activeIndex === index
                    ? 'z-20 scale-105'
                    : activeIndex !== null
                    ? 'z-10 opacity-60'
                    : 'z-10'
                }`}
                style={{
                  ...pos,
                  transitionDelay: `${pos.delay}s`,
                  animation: `float ${6 + pos.floatDelay}s ease-in-out infinite`,
                  animationDelay: `${pos.floatDelay}s`,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="bg-white rounded-3xl p-6 border-2 border-black shadow-lg hover:shadow-xl transition-shadow">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-2 w-10 h-10 bg-[#f8cdec] rounded-full flex items-center justify-center border-2 border-black">
                    <Quote size={18} className="text-black" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="#ffefc0"
                        stroke="#ffefc0"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                    "{getTestimonialText(testimonial)}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={getTestimonialName(testimonial)}
                      className="w-12 h-12 rounded-full border-2 border-black object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-black">
                        {getTestimonialName(testimonial)}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Verified Buyer' : language === 'fr' ? 'Acheteur Vérifié' : 'مشتري موثق'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Stack Layout */}
        <div className="md:hidden space-y-4 mt-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={`mobile-${testimonial.id}`}
              className={`bg-white rounded-3xl p-6 border-2 border-black transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffefc0" stroke="#ffefc0" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                "{getTestimonialText(testimonial)}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={getTestimonialName(testimonial)}
                  className="w-10 h-10 rounded-full border-2 border-black object-cover"
                />
                <h4 className="font-semibold text-sm">
                  {getTestimonialName(testimonial)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
