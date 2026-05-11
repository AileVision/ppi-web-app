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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateTeamMember() {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Team', href: '/admin/team' },
        { title: 'Add Member', href: '/admin/team/create' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        type: 'board',
        position: { fr: '', en: '' },
        professional_title: { fr: '', en: '' },
        role_description: { fr: '', en: '' },
        photo: null as File | null,
        sort_order: 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.team.store'));
    };

    const handleTranslatableChange = (field: 'position' | 'professional_title' | 'role_description', lang: 'fr' | 'en', value: string) => {
        setData(field, { ...data[field], [lang]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Team Member" />

            <Heading title="Add Team Member" description="Create a new team profile for the public 'Who we are' page." />

            <form onSubmit={submit} className="space-y-8 pb-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Enter the core details for this team member.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Full Name *</Label>
                            <Input required value={data.full_name} onChange={e => setData('full_name', e.target.value)} />
                            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Type *</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="board">Board</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Sort Order *</Label>
                            <Input type="number" required min="0" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                            {errors.sort_order && <p className="text-red-500 text-sm">{errors.sort_order}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Photo *</Label>
                            <Input required type="file" accept="image/*" onChange={e => setData('photo', e.target.files?.[0] || null)} />
                            {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Position & Title</CardTitle>
                        <CardDescription>Provide the position and professional title in both languages.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Position (English) *</Label>
                            <Input required value={data.position.en} onChange={e => handleTranslatableChange('position', 'en', e.target.value)} />
                            {getFieldError(errors, 'position.en') && <p className="text-red-500 text-sm">{getFieldError(errors, 'position.en')}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Position (Français) *</Label>
                            <Input required value={data.position.fr} onChange={e => handleTranslatableChange('position', 'fr', e.target.value)} />
                            {getFieldError(errors, 'position.fr') && <p className="text-red-500 text-sm">{getFieldError(errors, 'position.fr')}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Professional Title (English)</Label>
                            <Input value={data.professional_title.en} onChange={e => handleTranslatableChange('professional_title', 'en', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Titre Professionnel (Français)</Label>
                            <Input value={data.professional_title.fr} onChange={e => handleTranslatableChange('professional_title', 'fr', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Role Description</CardTitle>
                        <CardDescription>Describe the team member's role in both languages.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Description (English) *</Label>
                            <Textarea required rows={5} value={data.role_description.en} onChange={e => handleTranslatableChange('role_description', 'en', e.target.value)} />
                            {getFieldError(errors, 'role_description.en') && <p className="text-red-500 text-sm">{getFieldError(errors, 'role_description.en')}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Description (Français) *</Label>
                            <Textarea required rows={5} value={data.role_description.fr} onChange={e => handleTranslatableChange('role_description', 'fr', e.target.value)} />
                            {getFieldError(errors, 'role_description.fr') && <p className="text-red-500 text-sm">{getFieldError(errors, 'role_description.fr')}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Member'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
