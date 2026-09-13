import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Plus,
  Trash2,
  Save,
  GripVertical,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { NotificationContext } from '@/context/NotificationContext';
import { useNotification } from '@/context/NotificationContext';
import AdminLayout from '@/components/AdminLayout';

interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

interface NavLink {
  id: string;
  label: string;
  path: string;
  is_active: boolean;
  display_order: number;
}

export default function AdminSettings() {
  const { notify } = useNotification();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [newNavLink, setNewNavLink] = useState({ label: '', path: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [catRes, navRes] = await Promise.all([
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
        supabase.from('navigation_links').select('*').order('display_order', { ascending: true }),
      ]);

      if (catRes.error) throw catRes.error;
      if (navRes.error) throw navRes.error;

      setCategories(catRes.data || []);
      setNavLinks(navRes.data || []);
    } catch (err: any) {
      notify('Error loading settings', { type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Category Actions
  async function addCategory() {
    if (!newCategory.name || !newCategory.slug) {
      notify('Please fill in all fields', { type: 'warning' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{
          name: newCategory.name,
          slug: newCategory.slug,
          display_order: categories.length
        }]);

      if (error) throw error;

      setNewCategory({ name: '', slug: '' });
      await fetchData();
      notify('Category added successfully', { type: 'success' });
    } catch (err: any) {
      notify(err.message, { type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    setSaving(true);
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
      notify('Category removed', { type: 'success' });
    } catch (err: any) {
      notify(err.message, { type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  // Nav Link Actions
  async function addNavLink() {
    if (!newNavLink.label || !newNavLink.path) {
      notify('Please fill in all fields', { type: 'warning' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('navigation_links')
        .insert([{
          label: newNavLink.label,
          path: newNavLink.path,
          is_active: true,
          display_order: navLinks.length
        }]);

      if (error) throw error;

      setNewNavLink({ label: '', path: '' });
      await fetchData();
      notify('Navigation link added', { type: 'success' });
    } catch (err: any) {
      notify(err.message, { type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  async function toggleNavLink(id: string, currentStatus: boolean) {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('navigation_links')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err: any) {
      notify(err.message, { type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  async function deleteNavLink(id: string) {
    if (!confirm('Are you sure you want to delete this link?')) return;

    setSaving(true);
    try {
      const { error } = await supabase.from('navigation_links').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
      notify('Link removed', { type: 'success' });
    } catch (err: any) {
      notify(err.message, { type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout activePage="settings">
        <div className="flex items-center justify-center min-h-screen bg-parchment-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-rose" />
            <p className="text-sm text-ink-light animate-pulse">Loading Studio Settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="settings">
      <div className="p-6 md:p-10 bg-parchment-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="heading-serif text-4xl text-ink mb-2">Studio Settings</h1>
            <p className="text-ink-light font-light">Manage your boutique's catalog structure and navigation.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Categories Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-ink flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-rose rounded-full" />
                  Product Categories
                </h2>
              </div>

              {/* Add Category Form */}
              <div className="bg-white p-6 rounded-sm border border-silk shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ink-light font-bold">Display Name</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                      placeholder="e.g. Hair Accessories"
                      className="w-full px-3 py-2 text-sm border border-silk focus:border-rose outline-none transition-colors rounded-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ink-light font-bold">Slug (URL)</label>
                    <input
                      type="text"
                      value={newCategory.slug}
                      onChange={e => setNewCategory({...newCategory, slug: e.target.value})}
                      placeholder="e.g. hair-accessories"
                      className="w-full px-3 py-2 text-sm border border-silk focus:border-rose outline-none transition-colors rounded-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={addCategory}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-ink text-parchment-50 hover:bg-ink/90 transition-colors text-sm font-medium disabled:opacity-50 rounded-sm"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Category
                </button>
              </div>

              {/* Category List */}
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-4 bg-white border border-silk rounded-sm hover:border-rose/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical size={16} className="text-silk group-hover:text-ink-light cursor-grab" />
                      <div>
                        <p className="text-sm font-medium text-ink">{cat.name}</p>
                        <p className="text-xs text-ink-light opacity-60">/{cat.slug}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 text-ink-light hover:text-rose transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="text-center py-10 border-2 border-dashed border-silk rounded-sm">
                    <AlertCircle className="mx-auto text-silk mb-2" size={24} />
                    <p className="text-sm text-ink-light">No categories found.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Navigation Links Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-ink flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-rose rounded-full" />
                  Navigation Menu
                </h2>
              </div>

              {/* Add Nav Link Form */}
              <div className="bg-white p-6 rounded-sm border border-silk shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ink-light font-bold">Link Label</label>
                    <input
                      type="text"
                      value={newNavLink.label}
                      onChange={e => setNewNavLink({...newNavLink, label: e.target.value})}
                      placeholder="e.g. About Studio"
                      className="w-full px-3 py-2 text-sm border border-silk focus:border-rose outline-none transition-colors rounded-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ink-light font-bold">Destination Path</label>
                    <input
                      type="text"
                      value={newNavLink.path}
                      onChange={e => setNewNavLink({...newNavLink, path: e.target.value})}
                      placeholder="e.g. /about"
                      className="w-full px-3 py-2 text-sm border border-silk focus:border-rose outline-none transition-colors rounded-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={addNavLink}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-ink text-parchment-50 hover:bg-ink/90 transition-colors text-sm font-medium disabled:opacity-50 rounded-sm"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Menu Link
                </button>
              </div>

              {/* Nav Link List */}
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <div
                    key={link.id}
                    className={`flex items-center justify-between p-4 bg-white border rounded-sm transition-all group ${
                      link.is_active ? 'border-silk' : 'border-dashed border-silk/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleNavLink(link.id, link.is_active)}
                        className={`transition-colors ${link.is_active ? 'text-rose' : 'text-silk'}`}
                        title={link.is_active ? "Deactivate link" : "Activate link"}
                      >
                        {link.is_active ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                      </button>
                      <div>
                        <p className="text-sm font-medium text-ink">{link.label}</p>
                        <p className="text-xs text-ink-light opacity-60">{link.path}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNavLink(link.id)}
                      className="p-2 text-ink-light hover:text-rose transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {navLinks.length === 0 && (
                  <div className="text-center py-10 border-2 border-dashed border-silk rounded-sm">
                    <AlertCircle className="mx-auto text-silk mb-2" size={24} />
                    <p className="text-sm text-ink-light">No navigation links found.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
