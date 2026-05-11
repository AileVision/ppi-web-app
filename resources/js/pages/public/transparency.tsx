import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import useLang from '@/hooks/useLang';
import { ShieldCheck, ArrowRightLeft, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Transparency() {
    const { t } = useLang();

    return (
        <PublicLayout>
            <Head title={t('Transparency & Trust')} />
            
            <section className="bg-emerald-900 text-white py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{t('Transparency & Trust')}</h1>
                    <p className="text-xl text-emerald-100 leading-relaxed">
                        {t('100% traceability. You know exactly where your money goes.')}
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white min-h-[50vh]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('Our Commitment')}</h2>
                        <p className="text-lg text-slate-600">
                            {t('At PPI, we believe trust is earned. We use a unique financial model based on the "specification of donation".')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-emerald-100 bg-emerald-50/30">
                            <CardHeader>
                                <ArrowRightLeft className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle className="text-xl">{t('Direct Financial Routing')}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-700">
                                {t('We display the specific bank account assigned to each community project or vulnerable category. When you donate, your funds bypass general administrative pots and go straight to the dedicated account.')}
                            </CardContent>
                        </Card>

                        <Card className="border-emerald-100 bg-emerald-50/30">
                            <CardHeader>
                                <Lock className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle className="text-xl">{t('Ethical Responsibility')}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-700">
                                {t('We strictly protect the dignity and privacy of the vulnerable individuals we present. Consent is obtained for all images and stories shared on our platform.')}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}