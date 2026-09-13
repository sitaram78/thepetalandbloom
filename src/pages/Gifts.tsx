import CategoryPage from '@/components/CategoryPage';
import { useProducts } from '@/context/ProductContext';
import { heroImages } from '@/data/site';

export default function Gifts() {
  const { products } = useProducts();
  const gifts = products.filter(p => p.category === 'gifts');
  return (
    <CategoryPage
      label="Little Gifts"
      title={<>Small things, beautifully made</>}
      subtitle="Keyrings, bookmarks, and mini pots — the little gifts that carry a lot of thought. Perfect for return gifts, party favours, and small surprises."
      image={heroImages.giftBox}
      products={gifts}
      columns={4}
      showCustomCTA
    />
  );
}
