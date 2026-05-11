import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Heading from '@/components/heading';
import { getFieldError } from '@/utils/validation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useLang from '@/hooks/useLang';

interface CreateBeneficiaryProps {
    categories: { id: number; name: Record<string, string> }[];
}

export default function CreateBeneficiary({ categories }: CreateBeneficiaryProps) {
    const { locale } = useLang();
    const breadcrumbs =[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Beneficiaries', href: '/admin/beneficiaries' },
        { title: 'Add Beneficiary', href: '/admin/beneficiaries/create' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        first_name: '',
        age: '',
        gender: '',
        location: '',
        situation: { fr: '', en: '' },
        needs: { fr: '', en: '' },
        photo: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.beneficiaries.store'));
    };

    const handleTranslatableChange = (field: 'situation' | 'needs', lang: 'fr' | 'en', value: string) => {
        setData(field, { ...data[field],[lang]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Beneficiary" />
            
            <Heading 
                title="Add Vulnerable Person" 
                description="Create a new beneficiary profile. Please ensure descriptions are factual and respectful." 
            />

            <form onSubmit={submit} className="space-y-8 pb-10">
                
                {/* INFORMATIONS DE BASE */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        <div className="space-y-2">
                            <Label>Category *</Label>
                            <Select onValueChange={(value) => setData('category_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name[locale] || cat.name.en}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>First Name *</Label>
                            <Input required value={data.first_name} onChange={e => setData('first_name', e.target.value)} />
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Age *</Label>
                            <Input required type="number" min="0" max="120" value={data.age} onChange={e => setData('age', e.target.value)} />
                            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Gender (Optional)</Label>
                            <Select onValueChange={(value) => setData('gender', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male / Garçon</SelectItem>
                                    <SelectItem value="Female">Female / Fille</SelectItem>
                                    <SelectItem value="Other">Other / Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input placeholder="e.g. Village Name" value={data.location} onChange={e => setData('location', e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label>Photo (Respectful) *</Label>
                            <Input required type="file" accept="image/*" onChange={e => setData('photo', e.target.files?.[0] || null)} />
                            {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                        </div>

                    </CardContent>
                </Card>

                {/* DESCRIPTION ET BESOINS (BILINGUE) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Situation & Needs (Bilingual)</CardTitle>
                        <CardDescription>Keep the text short (5 to 8 lines) and without sensationalist language.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        
                        {/* SITUATION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Situation (English) *</Label>
                                <Textarea required rows={6} value={data.situation.en} onChange={e => handleTranslatableChange('situation', 'en', e.target.value)} />
                                {getFieldError(errors, 'situation.en') && <p className="text-red-500 text-sm">{getFieldError(errors, 'situation.en')}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Situation (Français) *</Label>
                                <Textarea required rows={6} value={data.situation.fr} onChange={e => handleTranslatableChange('situation', 'fr', e.target.value)} />
                                {getFieldError(errors, 'situation.fr') && <p className="text-red-500 text-sm">{getFieldError(errors, 'situation.fr')}</p>}
                            </div>
                        </div>

                        {/* NEEDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Needs (English) *</Label>
                                <Textarea required rows={4} placeholder="Concise description or list" value={data.needs.en} onChange={e => handleTranslatableChange('needs', 'en', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Besoins (Français) *</Label>
                                <Textarea required rows={4} placeholder="Description concise ou liste" value={data.needs.fr} onChange={e => handleTranslatableChange('needs', 'fr', e.target.value)} />
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* BOUTONS D'ACTION */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Beneficiary'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}