import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import useLang from '@/hooks/useLang';
import { Target, Heart, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMember {
    id: number;
    full_name: string;
    type: 'board' | 'staff';
    position: Record<string, string>;
    professional_title: Record<string, string> | null;
    role_description: Record<string, string>;
    photo_path: string | null;
}

export default function WhoWeAre({ team }: { team: TeamMember[] }) {
    const { t, locale } = useLang();
    
    const boardMembers = team.filter(m => m.type === 'board');
    const staffMembers = team.filter(m => m.type === 'staff');

    return (
        <PublicLayout>
            <Head title={t('Who we are')} />

            {/* HEADER */}
            <section className="bg-slate-900 text-white py-16 md:py-24 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{t('Who we are')}</h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        {t('ppi_presentation')}
                    </p>
                </div>
            </section>

            {/* VISION, MISSION, VALEURS */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                    <Card className="border-none shadow-md">
                        <CardHeader className="text-center pb-2">
                            <Eye className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                            <CardTitle className="text-2xl">{t('Our Vision')}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-slate-600">
                            {t('A world where vulnerable communities have the power to thrive independently.')}
                        </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-md bg-blue-600 text-white">
                        <CardHeader className="text-center pb-2">
                            <Target className="w-12 h-12 mx-auto text-blue-200 mb-4" />
                            <CardTitle className="text-2xl text-white">{t('Our Mission')}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-blue-100">
                            {t('To improve the living conditions of disadvantaged populations in Togo through health, education, and community development.')}
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                        <CardHeader className="text-center pb-2">
                            <Heart className="w-12 h-12 mx-auto text-rose-600 mb-4" />
                            <CardTitle className="text-2xl">{t('Our Values')}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-slate-600">
                            {t('Transparency, Dignity, Community Participation, and Sustainability.')}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* NOTRE ÉQUIPE (Générée dynamiquement depuis la DB) */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">{t('Our Team')}</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
                    </div>

                    {/* BOARD OF DIRECTORS */}
                    {boardMembers.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-slate-800 mb-8">{t('Board of Directors')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {boardMembers.map(member => (
                                    <div key={member.id} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm bg-slate-200">
                                            {member.photo_path ? <img src={member.photo_path} alt={member.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200"></div>}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900">{member.full_name}</h4>
                                        <p className="text-blue-600 font-medium mb-1">{member.position[locale] || member.position.en}</p>
                                        {member.professional_title && (
                                            <p className="text-sm text-slate-500 mb-3 italic">{member.professional_title[locale] || member.professional_title.en}</p>
                                        )}
                                        <p className="text-sm text-slate-600 mt-2">{member.role_description[locale] || member.role_description.en}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STAFF */}
                    {staffMembers.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-8">{t('Executive Staff')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {staffMembers.map(member => (
                                    <div key={member.id} className="flex flex-col items-center text-center p-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-slate-200 bg-slate-100">
                                            {member.photo_path && <img src={member.photo_path} alt={member.full_name} className="w-full h-full object-cover" />}
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900">{member.full_name}</h4>
                                        <p className="text-rose-600 font-medium text-sm mb-2">{member.position[locale] || member.position.en}</p>
                                        <p className="text-xs text-slate-600">{member.role_description[locale] || member.role_description.en}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}