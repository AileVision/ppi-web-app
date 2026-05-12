import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout'; // Assure-toi que le chemin correspond à ton layout créé précédemment
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useLang from '@/hooks/useLang';
import { HeartHandshake, Earth, Users } from 'lucide-react';

export default function Home() {
    const { t } = useLang();

    return (
        <PublicLayout>
            <Head title={t('Home')} />

            {/* SECTION 1 : HERO (Bannière d'accueil) */}
            <section className="relative bg-slate-900 text-white">
                {/* Image de fond (à remplacer par une vraie photo du Togo) */}
                <div className="absolute inset-0 overflow-hidden opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                        alt="Enfants au Togo" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
                        {t('Empowering Vulnerable Communities in Togo')}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-slate-200 max-w-3xl mb-8 md:mb-10">
                        {t('hero_subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg px-6 md:px-8">
                            <HeartHandshake className="mr-2 h-5 w-5" />
                            {t('Donate now')}
                        </Button>
                        <Button size="lg" variant="outline" className="text-slate-900 bg-white hover:bg-slate-100 text-base md:text-lg px-6 md:px-8" asChild>
                            <Link href={route('projects.index')}>
                                {t('Discover our projects')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* SECTION 2 : PRÉSENTATION SYNTHÉTIQUE */}
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t('Who we are')}</h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-4xl mx-auto">
                        {t('ppi_presentation')}
                    </p>
                </div>
            </section>

            {/* SECTION 3 : ACTIONS PRIORITAIRES (Orientation vers les 2 cœurs du site) */}
            <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">{t('Our Priority Actions')}</h2>
                        <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600">{t('Choose where your support goes with full transparency.')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                        
                        {/* Carte : Projets Communautaires */}
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center">
                                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <Earth className="h-8 w-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl md:text-2xl">{t('Community Projects')}</CardTitle>
                                <CardDescription className="text-sm md:text-base mt-2">
                                    {t('Support collective initiatives in education, health, and development.')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center pb-6 md:pb-8">
                                <Button asChild variant="default" className="text-base md:text-lg">
                                    <Link href={route('projects.index')}>
                                        {t('View Projects')}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Carte : Personnes Vulnérables */}
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center">
                                <div className="mx-auto bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <Users className="h-8 w-8 text-rose-600" />
                                </div>
                                <CardTitle className="text-xl md:text-2xl">{t('Vulnerable People')}</CardTitle>
                                <CardDescription className="text-sm md:text-base mt-2">
                                    {t('Provide direct help to children, the sick, and people with disabilities.')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center pb-6 md:pb-8">
                                <Button asChild variant="default" className="text-base md:text-lg">
                                    <Link href={route('vulnerable-people.index')}>
                                        {t('Support Individuals')}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
