import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Truck, RotateCcw, Headphones, ShieldCheck } from 'lucide-react';

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate line progress
            setTimeout(() => {
              setLineProgress(100);
            }, 500);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      key: 'features.shipping',
      descKey: 'features.shippingDesc',
      Icon: Truck,
      color: '#f8cdec',
    },
    {
      key: 'features.returns',
      descKey: 'features.returnsDesc',
      Icon: RotateCcw,
      color: '#ffefc0',
    },
    {
      key: 'features.support',
      descKey: 'features.supportDesc',
      Icon: Headphones,
      color: '#d5eef8',
    },
    {
      key: 'features.secure',
      descKey: 'features.secureDesc',
      Icon: ShieldCheck,
      color: '#f8e5d5',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl text-black mb-4">
            {t('features.title')}
          </h2>
          <div className="w-24 h-1 bg-[#d5eef8] mx-auto rounded-full" />
        </div>

        {/* Features Grid with Connected Lines */}
        <div className="relative">
          {/* SVG Connection Line */}
          <svg
            className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
            preserveAspectRatio="none"
          >
            <line
              x1="12.5%"
              y1="50%"
              x2="87.5%"
              y2="50%"
              stroke="#000"
              strokeWidth="2"
              strokeDasharray="8 4"
              strokeLinecap="round"
              style={{
                strokeDashoffset: `${(100 - lineProgress) * 10}`,
                transition: 'stroke-dashoffset 1.5s ease-in-out',
              }}
            />
          </svg>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const { Icon, color, key, descKey } = feature;
              return (
                <div
                  key={key}
                  className={`relative group transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Icon Circle */}
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center border-3 border-black mb-6 relative z-10 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    >
                      <Icon size={36} strokeWidth={2} />
                      
                      {/* Pulse Effect */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: color }}
                      />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-bold text-black mb-2">
                      {t(key)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(descKey)}
                    </p>
                  </div>

                  {/* Connection Dot */}
                  <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-20" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '100+', label: 'Products' },
            { value: '24h', label: 'Fast Delivery' },
            { value: '4.9', label: 'Rating' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 4) * 200}ms` }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
