import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateProps {
    sectors: { id: number, name: Record<string, string> }[];
}

export default function CreateProject({ sectors }: CreateProps) {
    const breadcrumbs =[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
        { title: 'Create', href: '/admin/projects/create' },
    ];

    // Initialisation du formulaire avec la structure exigée par le Contrôleur
    const { data, setData, post, processing, errors } = useForm({
        title: { fr: '', en: '' },
        location: { fr: '', en: '' },
        context: { fr: '', en: '' },
        activities: { fr: '', en: '' },
        expected_results: { fr: '', en: '' },
        sector_ids: [] as number[],
        main_image: null as File | null,
        bank_account: {
            account_name: '',
            account_number: '',
            bank_name: '',
            iban: '',
            swift: '',
            country: 'Togo'
        }
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.store'));
    };

    // Helper pour mettre à jour les champs bilingues facilement
    const handleTranslatableChange = (field: keyof typeof data, lang: 'fr' | 'en', value: string) => {
        setData(field, { ...data[field] as any,[lang]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            
            <Heading title="Add New Project" description="Fill the information in both languages." />

            <form onSubmit={submit} className="space-y-8 pb-10">
                
                {/* BLOC 1 : Informations textuelles (Bilingues) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Project Information (Bilingual)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        
                        {/* TITRE */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Title (English) *</Label>
                                <Input required value={data.title.en} onChange={e => handleTranslatableChange('title', 'en', e.target.value)} />
                                {errors['title.en'] && <p className="text-red-500 text-sm">{errors['title.en']}</p>}
                            </div>
                            <div>
                                <Label>Titre (Français) *</Label>
                                <Input required value={data.title.fr} onChange={e => handleTranslatableChange('title', 'fr', e.target.value)} />
                                {errors['title.fr'] && <p className="text-red-500 text-sm">{errors['title.fr']}</p>}
                            </div>
                        </div>

                        {/* CONTEXTE */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Context & Challenge (English) *</Label>
                                <Textarea required rows={4} value={data.context.en} onChange={e => handleTranslatableChange('context', 'en', e.target.value)} />
                            </div>
                            <div>
                                <Label>Contexte & Problématique (Français) *</Label>
                                <Textarea required rows={4} value={data.context.fr} onChange={e => handleTranslatableChange('context', 'fr', e.target.value)} />
                            </div>
                        </div>

                        {/* SECTEURS & LOCALISATION (Omis les FR/EN de loc et act pour raccourcir l'exemple, mais tu as saisi l'idée) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2 block">Sectors *</Label>
                                <div className="flex gap-4 border p-3 rounded-md">
                                    {sectors.map(sector => (
                                        <div key={sector.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`sector-${sector.id}`} 
                                                checked={data.sector_ids.includes(sector.id)}
                                                onCheckedChange={(checked) => {
                                                    const newIds = checked 
                                                        ?[...data.sector_ids, sector.id] 
                                                        : data.sector_ids.filter(id => id !== sector.id);
                                                    setData('sector_ids', newIds);
                                                }}
                                            />
                                            <label htmlFor={`sector-${sector.id}`} className="text-sm">{sector.name.en}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label>Main Image *</Label>
                                <Input type="file" required accept="image/*" onChange={e => setData('main_image', e.target.files?.[0] || null)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BLOC 2 : EXIGENCE TdR -> Informations Bancaires */}
                <Card className="border-emerald-200">
                    <CardHeader className="bg-emerald-50">
                        <CardTitle className="text-emerald-800">Bank Account Information (Transparency)</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 pt-6">
                        <div>
                            <Label>Account Name *</Label>
                            <Input required value={data.bank_account.account_name} onChange={e => setData('bank_account', {...data.bank_account, account_name: e.target.value})} />
                        </div>
                        <div>
                            <Label>Bank Name *</Label>
                            <Input required value={data.bank_account.bank_name} onChange={e => setData('bank_account', {...data.bank_account, bank_name: e.target.value})} />
                        </div>
                        <div>
                            <Label>Account Number *</Label>
                            <Input required value={data.bank_account.account_number} onChange={e => setData('bank_account', {...data.bank_account, account_number: e.target.value})} />
                        </div>
                        <div>
                            <Label>IBAN</Label>
                            <Input value={data.bank_account.iban} onChange={e => setData('bank_account', {...data.bank_account, iban: e.target.value})} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Project'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}