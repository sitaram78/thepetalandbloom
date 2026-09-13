import CategoryPage from '@/components/CategoryPage';
import { useProducts } from '@/context/ProductContext';
import { heroImages } from '@/data/site';

export default function GiftBoxes() {
  const { products } = useProducts();
  const giftBoxes = products.filter(p => p.category === 'giftboxes');
  return (
    <CategoryPage
      label="Gift Boxes"
      title={<>Ready-to-gift boxes</>}
      subtitle="Complete gift boxes with blooms, keyrings, and cards — beautifully packaged and ready to give. The gift that needs nothing else."
      image={heroImages.giftBox}
      products={giftBoxes}
      columns={2}
      showCustomCTA
    />
  );
}
