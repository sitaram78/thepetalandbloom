import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { products } from '@/data/products';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function MigrationPage() {
  const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const migrateData = async () => {
    setStatus('migrating');
    setError(null);

    try {
      // Map static products to DB schema
      const productsToInsert = products.map(p => ({
        code: p.code,
        name: p.name,
        description: p.description,
        long_description: p.longDescription || null,
        price: p.price,
        category: p.category,
        images: p.images,
        occasions: p.occasions || [],
        colors: p.colors || [],
        customisable: p.customisable || false,
        featured: p.featured || false,
        bestseller: p.bestseller || false,
        made_to_order: p.madeToOrder || false,
        bouquet_size: p.bouquetSize || null,
      }));

      const { error: insertError } = await supabase
        .from('products')
        .upsert(productsToInsert);

      if (insertError) throw insertError;

      setStatus('success');
    } catch (err: any) {
      console.error('Migration error:', err);
      setError(err.message || 'An unexpected error occurred during migration');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-parchment-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-soft border border-silk text-center">
        <h1 className="font-serif text-3xl text-ink mb-4">Data Migration</h1>
        <p className="text-ink-light mb-8 text-sm leading-relaxed">
          This page will migrate your static product catalog from <code className="bg-silk px-1 rounded">products.ts</code> to your Supabase database.
        </p>

        {status === 'idle' && (
          <button
            onClick={migrateData}
            className="btn-primary w-full py-4 text-lg"
          >
            Start Migration
          </button>
        )}

        {status === 'migrating' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="animate-spin text-rose" size={32} />
            <p className="text-sm text-ink-light font-medium">Uploading products to studio...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-3 py-4 text-green-600">
            <CheckCircle size={48} />
            <p className="font-medium">Migration Successful!</p>
            <p className="text-xs text-ink-light">All products have been synced to the database.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 py-4 text-red-600">
            <AlertCircle size={48} />
            <p className="font-medium">Migration Failed</p>
            <p className="text-xs text-red-400">{error}</p>
            <button
              onClick={migrateData}
              className="mt-4 text-sm underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
