'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background animate-fade-in">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-accent mb-4">500</h1>
        <h2 className="text-3xl font-bold text-brand mb-2">Erreur interne du serveur</h2>
        <p className="text-muted mb-8">Désolé, une erreur inattendue s'est produite. Veuillez réessayer plus tard.</p>
        <Link href="/" className="btn-primary px-8 py-3 text-lg">Retour à l'accueil</Link>
      </div>
    </main>
  );
} 