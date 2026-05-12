import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Heading from '@/components/heading';
import { Edit, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import useLang from '@/hooks/useLang';

interface CategoryListItem {
    id: number;
    name: Record<string, string>;
    bank_account: { account_name: string; account_number: string } | null;
}

export default function AdminCategoriesIndex({ categories }: { categories: CategoryListItem[] }) {
    const { t, locale } = useLang();

    const breadcrumbs =[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    // Fonction pour vérifier si la catégorie a un compte bancaire valide (exigence TdR)
    const isBankConfigured = (bank: any) => {
        return bank && bank.account_name && bank.account_name !== 'À définir' && bank.account_number !== 'À définir';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Categories" />
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <Heading 
                    title="Vulnerable Categories" 
                    description="Manage the 3 default categories and their specific bank accounts." 
                />
                <Button asChild className="self-start bg-blue-600 hover:bg-blue-700">
                    <Link href={route('admin.categories.create')}>
                        Add Category
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>{t('Category Name')} ({locale.toUpperCase()})</TableHead>
                                <TableHead>{t('Bank Account Status')}</TableHead>
                                <TableHead className="text-right">{t('Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.id}</TableCell>
                                <TableCell>
                                    <span className="font-semibold text-slate-800">
                                        {category.name[locale] || category.name.en}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {isBankConfigured(category.bank_account) ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                            <CheckCircle2 className="mr-1 h-3 w-3" /> Configured
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <AlertCircle className="mr-1 h-3 w-3" /> Needs Configuration
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('admin.categories.edit', category.id)}>
                                            <Edit className="h-4 w-4 mr-2 text-blue-600" /> Edit
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(category.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}