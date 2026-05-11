import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import { getFieldError } from '@/utils/validation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CreateCategory() {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Create', href: '/admin/categories/create' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: { fr: '', en: '' },
        bank_account: {
            account_name: '',
            account_number: '',
            bank_name: '',
            iban: '',
            swift: '',
            country: 'Togo',
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    const handleTranslatableChange = (lang: 'fr' | 'en', value: string) => {
        setData('name', { ...data.name, [lang]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />

            <Heading title="Create Category" description="Add a new vulnerable category and its bank information." />

            <form onSubmit={submit} className="space-y-8 pb-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Category Name</CardTitle>
                        <CardDescription>Enter the category labels in English and French.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Name (English) *</Label>
                            <Input required value={data.name.en} onChange={e => handleTranslatableChange('en', e.target.value)} />
                            {getFieldError(errors, 'name.en') && <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'name.en')}</p>}
                        </div>
                        <div>
                            <Label>Nom (Français) *</Label>
                            <Input required value={data.name.fr} onChange={e => handleTranslatableChange('fr', e.target.value)} />
                            {getFieldError(errors, 'name.fr') && <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'name.fr')}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-emerald-200 shadow-sm">
                    <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                        <CardTitle className="text-emerald-800">Bank Account Information</CardTitle>
                        <CardDescription className="text-emerald-700">
                            Donations directed to this category will use the following account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                            <Label>Account Name</Label>
                            <Input value={data.bank_account.account_name} onChange={e => setData('bank_account', { ...data.bank_account, account_name: e.target.value })} />
                        </div>
                        <div>
                            <Label>Bank Name</Label>
                            <Input value={data.bank_account.bank_name} onChange={e => setData('bank_account', { ...data.bank_account, bank_name: e.target.value })} />
                        </div>
                        <div>
                            <Label>Account Number</Label>
                            <Input value={data.bank_account.account_number} onChange={e => setData('bank_account', { ...data.bank_account, account_number: e.target.value })} />
                        </div>
                        <div>
                            <Label>Country</Label>
                            <Input value={data.bank_account.country} onChange={e => setData('bank_account', { ...data.bank_account, country: e.target.value })} />
                        </div>
                        <div>
                            <Label>IBAN</Label>
                            <Input value={data.bank_account.iban} onChange={e => setData('bank_account', { ...data.bank_account, iban: e.target.value })} />
                        </div>
                        <div>
                            <Label>SWIFT / BIC</Label>
                            <Input value={data.bank_account.swift} onChange={e => setData('bank_account', { ...data.bank_account, swift: e.target.value })} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={processing}>
                        {processing ? 'Saving...' : 'Create Category'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
