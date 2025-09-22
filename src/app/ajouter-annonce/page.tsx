'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

const UploadIcon = () => (
  <svg className="mx-auto h-12 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48"><path d="M24 4v28m0 0l-8-8m8 8l8-8" strokeLinecap="round" strokeLinejoin="round" /><rect x="8" y="32" width="32" height="12" rx="4" stroke="#e5e7eb" /></svg>
);

export default function AddListing() {
  const [category, setCategory] = useState('');

  return (
    <main>
      <Navigation />
      <div className="min-h-screen bg-background py-16 flex items-center justify-center">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-card p-10 animate-fade-in">
              <h1 className="text-3xl font-extrabold text-brand mb-8 text-center">Ajouter une annonce</h1>
              <form className="space-y-6">
                <div>
                  <label htmlFor="category" className="label">Catégorie</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="a-vendre">Boutique</option>
                    <option value="services">Services</option>
                    <option value="immobilier">Immobilier</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="title" className="label">Titre de l'annonce</label>
                  <input type="text" id="title" className="input" required />
                </div>
                <div>
                  <label htmlFor="description" className="label">Description</label>
                  <textarea id="description" rows={4} className="input" required />
                </div>
                <div>
                  <label htmlFor="price" className="label">Prix (FCFA)</label>
                  <input type="number" id="price" className="input" />
                </div>
                <div>
                  <label htmlFor="location" className="label">Localisation</label>
                  <input type="text" id="location" className="input" />
                </div>
                <div>
                  <label className="label">Photos</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent border-dashed rounded-md bg-accent/5">
                    <div className="space-y-1 text-center">
                      <UploadIcon />
                      <div className="flex text-sm text-muted justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-brand hover:text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent"
                        >
                          <span>Télécharger des fichiers</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-muted">PNG, JPG, GIF jusqu'à 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact" className="label">Contact (téléphone)</label>
                  <input type="tel" id="contact" className="input" required />
                </div>
                <div>
                  <button type="submit" className="w-full btn-primary text-lg">Publier l'annonce</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 