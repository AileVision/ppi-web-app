import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import useLang from '@/hooks/useLang';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    const { t } = useLang();

    return (
        <PublicLayout>
            <Head title={t('Contact us')} />

            <section className="bg-slate-900 text-white py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{t('Contact us')}</h1>
                    <p className="text-xl text-slate-200 leading-relaxed">
                        {t('contact_intro')}
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
                    <div className="p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{t('Email')}</h2>
                        <p className="text-slate-600">contact@ppi-togo.org</p>
                    </div>

                    <div className="p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{t('Phone')}</h2>
                        <p className="text-slate-600">+228 90 00 00 00</p>
                    </div>

                    <div className="p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{t('Address')}</h2>
                        <p className="text-slate-600">Lomé, Togo</p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
