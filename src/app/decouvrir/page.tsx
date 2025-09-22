'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

// Dummy data for demonstration - in a real app, this would come from your database
const allListings = [
  {
    id: 1,
    title: 'Obtenez dès maintenant une adresse email professionnelle',
    category: 'Boutique',
    subcategory: 'Électronique',
    date: 'mai 8, 2025',
    price: '50,000 FCFA',
    type: 'Autre',
    location: 'Thiès',
    description: 'Profitez d\'une adresse email professionnelle pour votre entreprise ou projet. Service rapide et fiable.',
  },
  {
    id: 2,
    title: 'SIDCOM',
    category: 'Services',
    subcategory: 'Informatique',
    date: 'mai 8, 2025',
    location: 'Espace Coworking Rufisque ouest, sortie 9',
    description: 'Solutions informatiques et services professionnels pour entreprises et particuliers.',
  },
  {
    id: 3,
    title: 'Espace Coworking Rufisque ouest, sortie 9',
    category: 'Immobilier',
    subcategory: 'À louer',
    date: 'mai 8, 2025',
    type: 'Autre',
    description: 'Un espace moderne et équipé pour vos besoins professionnels à Rufisque ouest.',
  },
  // Add more dummy listings here
];

const categories = [
  { 
    id: 'all', 
    name: 'Tout',
    subcategories: []
  },
  { 
    id: 'boutique', 
    name: 'Boutique',
    subcategories: [
      { id: 'all', name: 'Tout' },
      { id: 'electronique', name: 'Électronique' },
      { id: 'vehicules', name: 'Véhicules' },
      { id: 'vetements', name: 'Vêtements' },
      { id: 'maison', name: 'Maison & Jardin' },
      { id: 'sport', name: 'Sport & Loisirs' },
      { id: 'autres', name: 'Autres' }
    ]
  },
  { 
    id: 'services', 
    name: 'Services',
    subcategories: [
      { id: 'all', name: 'Tout' },
      { id: 'informatique', name: 'Informatique' },
      { id: 'education', name: 'Éducation' },
      { id: 'sante', name: 'Santé & Bien-être' },
      { id: 'transport', name: 'Transport' },
      { id: 'evenements', name: 'Événements' },
      { id: 'autres', name: 'Autres' }
    ]
  },
  { 
    id: 'immobilier', 
    name: 'Immobilier',
    subcategories: [
      { id: 'all', name: 'Tout' },
      { id: 'a-vendre', name: 'À vendre' },
      { id: 'a-louer', name: 'À louer' },
      { id: 'colocation', name: 'Colocation' },
      { id: 'terrain', name: 'Terrain' },
      { id: 'bureau', name: 'Bureau & Commerce' },
      { id: 'autres', name: 'Autres' }
    ]
  },
];

export default function Decouvrir() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const availableSubcategories = currentCategory?.subcategories || [];

  useEffect(() => {
    // Reset subcategory when main category changes
    setSelectedSubcategory('all');
  }, [selectedCategory]);

  const handlePriceChange = (value: string, type: 'min' | 'max') => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    if (type === 'min') {
      setMinPrice(numericValue);
    } else {
      setMaxPrice(numericValue);
    }
  };

  const adjustPrice = (amount: number, type: 'min' | 'max') => {
    const currentValue = parseInt(type === 'min' ? minPrice : maxPrice) || 0;
    const newValue = Math.max(0, currentValue + amount);
    if (type === 'min') {
      setMinPrice(newValue.toString());
    } else {
      setMaxPrice(newValue.toString());
    }
  };

  const filteredListings = allListings.filter(listing => {
    const matchesCategory = selectedCategory === 'all' || listing.category.toLowerCase() === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || listing.subcategory?.toLowerCase() === selectedSubcategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price filtering
    const listingPrice = parseInt(listing.price?.replace(/[^0-9]/g, '') || '0');
    const minPriceNum = parseInt(minPrice) || 0;
    const maxPriceNum = parseInt(maxPrice) || Infinity;
    const matchesPrice = listingPrice >= minPriceNum && listingPrice <= maxPriceNum;

    return matchesCategory && matchesSubcategory && matchesSearch && matchesPrice;
  });

  return (
    <main>
      <Navigation />
      
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-brand mb-4">Découvrir</h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="w-5 h-5 text-muted absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div key={listing.id} className="card hover:shadow-xl transition-shadow">
                    <div className="flex flex-col h-full">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-brand line-clamp-2 mb-2">{listing.title}</h3>

                      {/* Price */}
                      {listing.price && (
                        <div className="text-lg font-bold text-accent mb-2">{listing.price}</div>
                      )}

                      {/* Category and Location Row */}
                      <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted mb-2">
                        <span className="font-medium">{listing.category}</span>
                        {listing.subcategory && (
                          <>
                            <span className="text-muted/50">•</span>
                            <span>{listing.subcategory}</span>
                          </>
                        )}
                        {listing.location && (
                          <>
                            <span className="text-muted/50">•</span>
                            <span className="truncate">{listing.location}</span>
                          </>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted line-clamp-2 mb-3 flex-grow">{listing.description}</p>

                      {/* Date */}
                      <div className="text-xs text-muted/80 mt-auto">Ajouté le {listing.date}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <svg className="w-16 h-16 text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-brand mb-2">Aucun résultat</h3>
                  <p className="text-muted">Essayez de modifier vos filtres ou votre recherche</p>
                </div>
              )}
            </div>
          </div>

          {/* Filter Sidebar */}
          <div className="lg:w-80">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-brand mb-6">Filtres</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex justify-between items-center text-left font-semibold text-brand mb-3"
                >
                  <span>Catégorie</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCategoryOpen && (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer py-1">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="form-radio text-accent"
                        />
                        <span className="text-muted">{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Subcategory Filter */}
              {selectedCategory !== 'all' && availableSubcategories.length > 0 && (
                <div className="mb-6">
                  <button
                    onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
                    className="w-full flex justify-between items-center text-left font-semibold text-brand mb-3"
                  >
                    <span>Sous-catégorie</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${isSubcategoryOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isSubcategoryOpen && (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {availableSubcategories.map((subcategory) => (
                        <label key={subcategory.id} className="flex items-center space-x-2 cursor-pointer py-1">
                          <input
                            type="radio"
                            name="subcategory"
                            value={subcategory.id}
                            checked={selectedSubcategory === subcategory.id}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className="form-radio text-accent"
                          />
                          <span className="text-muted">{subcategory.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-brand mb-3">Prix</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted mb-1">Prix minimum</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => adjustPrice(-1000, 'min')}
                        className="px-2 py-1 border border-muted rounded-l hover:bg-muted/10"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={minPrice}
                        onChange={(e) => handlePriceChange(e.target.value, 'min')}
                        placeholder="0"
                        className="input rounded-none w-full text-center"
                      />
                      <button
                        onClick={() => adjustPrice(1000, 'min')}
                        className="px-2 py-1 border border-muted rounded-r hover:bg-muted/10"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1">Prix maximum</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => adjustPrice(-1000, 'max')}
                        className="px-2 py-1 border border-muted rounded-l hover:bg-muted/10"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(e.target.value, 'max')}
                        placeholder="Max"
                        className="input rounded-none w-full text-center"
                      />
                      <button
                        onClick={() => adjustPrice(1000, 'max')}
                        className="px-2 py-1 border border-muted rounded-r hover:bg-muted/10"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  setMinPrice('');
                  setMaxPrice('');
                  setSearchQuery('');
                }}
                className="btn-secondary w-full"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 