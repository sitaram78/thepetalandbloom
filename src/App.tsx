import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { ProductProvider } from '@/context/ProductContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { SiteAssetsProvider } from '@/context/SiteAssetsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Wishlist from '@/pages/Wishlist';
import Flowers from '@/pages/Flowers';
import Bouquets from '@/pages/Bouquets';
import Gifts from '@/pages/Gifts';
import Bags from '@/pages/Bags';
import HomeDecor from '@/pages/HomeDecor';
import GiftBoxes from '@/pages/GiftBoxes';
import CustomOrders from '@/pages/CustomOrders';
import CustomBouquetBuilder from '@/pages/CustomBouquetBuilder';
import GiftFinder from '@/pages/GiftFinder';
import About from '@/pages/About';
import CareGuide from '@/pages/CareGuide';
import ShippingFAQ from '@/pages/ShippingFAQ';
import Contact from '@/pages/Contact';
import ProductDetail from '@/pages/ProductDetail';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Refund from '@/pages/Refund';
import MigrationPage from '@/pages/MigrationPage';
import AdminLogin from '@/pages/AdminLogin';
import AdminRoute from '@/components/AdminRoute';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminEditor from '@/pages/AdminEditor';
import AdminAssets from '@/pages/admin/AdminAssets';
import AdminSettings from '@/pages/admin/AdminSettings';
import NotFound from '@/pages/NotFound';

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {/* Navbar only on storefront routes */}
      {!isAdminRoute && <Navbar />}

      <CartDrawer />

      <main className={`min-h-screen ${!isAdminRoute ? 'pb-16 sm:pb-0' : ''}`}>
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/bouquets" element={<Bouquets />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/decor" element={<HomeDecor />} />
          <Route path="/gift-boxes" element={<GiftBoxes />} />
          <Route path="/custom" element={<CustomOrders />} />
          <Route path="/custom-bouquet" element={<CustomBouquetBuilder />} />
          <Route path="/gift-finder" element={<GiftFinder />} />
          <Route path="/about" element={<About />} />
          <Route path="/care-guide" element={<CareGuide />} />
          <Route path="/shipping" element={<ShippingFAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:code" element={<ProductDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Portal */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/editor" element={<AdminEditor />} />
            <Route path="/admin/assets" element={<AdminAssets />} />
            <Route path="/admin/migrate" element={<MigrationPage />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>

      {/* Bottom Navigation and Footer only on storefront routes */}
      {!isAdminRoute && (
        <>
          <MobileBottomNav />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <WishlistProvider>
          <ProductProvider>
            <CartProvider>
              <QuickViewProvider>
                <SiteAssetsProvider>
                  <ScrollToTop />
                  <AppContent />
                </SiteAssetsProvider>
              </QuickViewProvider>
            </CartProvider>
          </ProductProvider>
        </WishlistProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
