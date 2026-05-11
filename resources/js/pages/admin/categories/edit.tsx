import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface EditCategoryProps {
    category: {
        id: number;
        name: Record<string, string>;
        bank_account: {
            account_name: string;
            account_number: string;
            bank_name: string;
            iban: string | null;
            swift: string | null;
            country: string;
        } | null;
    };
}

export default function EditCategory({ category }: EditCategoryProps) {
    const breadcrumbs =[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Edit', href: `/admin/categories/${category.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        bank_account: category.bank_account || {
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
        put(route('admin.categories.update', category.id));
    };

    const handleTranslatableChange = (lang: 'fr' | 'en', value: string) => {
        setData('name', { ...data.name, [lang]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            
            <Heading 
                title="Edit Category & Bank Information" 
                description="Manage the bank account details linked to this specific category of vulnerable people." 
            />

            <form onSubmit={submit} className="space-y-8 pb-10">
                {/* NOM DE LA CATÉGORIE */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Name</CardTitle>
                        <CardDescription>The 3 categories are fixed, but you can adjust their translations.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Name (English) *</Label>
                            <Input required value={data.name.en} onChange={e => handleTranslatableChange('en', e.target.value)} />
                            {errors['name.en'] && <p className="text-red-500 text-sm mt-1">{errors['name.en']}</p>}
                        </div>
                        <div>
                            <Label>Nom (Français) *</Label>
                            <Input required value={data.name.fr} onChange={e => handleTranslatableChange('fr', e.target.value)} />
                            {errors['name.fr'] && <p className="text-red-500 text-sm mt-1">{errors['name.fr']}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* INFORMATIONS BANCAIRES (Cœur du TdR) */}
                <Card className="border-emerald-200 shadow-sm">
                    <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                        <CardTitle className="text-emerald-800">Bank Account Information</CardTitle>
                        <CardDescription className="text-emerald-700">
                            Donations made to this category will be directed to this bank account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                            <Label>Account Name *</Label>
                            <Input required value={data.bank_account.account_name} onChange={e => setData('bank_account', {...data.bank_account, account_name: e.target.value})} />
                            {errors['bank_account.account_name'] && <p className="text-red-500 text-sm mt-1">{errors['bank_account.account_name']}</p>}
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
                            <Label>Country *</Label>
                            <Input required value={data.bank_account.country} onChange={e => setData('bank_account', {...data.bank_account, country: e.target.value})} />
                        </div>
                        <div>
                            <Label>IBAN</Label>
                            <Input value={data.bank_account.iban || ''} onChange={e => setData('bank_account', {...data.bank_account, iban: e.target.value})} />
                        </div>
                        <div>
                            <Label>SWIFT / BIC</Label>
                            <Input value={data.bank_account.swift || ''} onChange={e => setData('bank_account', {...data.bank_account, swift: e.target.value})} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Category'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}