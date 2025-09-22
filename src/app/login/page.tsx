'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

// Optional: subtle icons for fields
const MailIcon = () => (
  <svg className="w-5 h-5 text-muted mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5 text-muted mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 flex items-center justify-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl shadow-card p-10 animate-fade-in border border-border dark:border-0">
              <div className="flex justify-center mb-8 gap-2">
                <button
                  className={`px-6 py-2 font-semibold text-lg rounded-t transition-colors duration-200 border-b-2 focus:outline-none ${
                    isLogin
                      ? 'text-brand border-accent'
                      : 'text-muted border-transparent hover:text-accent'
                  }`}
                  onClick={() => setIsLogin(true)}
                >
                  Se connecter
                </button>
                <button
                  className={`px-6 py-2 font-semibold text-lg rounded-t transition-colors duration-200 border-b-2 focus:outline-none ${
                    !isLogin
                      ? 'text-brand border-accent'
                      : 'text-muted border-transparent hover:text-accent'
                  }`}
                  onClick={() => setIsLogin(false)}
                >
                  S'inscrire
                </button>
              </div>

              {isLogin ? (
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="label">
                      Identifiant ou e-mail
                    </label>
                    <div className="flex items-center">
                      <MailIcon />
                      <input
                        type="email"
                        id="email"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="label">
                      Mot de passe
                    </label>
                    <div className="flex items-center">
                      <LockIcon />
                      <input
                        type="password"
                        id="password"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="w-full btn-primary text-lg">
                      Se connecter
                    </button>
                  </div>

                  <div className="text-center mt-2">
                    <Link href="/reset-password" className="text-sm text-brand hover:text-accent transition-colors">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                </form>
              ) : (
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="label">
                      E-mail
                    </label>
                    <div className="flex items-center">
                      <MailIcon />
                      <input
                        type="email"
                        id="email"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="label">
                      Mot de passe
                    </label>
                    <div className="flex items-center">
                      <LockIcon />
                      <input
                        type="password"
                        id="password"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="w-full btn-primary text-lg">
                      S'inscrire
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 