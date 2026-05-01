import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Le layout de ton Starter Kit
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Heading from '@/components/heading';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import useLang from '@/hooks/useLang';

interface ProjectListItem {
    id: number;
    title: Record<string, string>;
    created_at: string;
}

export default function AdminProjectsIndex({ projects }: { projects: ProjectListItem[] }) {
    const { t, locale } = useLang();

    const breadcrumbs =[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Projects" />
            
            <div className="flex justify-between items-center mb-6">
                <Heading title={t('Community Projects')} description={t('Manage all community projects.')} />
                <Button asChild>
                    <Link href={route('admin.projects.create')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> {t('Add Project')}
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-md border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>{t('Title')} ({locale.toUpperCase()})</TableHead>
                            <TableHead>{t('Date')}</TableHead>
                            <TableHead className="text-right">{t('Actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-neutral-500">
                                    {t('No projects found.')}
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.id}</TableCell>
                                    <TableCell className="font-medium">
                                        {project.title[locale] || project.title.en}
                                    </TableCell>
                                    <TableCell>{project.created_at}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={route('admin.projects.edit', project.id)}>
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon">
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