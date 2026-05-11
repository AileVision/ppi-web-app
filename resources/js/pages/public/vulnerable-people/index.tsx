import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useLang from '@/hooks/useLang';
import { Heart, MapPin } from 'lucide-react';

interface Props {
    categories: any[];
}

export default function VulnerablePeopleIndex({ categories = [] }: Props) {
    const { t, locale } = useLang();

    // On sélectionne la première catégorie par défaut pour les onglets
    const defaultCategory = categories && categories.length > 0 ? categories[0].id.toString() : '';

    return (
        <PublicLayout>
            <Head title={t('Vulnerable People')} />

            {/* HEADER */}
            <section className="bg-rose-50 py-12 md:py-20 border-b border-rose-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                        {t('Support Vulnerable People')}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        {t('vulnerable_intro')}
                    </p>
                </div>
            </section>

            {/* CONTENU (ONGLETS PAR CATÉGORIE) */}
            <section className="py-12 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {categories.length > 0 ? (
                        <Tabs defaultValue={defaultCategory} className="w-full">
                            
                            {/* Les boutons des catégories */}
                            <div className="flex justify-center mb-8">
                                <TabsList className="bg-slate-100 p-1 flex-wrap h-auto justify-center">
                                    {categories.map((cat) => (
                                        <TabsTrigger key={cat.id} value={cat.id.toString()} className="text-sm md:text-base px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm">
                                            {cat.name[locale] || cat.name.en}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {/* Le contenu de chaque catégorie */}
                            {categories.map((cat) => (
                                <TabsContent key={cat.id} value={cat.id.toString()} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        
                                        {cat.beneficiaries.map((ben: any) => (
                                            <Card key={ben.id} className="overflow-hidden flex flex-col hover:border-rose-200 transition-colors">
                                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                                    <img src={ben.photo_path} alt={ben.first_name} className="w-full h-full object-cover" />
                                                </div>
                                                <CardContent className="pt-4 flex-grow">
                                                    <h3 className="text-xl font-bold text-slate-900">{ben.first_name}, {ben.age}</h3>
                                                    {ben.location && (
                                                        <p className="text-sm text-slate-500 flex items-center mt-1 mb-3">
                                                            <MapPin className="h-3 w-3 mr-1" /> {ben.location}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-slate-600 line-clamp-3">
                                                        {ben.situation_excerpt[locale]}...
                                                    </p>
                                                </CardContent>
                                                <CardFooter className="pt-0 border-t border-slate-50 bg-slate-50/50 mt-auto flex flex-col gap-2 p-4">
                                                    <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                                                        <Link href={route('vulnerable-people.show', ben.id)}>
                                                            <Heart className="mr-2 h-4 w-4" /> {t('Read their story')}
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}

                                        {cat.beneficiaries.length === 0 && (
                                            <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-lg">
                                                {t('No profiles available in this category.')}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            {t('No categories configured.')}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}