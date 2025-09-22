'use client';

import Navigation from '@/components/Navigation';

export default function ResetPassword() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen bg-background py-16 flex items-center justify-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-card p-10 animate-fade-in">
              <h1 className="text-3xl font-extrabold text-brand mb-8 text-center">Réinitialiser le mot de passe</h1>
              <p className="text-muted mb-6 text-center">
                Veuillez saisir votre identifiant ou votre adresse e-mail.<br />
                Un lien permettant de créer un nouveau mot de passe vous sera envoyé par e-mail.
              </p>
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="label">Identifiant ou e-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <button type="submit" className="w-full btn-primary text-lg">
                    Envoyer un e-mail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 