'use client';

import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

// SVG icons
const SearchIcon = () => (
  <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
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

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter listings based on search query
  const filteredListings = allListings.filter(listing => {
    const searchTerms = query.toLowerCase().split(' ');
    const listingText = `${listing.title} ${listing.description} ${listing.category} ${listing.location || ''} ${listing.type || ''}`.toLowerCase();
    
    return searchTerms.every(term => listingText.includes(term));
  });

  return (
    <main>
      <Navigation />
      <section className="bg-gradient-to-br from-brand/10 via-white to-accent/5 py-12 mb-8">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-8">
            <SearchIcon />
            <h1 className="text-3xl font-bold text-brand">
              Résultats de recherche pour "{query}"
            </h1>
          </div>
          
          {filteredListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <Link 
                  href={`/${listing.category.toLowerCase()}/${listing.id}`}
                  key={listing.id}
                  className="card hover:shadow-xl transition-shadow animate-fade-in"
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <SearchIcon />
              <h2 className="text-2xl font-semibold mb-2 mt-6 text-brand">Aucun résultat trouvé</h2>
              <p className="text-muted mb-6">
                Essayez d'autres termes de recherche ou parcourez nos catégories.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/" className="btn-primary">Retour à l'accueil</Link>
                <Link href="/ajouter-annonce" className="btn-secondary">Ajouter une annonce</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 