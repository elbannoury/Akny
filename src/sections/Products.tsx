import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

export default function Products() {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getProductName = (product: typeof products[0]) => {
    if (language === 'fr') return product.nameFr;
    if (language === 'ar') return product.nameAr;
    return product.name;
  };

  // Split products into two columns for masonry effect
  const leftColumn = products.filter((_, i) => i % 2 === 0);
  const rightColumn = products.filter((_, i) => i % 2 === 1);

  const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden border-2 border-black transition-all duration-700 hover-lift ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={getProductName(product)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-[#d5eef8] text-black text-xs font-bold rounded-full border-2 border-black">
              {t('offers.new')}
            </span>
          )}
          {product.isSale && (
            <span className="px-3 py-1 bg-[#f8cdec] text-black text-xs font-bold rounded-full border-2 border-black">
              SALE
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center hover:bg-[#f8cdec] transition-colors">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center hover:bg-[#f8cdec] transition-colors">
            <Eye size={18} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 ${
            hoveredProduct === product.id ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: getProductName(product),
                price: product.price,
                image: product.image,
              })
            }
            className="w-full py-3 bg-black text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#f8cdec] hover:text-black transition-colors border-2 border-black"
          >
            <ShoppingCart size={18} />
            {t('products.addToCart')}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < 4 ? '#ffefc0' : 'none'}
              stroke={i < 4 ? '#ffefc0' : '#ccc'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.5)</span>
        </div>
        
        <h3 className="font-semibold text-black mb-2 line-clamp-1">
          {getProductName(product)}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            {product.price} MAD
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice} MAD
            </span>
          )}
        </div>

        {/* Size Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.sizes.slice(0, 3).map((size) => (
            <span
              key={size}
              className="px-2 py-1 text-xs bg-gray-100 rounded-md border border-gray-200"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-md border border-gray-200">
              +{product.sizes.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl text-black mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-1 bg-[#ffefc0] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-md mx-auto">
            {language === 'en'
              ? 'Handpicked styles for your little ones'
              : language === 'fr'
              ? 'Styles sélectionnés pour vos petits'
              : 'أنماط مختارة لأطفالك الصغار'}
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Normal Speed */}
          <div className="flex flex-col gap-6">
            {leftColumn.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index * 2} />
            ))}
          </div>

          {/* Right Column - Offset for Masonry Effect */}
          <div className="flex flex-col gap-6 md:mt-12">
            {rightColumn.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index * 2 + 1} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-[#f8cdec] text-black font-bold rounded-full border-2 border-black hover-squish hover:bg-black hover:text-white transition-colors">
            {t('products.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
}
