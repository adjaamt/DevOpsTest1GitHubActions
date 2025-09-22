import Navigation from '@/components/Navigation';
import Link from 'next/link';

// SVG icons
const PriceIcon = () => (
  <svg className="w-6 h-6 text-accent mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8" /></svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5 text-muted mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2" stroke="#e5e7eb" /><path d="M16 2v4M8 2v4M3 10h18" stroke="#1e3a8a" /></svg>
);
const LocationIcon = () => (
  <svg className="w-5 h-5 text-brand mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c-4 0-7 2-7 4v2a2 2 0 002 2h10a2 2 0 002-2v-2c0-2-3-4-7-4z" /></svg>
);

interface Listing {
  title: string;
  category: string;
  date: string;
  description: string;
  relatedItems: string[];
  price?: string;
  type?: string;
  location?: string;
}

const listings: Record<string, Listing> = {
  '1': {
    title: 'Obtenez dès maintenant une adresse email professionnelle',
    category: 'Boutique',
    date: 'mai 8, 2025',
    price: '50,000 FCFA',
    type: 'Autre',
    location: 'Thiès',
    description: 'Profitez d\'une adresse email professionnelle pour votre entreprise ou projet. Service rapide et fiable.',
    relatedItems: ['2', '3'],
  },
  '2': {
    title: 'SIDCOM',
    category: 'Services',
    date: 'mai 8, 2025',
    location: 'Espace Coworking Rufisque ouest, sortie 9',
    description: 'Solutions informatiques et services professionnels pour entreprises et particuliers.',
    relatedItems: ['1', '3'],
  },
  '3': {
    title: 'Espace Coworking Rufisque ouest, sortie 9',
    category: 'Immobilier',
    date: 'mai 8, 2025',
    type: 'Autre',
    description: 'Un espace moderne et équipé pour vos besoins professionnels à Rufisque ouest.',
    relatedItems: ['1', '2'],
  },
};

export default function ListingDetails({ params }: { params: { id: string; category: string } }) {
  const id = params.id as keyof typeof listings;
  const listing = listings[id];

  if (!listing) {
    return (
      <main>
        <Navigation />
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-brand mb-4">Annonce non trouvée</h1>
          <Link href={`/${params.category}`} className="btn-secondary">Retour à la catégorie</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navigation />
      <section className="bg-gradient-to-br from-brand/10 via-white to-accent/5 py-12 mb-8">
        <div className="container-custom flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Gallery Placeholder */}
          <div className="w-full md:w-1/2 h-64 bg-muted rounded-lg flex items-center justify-center text-muted mb-6 md:mb-0">
            (Galerie à venir)
          </div>
          {/* Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-extrabold text-brand mb-4 drop-shadow-lg">{listing.title}</h1>
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center text-sm text-muted mr-4">
                <CalendarIcon /> {listing.date}
              </span>
              <span className="inline-flex items-center text-sm text-muted">
                {listing.category}
              </span>
            </div>
            {listing.price && (
              <div className="flex items-center text-xl font-bold text-accent mb-2">
                <PriceIcon /> {listing.price}
              </div>
            )}
            {listing.type && (
              <div className="text-sm text-muted mb-2">Type: {listing.type}</div>
            )}
            {listing.location && (
              <div className="flex items-center text-sm text-muted mb-2">
                <LocationIcon /> {listing.location}
              </div>
            )}
            <p className="text-lg text-foreground mb-6 mt-4">{listing.description}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/ajouter-annonce" className="btn-primary px-8 py-3 text-lg">Contacter</Link>
              <Link href={`/${params.category}`} className="btn-secondary px-8 py-3 text-lg">Retour</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Items Section */}
      {listing.relatedItems && listing.relatedItems.length > 0 && (
        <section className="container-custom pb-16">
          <h2 className="text-2xl font-bold text-brand mb-8">Produits et services similaires</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listing.relatedItems.map((relatedId) => {
              const relatedListing = listings[relatedId];
              if (!relatedListing) return null;
              
              return (
                <Link
                  href={`/${params.category}/${relatedId}`}
                  key={relatedId}
                  className="card hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-brand mb-2">{relatedListing.title}</h3>
                  <div className="flex items-center text-sm text-muted mb-2">
                    <CalendarIcon /> {relatedListing.date}
                  </div>
                  {relatedListing.price && (
                    <div className="text-lg font-bold text-accent mb-2">{relatedListing.price}</div>
                  )}
                  {relatedListing.type && (
                    <div className="text-sm text-muted mb-2">Type: {relatedListing.type}</div>
                  )}
                  {relatedListing.location && (
                    <div className="flex items-center text-sm text-muted">
                      <LocationIcon /> {relatedListing.location}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
} 