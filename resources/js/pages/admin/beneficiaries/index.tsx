import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Heading from '@/components/heading';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import useLang from '@/hooks/useLang';

interface BeneficiaryListItem {
    id: number;
    first_name: string;
    age: number;
    category: Record<string, string>;
    photo_path: string;
}

export default function AdminBeneficiariesIndex({ beneficiaries }: { beneficiaries: BeneficiaryListItem[] }) {
    const { t, locale } = useLang();

    const breadcrumbs =[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Beneficiaries', href: '/admin/beneficiaries' },
    ];

    const handleDelete = (id: number) => {
        if (confirm(t('Are you sure you want to delete this beneficiary?'))) {
            router.delete(route('admin.beneficiaries.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Beneficiaries" />
            
            <div className="flex justify-between items-center mb-6">
                <Heading 
                    title={t('Vulnerable People')} 
                    description={t('Manage individual profiles needing support.')} 
                />
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href={route('admin.beneficiaries.create')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> {t('Add Beneficiary')}
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Photo</TableHead>
                            <TableHead>{t('First Name')}</TableHead>
                            <TableHead>{t('Age')}</TableHead>
                            <TableHead>{t('Category')}</TableHead>
                            <TableHead className="text-right">{t('Actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {beneficiaries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                    {t('No beneficiaries added yet.')}
                                </TableCell>
                            </TableRow>
                        ) : (
                            beneficiaries.map((ben) => (
                                <TableRow key={ben.id}>
                                    <TableCell>
                                        <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 border">
                                            <img src={ben.photo_path} alt={ben.first_name} className="h-full w-full object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">{ben.first_name}</TableCell>
                                    <TableCell>{ben.age} {t('years old')}</TableCell>
                                    <TableCell>
                                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                                            {ben.category[locale] || ben.category.en}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={route('admin.beneficiaries.edit', ben.id)}>
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => handleDelete(ben.id)}>
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}