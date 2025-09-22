'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Heroicons SVG imports (inline for now)
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const TagIcon = () => (
  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M3 11l9-9 9 9-9 9-9-9z" /></svg>
);
const BriefcaseIcon = () => (
  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6m8-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V8a2 2 0 00-2-2h-3.5a1.5 1.5 0 01-3 0H6a2 2 0 00-2 2v4m16 0H4" /></svg>
);
const BuildingIcon = () => (
  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h3V3h8v2h3a2 2 0 012 2v14M9 21V9h6v12" /></svg>
);
const PlusIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /></svg>
);

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    }
    return 'dark';
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-full border border-border bg-card hover:bg-accent transition-colors"
      type="button"
    >
      {mounted && (theme === 'dark' ? (
        // Sun icon for light mode
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ))}
    </button>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be replaced with your actual auth state
  const pathname = usePathname();

  const handleAddListing = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      window.location.href = '/login';
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-30 bg-brand-dark shadow-header animate-fade-in">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Thiès Annonces Logo" width={64} height={64} className="rounded-full w-16 h-16 object-contain bg-transparent" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            <Link 
              href="/" 
              className={`flex items-center uppercase font-semibold text-foreground hover:text-accent border-b-2 transition-all px-2 py-1 text-sm lg:text-base ${
                isActive('/') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <HomeIcon /> <span className="ml-1">Accueil</span>
            </Link>
            <Link 
              href="/a-vendre" 
              className={`flex items-center uppercase font-semibold text-foreground hover:text-accent border-b-2 transition-all px-2 py-1 text-sm lg:text-base ${
                isActive('/a-vendre') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <TagIcon /> <span className="ml-1">Boutique</span>
            </Link>
            <Link 
              href="/services" 
              className={`flex items-center uppercase font-semibold text-foreground hover:text-accent border-b-2 transition-all px-2 py-1 text-sm lg:text-base ${
                isActive('/services') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <BriefcaseIcon /> <span className="ml-1">Services</span>
            </Link>
            <Link 
              href="/immobilier" 
              className={`flex items-center uppercase font-semibold text-foreground hover:text-accent border-b-2 transition-all px-2 py-1 text-sm lg:text-base ${
                isActive('/immobilier') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <BuildingIcon /> <span className="ml-1">Immobilier</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-2 lg:space-x-3 items-center">
            <Link href="/login" className="flex items-center px-4 py-2 text-sm lg:text-base font-semibold text-brand hover:text-accent transition-colors">
              <UserIcon /> <span className="ml-1">Se connecter</span>
            </Link>
            <Link 
              href="/ajouter-annonce" 
              onClick={handleAddListing}
              className="btn-primary flex items-center text-sm lg:text-base"
            >
              <PlusIcon /> <span className="ml-1">Ajouter une annonce</span>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            <svg
              className="w-7 h-7 text-accent"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <Link 
              href="/" 
              className={`flex items-center px-4 py-2 text-foreground hover:text-accent border-l-4 transition-all ${
                isActive('/') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <HomeIcon /> <span className="ml-1">Accueil</span>
            </Link>
            <Link 
              href="/a-vendre" 
              className={`flex items-center px-4 py-2 text-foreground hover:text-accent border-l-4 transition-all ${
                isActive('/a-vendre') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <TagIcon /> <span className="ml-1">Boutique</span>
            </Link>
            <Link 
              href="/services" 
              className={`flex items-center px-4 py-2 text-foreground hover:text-accent border-l-4 transition-all ${
                isActive('/services') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <BriefcaseIcon /> <span className="ml-1">Services</span>
            </Link>
            <Link 
              href="/immobilier" 
              className={`flex items-center px-4 py-2 text-foreground hover:text-accent border-l-4 transition-all ${
                isActive('/immobilier') ? 'text-accent border-accent' : 'border-transparent hover:border-accent'
              }`}
            >
              <BuildingIcon /> <span className="ml-1">Immobilier</span>
            </Link>
            <div className="pt-4 space-y-2">
              <Link href="/login" className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-brand hover:text-accent transition-colors">
                <UserIcon /> <span className="ml-1">Se connecter</span>
              </Link>
              <Link 
                href="/ajouter-annonce" 
                onClick={handleAddListing}
                className="btn-primary flex items-center justify-center w-full text-base"
              >
                <PlusIcon /> <span className="ml-1">Ajouter une annonce</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 