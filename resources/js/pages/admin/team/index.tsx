import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Heading from '@/components/heading';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import useLang from '@/hooks/useLang';

interface TeamMemberListItem {
    id: number;
    full_name: string;
    type: string;
    position: Record<string, string>;
    professional_title: Record<string, string> | null;
    photo_path: string | null;
    sort_order: number;
}

export default function AdminTeamIndex({ teamMembers }: { teamMembers: TeamMemberListItem[] }) {
    const { t } = useLang();

    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Team', href: '/admin/team' },
    ];

    const handleDelete = (id: number) => {
        if (confirm(t('Are you sure you want to delete this beneficiary?')))
            router.delete(route('admin.team.destroy', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Team" />

            <div className="flex justify-between items-center mb-6">
                <Heading title="Team Members" description="Manage the team profiles displayed on the public page." />
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href={route('admin.team.create')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Member
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamMembers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                    No team members added yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            teamMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.id}</TableCell>
                                    <TableCell className="font-medium text-slate-900">{member.full_name}</TableCell>
                                    <TableCell>
                                        {member.professional_title?.en || '—'} / {member.professional_title?.fr || '—'}
                                    </TableCell>
                                    <TableCell>{member.type}</TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={route('admin.team.edit', member.id)}>
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => handleDelete(member.id)}>
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
