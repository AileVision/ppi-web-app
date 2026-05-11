import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useLang from '@/hooks/useLang';
import { MapPin, CheckCircle2, Heart, ArrowLeft, Landmark, Copy, Check } from 'lucide-react';

// Interfaces basées sur la base de données
interface BankAccount {
    account_name: string;
    account_number: string;
    bank_name: string;
    iban?: string;
    swift?: string;
    country: string;
}

interface ProjectDetail {
    id: number;
    title: Record<string, string>;
    location: Record<string, string>;
    context: Record<string, string>;
    activities: Record<string, string>; // Sera stocké/rendu sous forme de texte ou liste HTML
    expected_results: Record<string, string>;
    main_image_path: string;
    gallery: string[]; // Liste des chemins d'images
    sectors: { name: Record<string, string> }[];
    bank_account: BankAccount;
}

interface Props {
    project: ProjectDetail;
}

export default function ProjectShow({ project }: Props) {
    const { t, locale } = useLang();
    const[copied, setCopied] = useState(false);

    // Fonction pour copier l'IBAN facilement (très apprécié par les donateurs)
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PublicLayout>
            <Head title={project.title[locale] || project.title.en} />

            {/* HERO SECTION : Titre et Image principale */}
            <div className="bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <Link href={route('projects.index')} className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {t('Back to projects')}
                    </Link>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.sectors.map((sector, idx) => (
                            <span key={idx} className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {sector.name[locale] || sector.name.en}
                            </span>
                        ))}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                        {project.title[locale] || project.title.en}
                    </h1>
                    
                    <div className="flex items-center text-slate-300 text-lg">
                        <MapPin className="mr-2 h-5 w-5" />
                        {project.location[locale] || project.location.en}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* COLONNE GAUCHE : Détails du projet */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* Image Principale */}
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <img src={project.main_image_path} alt="Main" className="w-full h-auto object-cover max-h-[500px]" />
                        </div>

                        {/* Contexte */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('Context & Challenge')}</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {project.context[locale] || project.context.en}
                            </p>
                        </section>

                        {/* Activités et Résultats */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                    <CheckCircle2 className="mr-2 h-5 w-5 text-blue-600" />
                                    {t('Planned Activities')}
                                </h3>
                                <div className="text-slate-600 whitespace-pre-line leading-relaxed">
                                    {project.activities[locale] || project.activities.en}
                                </div>
                            </section>

                            <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                                    {t('Expected Results')}
                                </h3>
                                <div className="text-slate-600 whitespace-pre-line leading-relaxed">
                                    {project.expected_results[locale] || project.expected_results.en}
                                </div>
                            </section>
                        </div>

                        {/* Galerie d'images */}
                        {project.gallery.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('Image Gallery')}</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {project.gallery.map((img, index) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-slate-200">
                                            <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* COLONNE DROITE : Action & Transparence (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            
                            {/* Appel à l'action */}
                            <Card className="border-blue-100 shadow-md">
                                <CardHeader className="bg-blue-50/50 pb-4">
                                    <CardTitle className="text-xl">{t('Support this project')}</CardTitle>
                                    <CardDescription>
                                        {t('Your contribution directly funds the activities of this specific project.')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                                        <Heart className="mr-2 h-5 w-5" /> {t('Donate')}
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* EXIGENCE CRITIQUE TdR : Informations Bancaires */}
                            <Card className="border-emerald-100 shadow-sm bg-emerald-50/30">
                                <CardHeader className="pb-3 border-b border-emerald-100">
                                    <CardTitle className="text-lg flex items-center text-emerald-800">
                                        <Landmark className="mr-2 h-5 w-5" />
                                        {t('Bank Information')}
                                    </CardTitle>
                                    <CardDescription className="text-emerald-600/80">
                                        {t('For direct bank transfers. These details are specific to this project.')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm text-slate-700">
                                    <div>
                                        <span className="block text-slate-500 text-xs uppercase tracking-wider">{t('Account Name')}</span>
                                        <span className="font-semibold">{project.bank_account.account_name}</span>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500 text-xs uppercase tracking-wider">{t('Bank')}</span>
                                        <span className="font-medium">{project.bank_account.bank_name} ({project.bank_account.country})</span>
                                    </div>
                                    
                                    {project.bank_account.iban && (
                                        <div className="pt-2">
                                            <span className="block text-slate-500 text-xs uppercase tracking-wider">IBAN</span>
                                            <div className="flex items-center justify-between bg-white px-3 py-2 border border-emerald-200 rounded-md mt-1">
                                                <code className="text-emerald-800 font-mono text-xs sm:text-sm">{project.bank_account.iban}</code>
                                                <button 
                                                    onClick={() => copyToClipboard(project.bank_account.iban!)}
                                                    className="text-emerald-600 hover:text-emerald-800 p-1"
                                                    title={t('Copy to clipboard')}
                                                >
                                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {project.bank_account.swift && (
                                        <div className="pt-1">
                                            <span className="block text-slate-500 text-xs uppercase tracking-wider">SWIFT / BIC</span>
                                            <span className="font-mono">{project.bank_account.swift}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
