'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background animate-fade-in">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-brand mb-4">404</h1>
        <h2 className="text-3xl font-bold text-brand mb-2">Page non trouvée</h2>
        <p className="text-muted mb-8">Oups ! La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-primary px-8 py-3 text-lg">Retour à l'accueil</Link>
      </div>
    </main>
  );
} 