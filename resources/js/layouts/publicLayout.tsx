import React, { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useLang from '@/hooks/useLang';
import { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { t, locale } = useLang();
    const { localesUrls } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: t('Who we are'), href: route('who-we-are') },
        { label: t('What we do'), href: route('what-we-do') },
        { label: t('Transparency & Trust'), href: route('transparency') },
        { label: t('Contact us'), href: route('contact') },
        { label: t('Community Projects'), href: route('projects.index') },
        { label: t('Vulnerable People'), href: route('vulnerable-people.index') },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header / Navbar */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
                        <Link href={localesUrls[locale as keyof typeof localesUrls] || '/'} className="flex items-center gap-1 sm:gap-2">
                            <img src="/logo.png" alt="PPI Logo" className="h-8 sm:h-10 w-auto" />
                            <span className="font-bold text-lg sm:text-xl text-slate-800">PPI</span>
                        </Link>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm lg:text-base text-slate-600 hover:text-slate-900 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Sélecteur de Langue & Action */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex bg-slate-100 rounded-md p-1">
                            {/* Bouton EN */}
                            <a href={localesUrls.en} 
                               className={`px-2 py-1 text-xs rounded font-medium transition-colors ${locale === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                                EN
                            </a>
                            {/* Bouton FR */}
                            <a href={localesUrls.fr} 
                               className={`px-2 py-1 text-xs rounded font-medium transition-colors ${locale === 'fr' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                                FR
                            </a>
                        </div>
                        
                        <Button variant="default" size="sm" className="hidden sm:inline-flex">
                            {t('Donate')}
                        </Button>

                        {/* Hamburger Menu Button (Mobile Only) */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white">
                        <nav className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href} 
                                    className="block px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {/* Language Selector Mobile */}
                            <div className="pt-2 border-t border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 px-3 py-2">{t('Language')}</p>
                                <div className="flex gap-2 px-3">
                                    <a href={localesUrls.en} 
                                       className={`px-3 py-2 text-sm rounded font-medium transition-colors ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        EN
                                    </a>
                                    <a href={localesUrls.fr} 
                                       className={`px-3 py-2 text-sm rounded font-medium transition-colors ${locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        FR
                                    </a>
                                </div>
                            </div>

                            {/* Donate Button Mobile */}
                            <div className="pt-2">
                                <Button variant="default" className="w-full">
                                    {t('Donate')}
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Contenu Principal */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Philanthropic Project International. {t('All rights reserved')}.</p>
                </div>
            </footer>
        </div>
    );
}