import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { heroImages } from '@/data/site';
import { getCache, setCache, removeCache } from '@/utils/cache';

interface SiteAsset {
  section_key: string;
  image_url: string;
}

interface SiteAsset {
  section_key: string;
  image_url: string;
}

interface SiteAssetsContextType {
  assets: Record<string, string>;
  loading: boolean;
  updateAsset: (key: string, url: string) => Promise<{ error?: Error }>;
  refreshAssets: () => Promise<void>;
}

const SiteAssetsContext = createContext<SiteAssetsContextType | undefined>(undefined);

export function SiteAssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      try {
        // 1. Try to get from cache first
        const cached = getCache<Record<string, string>>('site_assets_cache');
        if (cached) {
          setAssets(cached);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('site_assets')
          .select('section_key, image_url');

        if (error) {
          console.error('Error fetching site assets:', error);
        } else if (data) {
          const assetsMap: Record<string, string> = {};
          data.forEach((asset) => {
            assetsMap[asset.section_key] = asset.image_url;
          });
          setAssets(assetsMap);
          setCache('site_assets_cache', assetsMap);
        }
      } catch (err) {
        console.error('Unexpected error fetching site assets:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, []);

  const updateAsset = async (key: string, url: string) => {
    try {
      // Try updating first since we've migrated the data
      const { data, error: updateError } = await supabase
        .from('site_assets')
        .update({ image_url: url })
        .eq('section_key', key)
        .select();

      if (updateError) throw updateError;

      // If no row was updated, it means the key doesn't exist yet, so we insert
      if (!data || data.length === 0) {
        const { error: insertError } = await supabase
          .from('site_assets')
          .insert({ section_key: key, image_url: url });

        if (insertError) throw insertError;
      }

      setAssets((prev) => ({ ...prev, [key]: url }));
      return { error: null };
    } catch (error: any) {
      console.error(`Asset Update Error for ${key}:`, error);
      return { error };
    }
  };

  // Helper to get asset with fallback to static data
  const getAsset = (key: string) => {
    // Map section_key to heroImages keys
    const mapping: Record<string, keyof typeof heroImages> = {
      'home_hero_primary': 'primary',
      'home_hero_secondary': 'secondary',
      'home_hero_texture': 'texture',
      'home_hero_hands': 'hands',
      'home_hero_yarn': 'yarn',
      'home_gift_finder': 'giftBox',
    };

    const staticKey = mapping[key];
    return assets[key] || (staticKey ? heroImages[staticKey] : '');
  };

  const refreshAssets = async () => {
    setLoading(true);
    removeCache('site_assets_cache');
    try {
      const { data, error } = await supabase
        .from('site_assets')
        .select('section_key, image_url');

      if (error) {
        console.error('Error refreshing site assets:', error);
      } else if (data) {
        const assetsMap: Record<string, string> = {};
        data.forEach((asset) => {
          assetsMap[asset.section_key] = asset.image_url;
        });
        setAssets(assetsMap);
        setCache('site_assets_cache', assetsMap);
      }
    } catch (err) {
      console.error('Unexpected error refreshing site assets:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteAssetsContext.Provider value={{ assets, loading, updateAsset, refreshAssets }}>
      {children}
    </SiteAssetsContext.Provider>
  );
}

export function useSiteAssets() {
  const context = useContext(SiteAssetsContext);
  if (context === undefined) {
    throw new Error('useSiteAssets must be used within a SiteAssetsProvider');
  }
  return context;
}

// Extra helper for components to avoid repeating mapping logic
export function getDynamicAsset(assets: Record<string, string>, key: string) {
  const mapping: Record<string, keyof typeof heroImages> = {
    'home_hero_primary': 'primary',
    'home_hero_secondary': 'secondary',
    'home_hero_texture': 'texture',
    'home_hero_hands': 'hands',
    'home_hero_yarn': 'yarn',
    'home_gift_finder': 'giftBox',
  };

  const staticKey = mapping[key];
  const url = assets[key] || (staticKey ? heroImages[staticKey] : '');

  if (!url) return '';

  // Add a cache-buster timestamp if it's a Supabase URL
  if (url.includes('supabase.co')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${Date.now()}`;
  }

  return url;
}
