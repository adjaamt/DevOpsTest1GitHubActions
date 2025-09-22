'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useState } from 'react';

// SVG icons for categories
const SellIcon = () => (
  <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M3 11l9-9 9 9-9 9-9-9z" /></svg>
);
const ServiceIcon = () => (
  <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6m8-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V8a2 2 0 00-2-2h-3.5a1.5 1.5 0 01-3 0H6a2 2 0 00-2 2v4m16 0H4" /></svg>
);
const HomeIcon = () => (
  <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h3V3h8v2h3a2 2 0 012 2v14M9 21V9h6v12" /></svg>
);
const EmptyIcon = () => (
  <svg className="w-16 h-16 mx-auto text-muted" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="20" rx="4" fill="#f8fafc" stroke="#e5e7eb" /><path d="M8 36l8-8 8 8 8-8 8 8" stroke="#f59e42" strokeWidth="2" fill="none" /></svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-muted mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2" stroke="#e5e7eb" /><path d="M16 2v4M8 2v4M3 10h18" stroke="#1e3a8a" /></svg>
);
const LocationIcon = () => (
  <svg className="w-5 h-5 text-brand mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c-4 0-7 2-7 4v2a2 2 0 002 2h10a2 2 0 002-2v-2c0-2-3-4-7-4z" /></svg>
);

const categoryData = {
  'a-vendre': {
    title: 'Boutique',
    icon: <SellIcon />,
    listings: [
      {
        id: 1,
        title: 'Obtenez dès maintenant une adresse email professionnelle',
        date: 'mai 8, 2025',
        type: 'Autre',
        price: '50,000 FCFA',
      },
    ],
  },
  'services': {
    title: 'Services',
    icon: <ServiceIcon />,
    listings: [
      {
        id: 1,
        title: 'SIDCOM',
        date: 'mai 8, 2025',
        location: 'Espace Coworking Rufisque ouest, sortie 9',
      },
      {
        id: 2,
        title: 'Obtenez votre adresse mail professionnelle',
        date: 'mai 7, 2025',
      },
      {
        id: 3,
        title: "Création de Sites Web et Développement d'Applications Mobiles",
        date: 'mai 5, 2025',
      },
    ],
  },
  'immobilier': {
    title: 'Immobilier',
    icon: <HomeIcon />,
    listings: [
      {
        id: 1,
        title: 'Espace Coworking Rufisque ouest, sortie 9',
        date: 'mai 8, 2025',
        type: 'Autre',
      },
    ],
  },
};

// Subcategories for each category
const subcategoriesMap: Record<string, { id: string; name: string }[]> = {
  'a-vendre': [
    { id: 'all', name: 'Tout' },
    { id: 'electronique', name: 'Électronique' },
    { id: 'vehicules', name: 'Véhicules' },
    { id: 'vetements', name: 'Vêtements' },
    { id: 'maison', name: 'Maison & Jardin' },
    { id: 'sport', name: 'Sport & Loisirs' },
    { id: 'autres', name: 'Autres' },
  ],
  'services': [
    { id: 'all', name: 'Tout' },
    { id: 'informatique', name: 'Informatique' },
    { id: 'education', name: 'Éducation' },
    { id: 'sante', name: 'Santé & Bien-être' },
    { id: 'transport', name: 'Transport' },
    { id: 'evenements', name: 'Événements' },
    { id: 'autres', name: 'Autres' },
  ],
  'immobilier': [
    { id: 'all', name: 'Tout' },
    { id: 'a-vendre', name: 'À vendre' },
    { id: 'a-louer', name: 'À louer' },
    { id: 'colocation', name: 'Colocation' },
    { id: 'terrain', name: 'Terrain' },
    { id: 'bureau', name: 'Bureau & Commerce' },
    { id: 'autres', name: 'Autres' },
  ],
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as keyof typeof categoryData;
  const data = categoryData[category];

  // Filter state
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const subcategories = subcategoriesMap[category] || [];

  // Collapsible state for filters
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  // Increment/decrement for price
  const adjustPrice = (type: 'min' | 'max', amount: number) => {
    if (type === 'min') {
      const newValue = Math.max(0, (parseInt(minPrice) || 0) + amount);
      setMinPrice(newValue.toString());
    } else {
      const newValue = Math.max(0, (parseInt(maxPrice) || 0) + amount);
      setMaxPrice(newValue.toString());
    }
  };

  // Filtering logic
  const filteredListings = (data?.listings || []).filter(listing => {
    // Subcategory
    const matchesSubcategory = selectedSubcategory === 'all' || ('subcategory' in listing && typeof listing.subcategory === 'string' && listing.subcategory.toLowerCase() === selectedSubcategory);
    // Search
    const matchesSearch =
      (!searchQuery || listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || ('description' in listing && typeof listing.description === 'string' && listing.description.toLowerCase().includes(searchQuery.toLowerCase())));
    // Price
    const listingPrice = 'price' in listing && typeof listing.price === 'string' ? parseInt(listing.price.replace(/[^0-9]/g, '')) : 0;
    const minPriceNum = parseInt(minPrice) || 0;
    const maxPriceNum = parseInt(maxPrice) || Infinity;
    const matchesPrice = listingPrice >= minPriceNum && listingPrice <= maxPriceNum;
    return matchesSubcategory && matchesSearch && matchesPrice;
  });

  if (!data) {
    return (
      <main>
        <Navigation />
        <div className="container-custom py-12">
          <h1 className="text-2xl font-bold text-center">Catégorie non trouvée</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navigation />
      <section className="silver-gradient py-12 mb-8">
        <div className="container-custom flex items-center gap-6">
          <div>{data.icon}</div>
          <h1 className="text-4xl font-extrabold text-brand drop-shadow-lg">{data.title}</h1>
        </div>
      </section>
      <section className="container-custom pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Card */}
          <aside className="lg:w-80 mb-8 lg:mb-0">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-brand mb-6">Filtres</h2>
              {/* Subcategory Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
                  className="w-full flex justify-between items-center text-left font-semibold text-brand mb-3"
                  type="button"
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
                    {subcategories.map((subcategory) => (
                      <label key={subcategory.id} className="flex items-center space-x-2 cursor-pointer py-1">
                        <input
                          type="radio"
                          name="subcategory"
                          value={subcategory.id}
                          checked={selectedSubcategory === subcategory.id}
                          onChange={e => setSelectedSubcategory(e.target.value)}
                          className="form-radio text-accent"
                        />
                        <span className="text-muted">{subcategory.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Price Range Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="w-full flex justify-between items-center text-left font-semibold text-brand mb-3"
                  type="button"
                >
                  <span>Prix</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${isPriceOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isPriceOpen && (
                  <div className="flex flex-col gap-4 mt-2">
                    <div>
                      <span className="block text-muted mb-1">Prix minimum</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-l-md text-2xl bg-background"
                          onClick={() => adjustPrice('min', -1)}
                        >-</button>
                        <input
                          type="number"
                          min="0"
                          className="input w-full text-center rounded-none border-x-0"
                          value={minPrice || 0}
                          onChange={e => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-r-md text-2xl bg-background"
                          onClick={() => adjustPrice('min', 1)}
                        >+</button>
                      </div>
                    </div>
                    <div>
                      <span className="block text-muted mb-1">Prix maximum</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-l-md text-2xl bg-background"
                          onClick={() => adjustPrice('max', -1)}
                        >-</button>
                        <input
                          type="number"
                          min="0"
                          className="input w-full text-center rounded-none border-x-0"
                          value={maxPrice || ''}
                          placeholder="Max"
                          onChange={e => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-r-md text-2xl bg-background"
                          onClick={() => adjustPrice('max', 1)}
                        >+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="btn-secondary w-full text-lg font-bold mt-4"
                onClick={() => { setSelectedSubcategory('all'); setMinPrice(''); setMaxPrice(''); setSearchQuery(''); }}
                type="button"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </aside>
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input w-full"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <svg className="w-5 h-5 text-muted absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings.map((listing) => (
              <Link
                href={`/${category}/${listing.id}`}
                key={listing.id}
                className="card hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-brand mb-2">{listing.title}</h3>
                <div className="flex items-center text-sm text-muted mb-2">
                  <CalendarIcon /> {listing.date}
                </div>
                {'price' in listing && listing.price && (
                  <div className="text-lg font-bold text-accent mb-2">{listing.price}</div>
                )}
                {'type' in listing && listing.type && (
                  <div className="text-sm text-muted mb-2">Type: {listing.type}</div>
                )}
                {'location' in listing && listing.location && (
                  <div className="flex items-center text-sm text-muted">
                    <LocationIcon /> {listing.location}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
                <h3 className="text-xl font-semibold text-brand mb-2">Aucun résultat</h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 