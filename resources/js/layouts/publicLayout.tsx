import React, { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useLang from '@/hooks/useLang';
import { SharedData } from '@/types';
import { Button } from '@/components/ui/button';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { t, locale } = useLang();
    const { localesUrls } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header / Navbar */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href={localesUrls[locale as keyof typeof localesUrls] || '/'}>
                            <img src="/logo.png" alt="PPI Logo" className="h-10 w-auto" />
                            <span className="ml-2 font-bold text-xl text-slate-800">PPI</span>
                        </Link>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href={route('who-we-are')} className="text-slate-600 hover:text-slate-900">
                            {t('Who we are')}
                        </Link>
                        <Link href={route('what-we-do')} className="text-slate-600 hover:text-slate-900">
                            {t('What we do')}
                        </Link>
                        <Link href={route('transparency')} className="text-slate-600 hover:text-slate-900">
                            {t('Transparency & Trust')}
                        </Link>
                        <Link href={route('contact')} className="text-slate-600 hover:text-slate-900">
                            {t('Contact us')}
                        </Link>
                        <Link href={route('projects.index')} className="text-slate-600 hover:text-slate-900">
                            {t('Community Projects')}
                        </Link>
                        <Link href={route('vulnerable-people.index')} className="text-slate-600 hover:text-slate-900">
                            {t('Vulnerable People')}
                        </Link>
                    </nav>

                    {/* Sélecteur de Langue & Action */}
                    <div className="flex items-center space-x-4">
                        <div className="flex bg-slate-100 rounded-md p-1">
                            {/* Bouton EN */}
                            <a href={localesUrls.en} 
                               className={`px-2 py-1 text-xs rounded font-medium ${locale === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                                EN
                            </a>
                            {/* Bouton FR */}
                            <a href={localesUrls.fr} 
                               className={`px-2 py-1 text-xs rounded font-medium ${locale === 'fr' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                                FR
                            </a>
                        </div>
                        
                        <Button variant="default">
                            {t('Donate')}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Contenu Principal */}
            <main className="flex-grow">
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