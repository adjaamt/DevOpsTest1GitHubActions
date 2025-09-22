import Navigation from '@/components/Navigation';
import Link from 'next/link';

// Dummy user and listings data for demonstration
const user = {
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  phone: '+221 77 123 45 67',
};
const listings = [
  {
    id: 1,
    title: "Obtenez dès maintenant une adresse email professionnelle",
    category: "Boutique",
    date: "mai 8, 2025",
    status: "active",
  },
  {
    id: 2,
    title: "SIDCOM",
    category: "Services",
    date: "mai 8, 2025",
    status: "inactive",
  },
];

export default function Dashboard() {
  return (
    <main>
      <Navigation />
      <section className="bg-gradient-to-br from-brand/10 via-white to-accent/5 py-12 mb-8 animate-fade-in">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-brand mb-2">Bienvenue, {user.name} !</h1>
          <p className="text-muted mb-6">Gérez vos informations et vos annonces depuis votre espace personnel.</p>
        </div>
      </section>
      <section className="container-custom max-w-3xl mx-auto pb-16 animate-fade-in">
        <div className="bg-white rounded-xl shadow-card p-8 mb-10">
          <h2 className="text-2xl font-bold text-brand mb-4">Profil</h2>
          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="label">Nom</label>
              <input type="text" id="name" className="input" defaultValue={user.name} />
            </div>
            <div>
              <label htmlFor="email" className="label">E-mail</label>
              <input type="email" id="email" className="input" defaultValue={user.email} />
            </div>
            <div>
              <label htmlFor="phone" className="label">Téléphone</label>
              <input type="tel" id="phone" className="input" defaultValue={user.phone} />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="btn-primary px-8">Enregistrer</button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl shadow-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brand">Mes annonces</h2>
            <Link href="/ajouter-annonce" className="btn-secondary">Ajouter une annonce</Link>
          </div>
          {listings.length > 0 ? (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div key={listing.id} className="flex flex-col md:flex-row md:items-center justify-between bg-accent/5 rounded-lg p-4 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-semibold text-brand mb-1">{listing.title}</h3>
                    <div className="text-sm text-muted mb-1">{listing.category} • Ajouté le {listing.date}</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${listing.status === 'active' ? 'bg-brand text-white' : 'bg-muted text-muted'}`}>
                      {listing.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link href={`/${listing.category.toLowerCase()}/${listing.id}`} className="btn-primary px-4 py-1 text-sm">Voir</Link>
                    <button className="btn-secondary px-4 py-1 text-sm">Modifier</button>
                    <button className="bg-red-100 text-red-700 font-semibold rounded-lg px-4 py-1 text-sm hover:bg-red-200 transition-colors">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted py-8">Vous n'avez pas encore publié d'annonce.</div>
          )}
        </div>
      </section>
    </main>
  );
} 