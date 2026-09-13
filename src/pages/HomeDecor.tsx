import CategoryPage from '@/components/CategoryPage';
import { useProducts } from '@/context/ProductContext';
import { heroImages } from '@/data/site';

export default function HomeDecor() {
  const { products } = useProducts();
  const decor = products.filter(p => p.category === 'decor');
  return (
    <CategoryPage
      label="Home Décor"
      title={<>A little piece of permanent garden</>}
      subtitle="Crochet blooms in mini pots and decorative pieces for your home — a permanent garden for a desk, a shelf, or a windowsill."
      image={heroImages.secondary}
      products={decor}
      showCustomCTA
    />
  );
}
