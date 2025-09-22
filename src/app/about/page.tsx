import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <main>
      <Navigation />
      <section className="bg-gradient-to-br from-brand/10 via-white to-accent/5 py-16 mb-8 animate-fade-in">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-brand mb-4">À propos de Thiès Annonces</h1>
          <p className="text-lg text-muted mb-8">
            Thiès Annonces est la plateforme moderne et locale pour acheter, vendre et trouver des services à Thiès. Notre mission est de connecter la communauté, de faciliter les échanges et de promouvoir l'entrepreneuriat local.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-brand mb-2">Communauté</h3>
              <p className="text-muted">Favoriser les échanges locaux et la confiance entre utilisateurs.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand mb-2">Simplicité</h3>
              <p className="text-muted">Une expérience fluide, rapide et accessible à tous.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand mb-2">Sécurité</h3>
              <p className="text-muted">Des annonces vérifiées et un support à votre écoute.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container-custom max-w-2xl mx-auto py-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-brand mb-6 text-center">Contactez-nous</h2>
        <form className="space-y-6 bg-white rounded-xl shadow-card p-8">
          <div>
            <label htmlFor="name" className="label">Nom</label>
            <input type="text" id="name" className="input" required />
          </div>
          <div>
            <label htmlFor="email" className="label">E-mail</label>
            <input type="email" id="email" className="input" required />
          </div>
          <div>
            <label htmlFor="message" className="label">Message</label>
            <textarea id="message" rows={4} className="input" required />
          </div>
          <div>
            <button type="submit" className="btn-primary w-full text-lg">Envoyer</button>
          </div>
        </form>
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-brand hover:text-accent transition-colors" aria-label="Facebook"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" /></svg></a>
          <a href="#" className="text-brand hover:text-accent transition-colors" aria-label="Twitter"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.72 8.72 0 0024 4.59a8.48 8.48 0 01-2.54.7z" /></svg></a>
          <a href="#" className="text-brand hover:text-accent transition-colors" aria-label="LinkedIn"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg></a>
        </div>
      </section>
    </main>
  );
} 