import { useEffect } from 'react';
import { getProductBySlug } from './lib/catalog';
import { useRoute } from './lib/router';
import { B2BCatalog } from './store/B2BCatalog';
import { CartDrawer } from './store/Cart';
import { CollectionPage } from './store/CollectionPage';
import { CustomOrderPage } from './store/CustomOrderPage';
import { HomePage } from './store/HomePage';
import { PresalePage } from './store/PresalePage';
import { ProductPage } from './store/ProductPage';
import { QuoteForm } from './store/QuoteForm';
import { PageShell, StoreHeader } from './store/StoreChrome';

export function App() {
  const route = useRoute();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <PageShell>
      <StoreHeader />
      {route.name === 'home' && <HomePage />}
      {route.name === 'collection' && <CollectionPage id={route.id} />}
      {route.name === 'product' && <ProductRoute slug={route.slug} />}
      {route.name === 'presale' && <PresalePage />}
      {route.name === 'b2b' && <B2BCatalog />}
      {route.name === 'quote' && <QuoteForm kitId={route.kitId} />}
      {route.name === 'custom' && <CustomOrderPage />}
      {route.name === 'notfound' && <NotFound />}
      <CartDrawer />
    </PageShell>
  );
}

function ProductRoute({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  if (!product) return <NotFound />;
  return <ProductPage product={product} />;
}

function NotFound() {
  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1>Pagina no encontrada</h1>
      <p>
        <a href="#/">Volver al inicio</a>
      </p>
    </div>
  );
}
