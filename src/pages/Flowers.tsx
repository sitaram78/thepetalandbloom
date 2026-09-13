import CategoryPage from '@/components/CategoryPage';
import { useProducts } from '@/context/ProductContext';
import { heroImages } from '@/data/site';

export default function Flowers() {
  const { products } = useProducts();
  const flowers = products.filter(p => p.category === 'flowers');
  return (
    <CategoryPage
      label="Everlasting Blooms"
      title={<>Individual crochet flowers</>}
      subtitle="Single handmade blooms — roses, sunflowers, daisies, and tulips. Each one is made to sit on a desk, a shelf, or a bedside table, and to last far beyond the day it is gifted."
      image={heroImages.secondary}
      products={flowers}
      showCustomCTA
    />
  );
}
