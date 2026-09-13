import CategoryPage from '@/components/CategoryPage';
import { useProducts } from '@/context/ProductContext';
import { heroImages } from '@/data/site';

export default function Bags() {
  const { products } = useProducts();
  const bags = products.filter(p => p.category === 'bags');
  return (
    <CategoryPage
      label="Bags & Accessories"
      title={<>Carry a little handmade with you</>}
      subtitle="Crochet purses and totes — functional, beautiful, and made to be used for years. Each bag is handmade with sturdy straps and a soft textured finish."
      image={heroImages.secondary}
      products={bags}
      showCustomCTA
    />
  );
}
