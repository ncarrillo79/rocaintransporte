import { useEffect } from 'react';
import { BRAND } from './lib/brand';
import { getProductBySlug } from './lib/catalog';
import { useRoute } from './lib/router';
import { CollectionPage } from './store/CollectionPage';
import { CustomOrderPage } from './store/CustomOrderPage';
import { HomePage } from './store/HomePage';
import { ContactPage, PaymentPage } from './store/InfoPages';
import { PresalePage } from './store/PresalePage';
import { ProductPage } from './store/ProductPage';
import { QuoteForm } from './store/QuoteForm';
import { PageShell, StoreFooter, StoreHeader } from './store/StoreChrome';

const HAS_CHRISTMAS = BRAND.worlds.includes('navidad');

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
      {route.name === 'presale' && (HAS_CHRISTMAS ? <PresalePage /> : <NotFound />)}
      {route.name === 'quote' && <QuoteForm garmentId={route.garmentId} />}
      {route.name === 'custom' && <CustomOrderPage />}
      {route.name === 'payment' && <PaymentPage />}
      {route.name === 'contact' && <ContactPage />}
      {route.name === 'notfound' && <NotFound />}
      <StoreFooter />
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
