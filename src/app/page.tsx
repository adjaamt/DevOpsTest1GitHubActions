'use client';

import { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// SVG icons for categories
const SellIcon = () => (
  <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M3 11l9-9 9 9-9 9-9-9z" /></svg>
);
const ServiceIcon = () => (
  <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6m8-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V8a2 2 0 00-2-2h-3.5a1.5 1.5 0 01-3 0H6a2 2 0 00-2 2v4m16 0H4" /></svg>
);
const HomeIcon = () => (
  <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

// Dummy data for demonstration - in a real app, this would come from your database
const allListings = [
  {
    id: 1,
    title: 'Obtenez dès maintenant une adresse email professionnelle',
    category: 'Boutique',
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
    date: 'mai 8, 2025',
    location: 'Espace Coworking Rufisque ouest, sortie 9',
    description: 'Solutions informatiques et services professionnels pour entreprises et particuliers.',
  },
  {
    id: 3,
    title: 'Espace Coworking Rufisque ouest, sortie 9',
    category: 'Immobilier',
    date: 'mai 8, 2025',
    type: 'Autre',
    description: 'Un espace moderne et équipé pour vos besoins professionnels à Rufisque ouest.',
  },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof allListings>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleAddListing = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      window.location.href = '/login';
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/search?q=${encodedQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (listing: typeof allListings[0]) => {
    setSearchQuery(listing.title);
    const encodedQuery = encodeURIComponent(listing.title);
    router.push(`/search?q=${encodedQuery}`);
    setShowSuggestions(false);
  };

  // Handle clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      const filtered = allListings.filter(listing => {
        const listingText = `${listing.title} ${listing.description} ${listing.category} ${listing.location || ''} ${listing.type || ''}`.toLowerCase();
        return searchTerms.every(term => listingText.includes(term));
      });
      setSuggestions(filtered.slice(0, 5)); // Show top 5 matches
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const categories = [
    {
      title: 'Boutique',
      icon: <SellIcon />,
      href: '/a-vendre',
      description: 'Objets, produits, véhicules, etc.'
    },
    {
      title: 'Services',
      icon: <ServiceIcon />,
      href: '/services',
      description: 'Prestations, offres, compétences.'
    },
    {
      title: 'Immobilier',
      icon: <HomeIcon />,
      href: '/immobilier',
      description: 'Maisons, appartements, terrains.'
    },
  ];

  const recentListings = [
    {
      title: 'Obtenez dès maintenant une adresse email professionnelle',
      category: 'Boutique',
      date: 'mai 8, 2025',
      price: '50,000 FCFA',
      type: 'Autre',
    },
    {
      title: 'SIDCOM',
      category: 'Services',
      date: 'mai 8, 2025',
      location: 'Espace Coworking Rufisque ouest, sortie 9',
    },
    {
      title: 'Espace Coworking Rufisque ouest, sortie 9',
      category: 'Immobilier',
      date: 'mai 8, 2025',
      type: 'Autre',
    },
  ];

  return (
    <main>
      <Navigation />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-dark/90 py-24 mb-12 overflow-hidden"
      >
        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-brand drop-shadow-lg">
            Thiès Annonces
          </h1>
          <p className="text-xl md:text-2xl text-brand/90 mb-8 max-w-2xl">
            La plateforme moderne pour acheter, vendre et trouver des services à Thiès.
          </p>
          <div ref={searchContainerRef} className="w-full max-w-xl relative">
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <input
                type="text"
                placeholder="Que recherchez-vous ?"
                className="input flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
              />
              <button type="submit" className="btn-primary px-8">Rechercher</button>
            </form>
            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute w-full bg-white rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
                {suggestions.map((listing) => (
                  <button
                    key={listing.id}
                    onClick={() => handleSuggestionClick(listing)}
                    className="w-full text-left px-4 py-3 hover:bg-accent/5 transition-colors border-b last:border-b-0"
                  >
                    <div className="font-medium text-brand">{listing.title}</div>
                    <div className="text-sm text-muted">
                      {listing.category} • {listing.location || listing.type || ''}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/decouvrir" 
              className="btn-secondary text-lg px-8 py-3 shadow-lg"
            >
              Découvrir
            </Link>
          </div>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" className="absolute bottom-0 left-0">
            <path fill="#1e3a8a" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            <path fill="#f5d76e" fillOpacity="0.25" d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,197.3C840,203,960,181,1080,165.3C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="py-12"
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center text-brand">Catégories principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card group flex flex-col items-center text-center hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-brand group-hover:text-accent transition-colors">{category.title}</h3>
                <p className="text-muted mb-2">{category.description}</p>
                <span className="inline-block mt-2 text-accent font-bold group-hover:underline">Voir les annonces</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Listings */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="py-12 bg-muted"
      >
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-brand">Annonces récentes</h2>
            <Link href="/a-vendre" className="btn-secondary">Voir tout</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentListings.map((listing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-brand">{listing.title}</h3>
                <div className="text-sm text-muted mb-2 font-medium">{listing.category}</div>
                {listing.price && (
                  <div className="text-lg font-bold text-accent mb-2">{listing.price}</div>
                )}
                {listing.type && (
                  <div className="text-sm text-muted mb-2">Type: {listing.type}</div>
                )}
                {listing.location && (
                  <div className="text-sm text-muted mb-2">{listing.location}</div>
                )}
                <div className="text-xs text-muted">Ajouté le {listing.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Listings Carousel Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="py-12"
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-brand mb-4">Annonces à la une</h2>
          <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center text-muted">
            (Carousel à venir)
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 mt-12">
        <div className="container-custom grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand">Thiès Annonces</h3>
            <p className="text-muted mb-2">Thiès Annonce, tout s'achète, tout se trouve.</p>
            <p className="text-muted text-sm">&copy; {new Date().getFullYear()} Tous droits réservés.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              <li><Link href="/a-vendre" className="hover:underline">Boutique</Link></li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/immobilier" className="hover:underline">Immobilier</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand">Contact</h4>
            <p className="text-muted mb-2">Pour toute question ou assistance, contactez-nous.</p>
            <a href="mailto:contact@thiesannonces.com" className="text-brand hover:underline">contact@thiesannonces.com</a>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-brand hover:text-accent transition-colors" aria-label="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" /></svg></a>
              <a href="#" className="text-brand hover:text-accent transition-colors" aria-label="Twitter"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.72 8.72 0 0024 4.59a8.48 8.48 0 01-2.54.7z" /></svg></a>
              <a href="#" className="text-brand hover:text-accent transition-colors" aria-label="LinkedIn"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
