import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { t, language } = useLanguage();
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : language === 'ar' ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f8cdec] rounded-full flex items-center justify-center border-2 border-black">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('cart.title')}</h2>
              <p className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-[#f8cdec] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {t('cart.empty')}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-[#f8cdec] hover:text-black transition-colors"
              >
                {t('cart.continue')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-black truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.price} MAD</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#f8cdec] hover:border-black transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#f8cdec] hover:border-black transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            {/* Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('features.shipping')}</span>
                <span className="text-green-600 font-semibold">
                  {totalPrice >= 500 ? 'FREE' : '50 MAD'}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span>{totalPrice} MAD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-black text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-[#f8cdec] hover:text-black transition-colors border-2 border-black">
              {t('cart.checkout')}
              <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-gray-600 font-semibold hover:text-black transition-colors mt-2"
            >
              {t('cart.continue')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
