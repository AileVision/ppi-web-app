import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import useLang from '@/hooks/useLang';
import { Button } from '@/components/ui/button';
import { BookOpen, Stethoscope, Users, ShieldAlert } from 'lucide-react';

export default function WhatWeDo() {
    const { t } = useLang();

    const areas =[
        { title: t('Education'), desc: t('Building schools and providing supplies.'), icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: t('Health'), desc: t('Improving access to clean water and medical care.'), icon: Stethoscope, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { title: t('Community Development'), desc: t('Empowering local agriculture and economy.'), icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
        { title: t('Vulnerable Groups'), desc: t('Direct support to children, the sick, and disabled.'), icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-100' },
    ];

    return (
        <PublicLayout>
            <Head title={t('What we do')} />
            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">{t('What we do')}</h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            {t('We intervene mainly in rural areas of Togo, focusing on sustainable and community-driven actions.')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {areas.map((area, idx) => (
                            <div key={idx} className="flex p-6 border rounded-xl hover:shadow-md transition-shadow">
                                <div className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${area.bg} ${area.color} mr-6`}>
                                    <area.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{area.title}</h3>
                                    <p className="text-slate-600 text-lg">{area.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center bg-slate-50 p-12 rounded-2xl border border-slate-100">
                        <h2 className="text-2xl font-bold mb-6">{t('See our actions in the field')}</h2>
                        <div className="flex justify-center gap-4">
                            <Button asChild size="lg" className="bg-blue-600">
                                <Link href={route('projects.index')}>{t('Community Projects')}</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href={route('vulnerable-people.index')}>{t('Vulnerable People')}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}