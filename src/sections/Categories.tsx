import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the card animations
            categories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });
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

  const getCategoryName = (category: typeof categories[0]) => {
    if (language === 'fr') return category.nameFr;
    if (language === 'ar') return category.nameAr;
    return category.name;
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl text-black mb-4">
            {t('categories.title')}
          </h2>
          <div className="w-24 h-1 bg-[#f8cdec] mx-auto rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-3xl border-3 border-black cursor-pointer transition-all duration-700 ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0 rotate-0'
                  : 'opacity-0 translate-y-20 rotate-[-5deg]'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: visibleCards[index]
                  ? `rotate(${index % 2 === 0 ? -2 : 2}deg)`
                  : undefined,
              }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={getCategoryName(category)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="bg-white rounded-2xl p-4 border-2 border-black transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-black mb-2">
                    {getCategoryName(category)}
                  </h3>
                  <button className="flex items-center gap-2 text-sm font-semibold text-black hover:text-[#f8cdec] transition-colors">
                    {t('categories.shopNow')}
                    <ArrowRight
                      size={16}
                      className={`transition-transform group-hover:translate-x-1 ${
                        language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Corner Badge */}
              <div
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center border-2 border-black"
                style={{ backgroundColor: category.color }}
              >
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
