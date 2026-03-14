export interface Product {
  id: number;
  name: string;
  nameFr: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'boys' | 'girls' | 'newborn' | 'accessories';
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    nameFr: 'T-Shirt Blanc Classique',
    nameAr: 'تيشيرت أبيض كلاسيكي',
    price: 149,
    originalPrice: 199,
    image: '/images/product-tshirt.jpg',
    category: 'boys',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['White', 'Blue', 'Pink'],
    isSale: true,
  },
  {
    id: 2,
    name: 'Denim Jeans',
    nameFr: 'Jean en Denim',
    nameAr: 'جينز دنيم',
    price: 299,
    image: '/images/product-jeans.jpg',
    category: 'boys',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Blue', 'Light Blue'],
    isNew: true,
  },
  {
    id: 3,
    name: 'White Sneakers',
    nameFr: 'Baskets Blanches',
    nameAr: 'حذاء رياضي أبيض',
    price: 349,
    image: '/images/product-shoes.jpg',
    category: 'accessories',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['White', 'Pink'],
  },
  {
    id: 4,
    name: 'Rainbow Hoodie',
    nameFr: 'Sweat à Capuche Arc-en-ciel',
    nameAr: 'هودي قوس قزح',
    price: 249,
    originalPrice: 299,
    image: '/images/product-hoodie.jpg',
    category: 'girls',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Pink', 'Yellow', 'Blue'],
    isSale: true,
  },
  {
    id: 5,
    name: 'Floral Dress',
    nameFr: 'Robe à Fleurs',
    nameAr: 'فستان زهري',
    price: 279,
    image: '/images/product-dress.jpg',
    category: 'girls',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Blue', 'Pink'],
    isNew: true,
  },
  {
    id: 6,
    name: 'Adventure Shorts',
    nameFr: 'Short d\'Aventure',
    nameAr: 'شورت مغامرات',
    price: 179,
    image: '/images/product-shorts.jpg',
    category: 'boys',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Khaki', 'Navy', 'Green'],
  },
  {
    id: 7,
    name: 'Bear Backpack',
    nameFr: 'Sac à Dos Ours',
    nameAr: 'حقيبة ظهر دب',
    price: 199,
    image: '/images/product-backpack.jpg',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Yellow', 'Pink', 'Blue'],
    isNew: true,
  },
  {
    id: 8,
    name: 'Cotton Onesie',
    nameFr: 'Body en Coton',
    nameAr: 'بودي قطني',
    price: 129,
    image: '/images/category-newborn.jpg',
    category: 'newborn',
    sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
    colors: ['White', 'Pink', 'Blue', 'Yellow'],
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    nameAr: 'سارة ميتشيل',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    text: 'The quality of clothes is amazing! My kids love wearing them and they are so comfortable. Fast delivery to Casablanca too!',
    textFr: 'La qualité des vêtements est incroyable ! Mes enfants adorent les porter et ils sont tellement confortables. Livraison rapide à Casablanca aussi !',
    textAr: 'جودة الملابس رائعة! أطفالي يحبون ارتدائها وهي مريحة جداً. توصيل سريع إلى الدار البيضاء أيضاً!',
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    nameAr: 'أحمد بنعلي',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    text: 'Best kids clothing store in Morocco! The designs are unique and the prices are reasonable. Will definitely shop again.',
    textFr: 'Meilleur magasin de vêtements pour enfants au Maroc ! Les designs sont uniques et les prix sont raisonnables. Je vais certainement acheter à nouveau.',
    textAr: 'أفضل متجر ملابس أطفال في المغرب! التصاميم فريدة والأسعار معقولة. سأتسوق مرة أخرى بالتأكيد.',
  },
  {
    id: 3,
    name: 'Leila Amrani',
    nameAr: 'ليلى العمراني',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    text: 'I love the variety of styles available. The website is easy to use and the customer service is excellent!',
    textFr: 'J\'adore la variété de styles disponibles. Le site est facile à utiliser et le service client est excellent !',
    textAr: 'أحب تنوع الأنماط المتاحة. الموقع سهل الاستخدام وخدمة العملاء ممتازة!',
  },
  {
    id: 4,
    name: 'Karim Idrissi',
    nameAr: 'كريم الإدريسي',
    avatar: '/images/avatar-4.jpg',
    rating: 5,
    text: 'The clothes are beautiful and well-made. My daughter gets so many compliments when she wears her Ak outfits!',
    textFr: 'Les vêtements sont beaux et bien faits. Ma fille reçoit tellement de compliments quand elle porte ses tenues Ak !',
    textAr: 'الملابس جميلة ومصنوعة جيداً. ابنتي تحصل على الكثير من الإطراءات عندما ترتدي ملابس أك!',
  },
];

export const categories = [
  {
    id: 'boys',
    name: 'Boys',
    nameFr: 'Garçons',
    nameAr: 'أولاد',
    image: '/images/category-boys.jpg',
    color: 'var(--blue)',
  },
  {
    id: 'girls',
    name: 'Girls',
    nameFr: 'Filles',
    nameAr: 'بنات',
    image: '/images/category-girls.jpg',
    color: 'var(--pink)',
  },
  {
    id: 'newborn',
    name: 'New Born',
    nameFr: 'Nouveau-né',
    nameAr: 'حديثي الولادة',
    image: '/images/category-newborn.jpg',
    color: 'var(--peach)',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    nameFr: 'Accessoires',
    nameAr: 'إكسسوارات',
    image: '/images/category-accessories.jpg',
    color: 'var(--mint)',
  },
];

export const offers = [
  {
    id: 1,
    title: 'Weekend Sale',
    titleFr: 'Soldes du Weekend',
    titleAr: 'تخفيضات الويكند',
    subtitle: 'Up to 50% OFF',
    subtitleFr: 'Jusqu\'à 50% de réduction',
    subtitleAr: 'خصم يصل إلى 50%',
    image: '/images/offer-weekend.jpg',
    color: 'var(--pink)',
    discount: 50,
  },
  {
    id: 2,
    title: 'New Arrivals',
    titleFr: 'Nouveautés',
    titleAr: 'وصل حديثاً',
    subtitle: 'Spring Collection',
    subtitleFr: 'Collection Printemps',
    subtitleAr: 'مجموعة الربيع',
    image: '/images/offer-new.jpg',
    color: 'var(--yellow)',
    isNew: true,
  },
  {
    id: 3,
    title: 'Trending Now',
    titleFr: 'Tendances',
    titleAr: 'الأكثر رواجاً',
    subtitle: 'Most Popular',
    subtitleFr: 'Les Plus Populaires',
    subtitleAr: 'الأكثر شعبية',
    image: '/images/offer-trending.jpg',
    color: 'var(--blue)',
    isTrending: true,
  },
];
