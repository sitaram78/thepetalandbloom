import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSiteAssets } from '@/context/SiteAssetsContext';
import { Upload, Image as ImageIcon, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const ASSET_KEYS = [
  { key: 'home_hero_primary', label: 'Home Hero Primary', description: 'Main background image for the landing page hero section.' },
  { key: 'home_hero_secondary', label: 'Home Hero Secondary', description: 'Image used in the "Your flowers, Your story" section.' },
  { key: 'home_hero_hands', label: 'Detail: Hands', description: 'Macro image of hands crafting flowers.' },
  { key: 'home_hero_texture', label: 'Detail: Texture', description: 'Macro image of flower texture.' },
  { key: 'home_hero_yarn', label: 'Detail: Yarn', description: 'Macro image of yarn palette.' },
  { key: 'home_gift_finder', label: 'Gift Finder Header', description: 'Header image for the Gift Finder tool.' },
];

export default function AdminAssets() {
  const { assets, updateAsset, refreshAssets } = useSiteAssets();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [successKey, setSuccessKey] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshAssets();
    setRefreshing(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);
    setSuccessKey(null);

    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${key}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `site-assets/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);

      // 3. Update Database
      const { error: updateError } = await updateAsset(key, publicUrl);
      if (updateError) throw updateError;

      setSuccessKey(key);
    } catch (error: any) {
      console.error('Asset upload failed:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingKey(null);
    }
  };

  return (
    <AdminLayout activePage="assets">
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-ink mb-2">Studio Visuals</h1>
            <p className="text-ink-light">Manage the background images and brand assets across the studio.</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary px-4 py-2 flex items-center gap-2 text-xs"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Sync Assets'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ASSET_KEYS.map(({ key, label, description }) => (
            <div key={key} className="bg-white border border-silk p-6 rounded-sm shadow-sm flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-ink">{label}</h3>
                  <p className="text-xs text-ink-light mb-4">{description}</p>
                </div>
                {successKey === key && (
                  <CheckCircle2 className="text-sage-600" size={20} />
                )}
              </div>

              <div className="aspect-video bg-parchment-100 rounded-sm overflow-hidden relative group border border-silk">
                {assets[key] ? (
                  <img
                    src={assets[key]}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-ink-light gap-2">
                    <ImageIcon size={32} className="opacity-20" />
                    <span className="text-xs">No custom image uploaded</span>
                  </div>
                )}

                {uploadingKey === key && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="animate-spin text-ink" size={32} />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="btn-primary text-xs py-2 px-4 cursor-pointer flex items-center gap-2">
                  <Upload size={14} />
                  Upload New
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, key)}
                    disabled={uploadingKey !== null}
                  />
                </label>
                <span className="text-[10px] text-ink-light font-mono truncate max-w-[200px]">
                  {assets[key] ? assets[key].split('/').pop() : 'default_static'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
