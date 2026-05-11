import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useLang from '@/hooks/useLang';
import { MapPin, Heart, ArrowLeft, Landmark, Copy, Check, Quote } from 'lucide-react';

interface Props {
    beneficiary: any;
}

export default function VulnerablePersonShow({ beneficiary }: Props) {
    const { t, locale } = useLang();
    const[copied, setCopied] = useState(false);
    const bankAccount = beneficiary.category.bank_account;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PublicLayout>
            <Head title={`${beneficiary.first_name} - ${beneficiary.category.name[locale]}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <Link href={route('vulnerable-people.index')} className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('Back to list')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* COLONNE GAUCHE : L'histoire de la personne */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Photo (respectueuse) */}
                            <div className="w-full md:w-1/3 shrink-0">
                                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100">
                                    <img src={beneficiary.photo_path} alt={beneficiary.first_name} className="w-full aspect-[4/5] object-cover" />
                                </div>
                            </div>

                            {/* Infos de base */}
                            <div className="flex-1 pt-4">
                                <div className="inline-block bg-rose-100 text-rose-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                                    {beneficiary.category.name[locale] || beneficiary.category.name.en}
                                </div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
                                    {beneficiary.first_name}, {beneficiary.age} {t('years old')}
                                </h1>
                                {beneficiary.location && (
                                    <div className="flex items-center text-slate-500 mt-2 text-lg">
                                        <MapPin className="mr-2 h-5 w-5" />
                                        {beneficiary.location}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* La situation */}
                        <section className="bg-slate-50 p-8 rounded-2xl relative">
                            <Quote className="absolute top-6 left-6 h-10 w-10 text-slate-200" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10 ml-8">{t('Their Situation')}</h2>
                            <p className="text-slate-700 leading-relaxed text-lg relative z-10 ml-8 whitespace-pre-line">
                                {beneficiary.situation[locale] || beneficiary.situation.en}
                            </p>
                        </section>

                        {/* Les Besoins */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('Identified Needs')}</h2>
                            <div className="bg-rose-50/50 p-6 rounded-xl border border-rose-100 text-slate-700 whitespace-pre-line leading-relaxed text-lg">
                                {beneficiary.needs[locale] || beneficiary.needs.en}
                            </div>
                        </section>
                    </div>

                    {/* COLONNE DROITE : Action & Transparence (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            
                            <Card className="border-rose-100 shadow-md">
                                <CardHeader className="bg-rose-50 pb-4">
                                    <CardTitle className="text-xl text-rose-900">{t('Support')} {beneficiary.first_name}</CardTitle>
                                    <CardDescription>
                                        {t('Your donation will be directed to the dedicated fund for')} <strong>{beneficiary.category.name[locale]}</strong>.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <Button className="w-full bg-rose-600 hover:bg-rose-700 h-12 text-lg">
                                        <Heart className="mr-2 h-5 w-5" /> {t('Donate')}
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* AFFICHAGE DU COMPTE BANCAIRE DE LA CATÉGORIE */}
                            <Card className="border-emerald-100 shadow-sm bg-emerald-50/30">
                                <CardHeader className="pb-3 border-b border-emerald-100">
                                    <CardTitle className="text-lg flex items-center text-emerald-800">
                                        <Landmark className="mr-2 h-5 w-5" />
                                        {t('Bank Information')}
                                    </CardTitle>
                                    <CardDescription className="text-emerald-600/80">
                                        {t('Bank details assigned to the category:')} <br/>
                                        <strong className="text-emerald-800">{beneficiary.category.name[locale]}</strong>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm text-slate-700">
                                    {bankAccount ? (
                                        <>
                                            <div>
                                                <span className="block text-slate-500 text-xs uppercase tracking-wider">{t('Account Name')}</span>
                                                <span className="font-semibold">{bankAccount.account_name}</span>
                                            </div>
                                            <div>
                                                <span className="block text-slate-500 text-xs uppercase tracking-wider">{t('Bank')}</span>
                                                <span className="font-medium">{bankAccount.bank_name} ({bankAccount.country})</span>
                                            </div>
                                            
                                            {bankAccount.iban && (
                                                <div className="pt-2">
                                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">IBAN</span>
                                                    <div className="flex items-center justify-between bg-white px-3 py-2 border border-emerald-200 rounded-md mt-1">
                                                        <code className="text-emerald-800 font-mono text-xs sm:text-sm">{bankAccount.iban}</code>
                                                        <button 
                                                            onClick={() => copyToClipboard(bankAccount.iban)}
                                                            className="text-emerald-600 hover:text-emerald-800 p-1"
                                                        >
                                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-orange-600 bg-orange-50 p-2 rounded text-xs">
                                            {t('Bank information is currently being configured for this category.')}
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