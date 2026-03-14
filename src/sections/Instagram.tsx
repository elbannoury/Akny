import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Instagram as InstagramIcon, Heart, MessageCircle } from 'lucide-react';

const instagramImages = [
  '/images/instagram-1.jpg',
  '/images/instagram-2.jpg',
  '/images/instagram-3.jpg',
  '/images/instagram-4.jpg',
  '/images/instagram-5.jpg',
  '/images/instagram-6.jpg',
];

export default function Instagram() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  // Duplicate images for seamless loop
  const allImages = [...instagramImages, ...instagramImages];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#ffefc0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full border-2 border-black">
            <InstagramIcon size={20} />
            <span className="font-semibold">{t('instagram.title')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-black mb-4">
            {t('instagram.subtitle')}
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-[#f8cdec] hover:text-black transition-colors border-2 border-black"
          >
            <InstagramIcon size={18} />
            {t('instagram.follow')}
          </a>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-4 ${isVisible ? 'animate-marquee' : ''}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'fit-content',
          }}
        >
          {allImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-black">
                <img
                  src={image}
                  alt={`Instagram post ${(index % instagramImages.length) + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart size={24} fill="white" />
                  <span className="font-semibold">
                    {Math.floor(Math.random() * 500) + 100}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle size={24} fill="white" />
                  <span className="font-semibold">
                    {Math.floor(Math.random() * 50) + 10}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Generated Content CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 border-2 border-black text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            {language === 'en'
              ? 'Share Your #AkKids Moments'
              : language === 'fr'
              ? 'Partagez Vos Moments #AkKids'
              : 'شارك لحظاتك مع #AkKids'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {language === 'en'
              ? 'Tag us in your photos for a chance to be featured on our page!'
              : language === 'fr'
              ? 'Taguez-nous sur vos photos pour avoir une chance d\'être mis en avant sur notre page !'
              : 'قم بوسمنا في صورك للحصول على فرصة الظهور في صفحتنا!'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['#AkKids', '#AkStyle', '#KidsFashion', '#MoroccoKids'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[#f8cdec] rounded-full text-sm font-semibold border-2 border-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
