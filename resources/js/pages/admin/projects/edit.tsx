import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';


interface EditProps {
    sectors: { id: number, name: Record<string, string> }[];
    project: any; // On récupère le projet envoyé par le contrôleur
}

const breadcrumbs =[
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Projects', href: '/admin/projects' },
    { title: 'Create', href: '/admin/projects/create' },
];
export default function EditProject({ sectors, project }: EditProps) {
    // État local pour afficher les miniatures de la galerie
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    // Initialisation du formulaire avec la structure exigée par le Contrôleur
    // const { data, setData, post, processing, errors } = useForm({
    //     title: { fr: '', en: '' },
    //     location: { fr: '', en: '' },
    //     context: { fr: '', en: '' },
    //     activities: { fr: '', en: '' },
    //     expected_results: { fr: '', en: '' },
    //     sector_ids: [] as number[],
    //     main_image: null as File | null,
    //     gallery: [] as File[], // NOUVEAU: Le tableau de fichiers
    //     bank_account: {
    //         account_name: '',
    //         account_number: '',
    //         bank_name: '',
    //         iban: '',
    //         swift: '',
    //         country: 'Togo'
    //     }
    // });
    
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: project.title,
        location: project.location,
        context: project.context,
        activities: project.activities,
        expected_results: project.expected_results,
        sector_ids: project.sector_ids,
        main_image: null as File | null,
        gallery: [] as File[],
        bank_account: project.bank_account,
    });

    // Fonction pour gérer la sélection multiple (max 21)
    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            
            // Vérification de la limite de 21
            if (data.gallery.length + files.length > 21) {
                alert("Vous ne pouvez télécharger qu'un maximum de 21 images.");
                return;
            }

            const newGallery = [...data.gallery, ...files];
            setData('gallery', newGallery);

            // Génération des URLs temporaires pour les miniatures
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setGalleryPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    // Fonction pour retirer une image sélectionnée par erreur
    const removeGalleryImage = (indexToRemove: number) => {
        const newGallery = data.gallery.filter((_, index) => index !== indexToRemove);
        setData('gallery', newGallery);

        const newPreviews = galleryPreviews.filter((_, index) => index !== indexToRemove);
        setGalleryPreviews(newPreviews);
    };

    // Nettoyage de la mémoire du navigateur (URLs temporaires)
    useEffect(() => {
        return () => galleryPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [galleryPreviews]);

    // const submit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     post(route('admin.projects.store'));
    // };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // On POST vers la route UPDATE
        post(route('admin.projects.update', project.id)); 
    };

    // Helper pour mettre à jour les champs bilingues facilement
    const handleTranslatableChange = (field: keyof typeof data, lang: 'fr' | 'en', value: string) => {
        setData(field, { ...data[field] as any,[lang]: value });
    };

    // return (
    //     <AppLayout breadcrumbs={breadcrumbs}>
    //         <Head title="Create Project" />
            
    //         <Heading title="Add New Project" description="Fill the information in both languages." />

    //         <form onSubmit={submit} className="space-y-8 pb-10">
                
    //             {/* BLOC 1 : Informations textuelles (Bilingues) */}
    //             <Card>
    //                 <CardHeader>
    //                     <CardTitle>Project Information (Bilingual)</CardTitle>
    //                 </CardHeader>
    //                 <CardContent className="space-y-6">
                        
    //                     {/* TITRE */}
    //                     <div className="grid grid-cols-2 gap-4">
    //                         <div>
    //                             <Label>Title (English) *</Label>
    //                             <Input required value={data.title.en} onChange={e => handleTranslatableChange('title', 'en', e.target.value)} />
    //                             {errors['title.en'] && <p className="text-red-500 text-sm">{errors['title.en']}</p>}
    //                         </div>
    //                         <div>
    //                             <Label>Titre (Français) *</Label>
    //                             <Input required value={data.title.fr} onChange={e => handleTranslatableChange('title', 'fr', e.target.value)} />
    //                             {errors['title.fr'] && <p className="text-red-500 text-sm">{errors['title.fr']}</p>}
    //                         </div>
    //                     </div>

    //                     {/* CONTEXTE */}
    //                     <div className="grid grid-cols-2 gap-4">
    //                         <div>
    //                             <Label>Context & Challenge (English) *</Label>
    //                             <Textarea required rows={4} value={data.context.en} onChange={e => handleTranslatableChange('context', 'en', e.target.value)} />
    //                         </div>
    //                         <div>
    //                             <Label>Contexte & Problématique (Français) *</Label>
    //                             <Textarea required rows={4} value={data.context.fr} onChange={e => handleTranslatableChange('context', 'fr', e.target.value)} />
    //                         </div>
    //                     </div>

    //                     {/* SECTEURS & LOCALISATION (Omis les FR/EN de loc et act pour raccourcir l'exemple, mais tu as saisi l'idée) */}
    //                     <div className="grid grid-cols-2 gap-4">
    //                         <div>
    //                             <Label className="mb-2 block">Sectors *</Label>
    //                             <div className="flex gap-4 border p-3 rounded-md">
    //                                 {sectors.map(sector => (
    //                                     <div key={sector.id} className="flex items-center space-x-2">
    //                                         <Checkbox 
    //                                             id={`sector-${sector.id}`} 
    //                                             checked={data.sector_ids.includes(sector.id)}
    //                                             onCheckedChange={(checked) => {
    //                                                 const newIds = checked 
    //                                                     ?[...data.sector_ids, sector.id] 
    //                                                     : data.sector_ids.filter(id => id !== sector.id);
    //                                                 setData('sector_ids', newIds);
    //                                             }}
    //                                         />
    //                                         <label htmlFor={`sector-${sector.id}`} className="text-sm">{sector.name.en}</label>
    //                                     </div>
    //                                 ))}
    //                             </div>
    //                         </div>
    //                         <div>
    //                             <Label>Main Image *</Label>
    //                             <Input type="file" required accept="image/*" onChange={e => setData('main_image', e.target.files?.[0] || null)} />
    //                         </div>
    //                     </div>
    //                 </CardContent>
    //             </Card>

    //             {/* BLOC 2 : EXIGENCE TdR -> Informations Bancaires */}
    //             <Card className="border-emerald-200">
    //                 <CardHeader className="bg-emerald-50">
    //                     <CardTitle className="text-emerald-800">Bank Account Information (Transparency)</CardTitle>
    //                 </CardHeader>
    //                 <CardContent className="grid grid-cols-2 gap-4 pt-6">
    //                     <div>
    //                         <Label>Account Name *</Label>
    //                         <Input required value={data.bank_account.account_name} onChange={e => setData('bank_account', {...data.bank_account, account_name: e.target.value})} />
    //                     </div>
    //                     <div>
    //                         <Label>Bank Name *</Label>
    //                         <Input required value={data.bank_account.bank_name} onChange={e => setData('bank_account', {...data.bank_account, bank_name: e.target.value})} />
    //                     </div>
    //                     <div>
    //                         <Label>Account Number *</Label>
    //                         <Input required value={data.bank_account.account_number} onChange={e => setData('bank_account', {...data.bank_account, account_number: e.target.value})} />
    //                     </div>
    //                     <div>
    //                         <Label>IBAN</Label>
    //                         <Input value={data.bank_account.iban} onChange={e => setData('bank_account', {...data.bank_account, iban: e.target.value})} />
    //                     </div>
    //                 </CardContent>
    //             </Card>

    //             <div className="flex justify-end gap-4">
    //                 <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
    //                 <Button type="submit" disabled={processing}>
    //                     {processing ? 'Saving...' : 'Save Project'}
    //                 </Button>
    //             </div>
    //         </form>
    //     </AppLayout>
    // );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            
            <Heading 
                title="Add New Project" 
                description="Fill the information in both languages. Fields marked with * are required." 
            />

            <form onSubmit={submit} className="space-y-8 pb-10">
                
                {/* BLOC 1 : INFORMATIONS TEXTUELLES (BILINGUES) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Project Information (Bilingual)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        
                        {/* TITRE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Title (English) *</Label>
                                <Input required value={data.title.en} onChange={e => handleTranslatableChange('title', 'en', e.target.value)} />
                                {errors['title.en'] && <p className="text-red-500 text-sm mt-1">{errors['title.en']}</p>}
                            </div>
                            <div>
                                <Label>Titre (Français) *</Label>
                                <Input required value={data.title.fr} onChange={e => handleTranslatableChange('title', 'fr', e.target.value)} />
                                {errors['title.fr'] && <p className="text-red-500 text-sm mt-1">{errors['title.fr']}</p>}
                            </div>
                        </div>

                        {/* LOCALISATION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Location (English) *</Label>
                                <Input required placeholder="e.g. Kpalime Village, Togo" value={data.location.en} onChange={e => handleTranslatableChange('location', 'en', e.target.value)} />
                            </div>
                            <div>
                                <Label>Localisation (Français) *</Label>
                                <Input required placeholder="ex. Village de Kpalimé, Togo" value={data.location.fr} onChange={e => handleTranslatableChange('location', 'fr', e.target.value)} />
                            </div>
                        </div>

                        {/* CONTEXTE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Context & Challenge (English) *</Label>
                                <Textarea required rows={4} value={data.context.en} onChange={e => handleTranslatableChange('context', 'en', e.target.value)} />
                            </div>
                            <div>
                                <Label>Contexte & Problématique (Français) *</Label>
                                <Textarea required rows={4} value={data.context.fr} onChange={e => handleTranslatableChange('context', 'fr', e.target.value)} />
                            </div>
                        </div>

                        {/* ACTIVITÉS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Planned Activities (English) *</Label>
                                <Textarea required rows={4} placeholder="Use dashes (-) for lists" value={data.activities.en} onChange={e => handleTranslatableChange('activities', 'en', e.target.value)} />
                            </div>
                            <div>
                                <Label>Activités prévues (Français) *</Label>
                                <Textarea required rows={4} placeholder="Utilisez des tirets (-) pour les listes" value={data.activities.fr} onChange={e => handleTranslatableChange('activities', 'fr', e.target.value)} />
                            </div>
                        </div>

                        {/* RÉSULTATS ATTENDUS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Expected Results (English) *</Label>
                                <Textarea required rows={3} value={data.expected_results.en} onChange={e => handleTranslatableChange('expected_results', 'en', e.target.value)} />
                            </div>
                            <div>
                                <Label>Résultats attendus (Français) *</Label>
                                <Textarea required rows={3} value={data.expected_results.fr} onChange={e => handleTranslatableChange('expected_results', 'fr', e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BLOC 2 : SECTEURS ET MÉDIAS */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sectors & Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* COLONNE GAUCHE : SECTEURS */}
                            <div>
                                <Label className="text-base font-semibold text-slate-800 mb-3 block">Related Sectors *</Label>
                                <div className="flex flex-col gap-3 p-4 rounded-lg border bg-slate-50">
                                    {sectors.map(sector => (
                                        <div key={sector.id} className="flex items-center space-x-3">
                                            <Checkbox 
                                                id={`sector-${sector.id}`} 
                                                checked={data.sector_ids.includes(sector.id)}
                                                onCheckedChange={(checked) => {
                                                    const newIds = checked 
                                                        ? [...data.sector_ids, sector.id] 
                                                        : data.sector_ids.filter(id => id !== sector.id);
                                                    setData('sector_ids', newIds);
                                                }}
                                            />
                                            <Label htmlFor={`sector-${sector.id}`} className="font-normal cursor-pointer">
                                                {sector.name.en} / {sector.name.fr}
                                            </Label>
                                        </div>
                                    ))}
                                    {errors.sector_ids && <p className="text-red-500 text-sm mt-1">{errors.sector_ids}</p>}
                                </div>
                            </div>

                            {/* COLONNE DROITE : GESTION DES IMAGES */}
                            <div className="space-y-6">
                                {/* Image Principale */}
                                <div className="bg-slate-50 p-4 rounded-lg border">
                                    <Label className="text-base font-semibold text-slate-800 mb-2 block">Main Image *</Label>
                                    <Input type="file" required accept="image/*" onChange={e => setData('main_image', e.target.files?.[0] || null)} />
                                    <p className="text-xs text-slate-500 mt-2">Format: JPG, PNG, WEBP. Max size: 2MB.</p>
                                    {errors.main_image && <p className="text-red-500 text-sm mt-1">{errors.main_image}</p>}
                                </div>

                                {/* Galerie (Optionnelle, max 21) */}
                                <div className="bg-slate-50 p-4 rounded-lg border">
                                    <div className="flex justify-between items-center mb-2">
                                        <Label className="text-base font-semibold text-slate-800">Gallery Images</Label>
                                        <span className="text-sm font-medium text-slate-500 bg-white px-2 py-1 rounded shadow-sm border">
                                            {data.gallery.length} / 21
                                        </span>
                                    </div>
                                    
                                    <Input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        onChange={handleGalleryUpload}
                                        disabled={data.gallery.length >= 21}
                                        className="mb-2"
                                    />
                                    {errors.gallery && <p className="text-red-500 text-sm">{errors.gallery}</p>}

                                    {/* GRILLE D'APERÇU DES MINIATURES */}
                                    {galleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                                            {galleryPreviews.map((src, index) => (
                                                <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-slate-200 group shadow-sm">
                                                    <img src={src} alt={`preview-${index}`} className="object-cover w-full h-full" />
                                                    
                                                    {/* Bouton de suppression au survol */}
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                                        title="Remove image"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* BLOC 3 : EXIGENCE TdR -> Informations Bancaires */}
                <Card className="border-emerald-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                        <CardTitle className="text-emerald-800 flex items-center">
                            Bank Account Information (Transparency)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                            <Label>Account Name *</Label>
                            <Input required placeholder="e.g. PPI - School Project" value={data.bank_account.account_name} onChange={e => setData('bank_account', {...data.bank_account, account_name: e.target.value})} />
                            {errors['bank_account.account_name'] && <p className="text-red-500 text-sm mt-1">{errors['bank_account.account_name']}</p>}
                        </div>
                        <div>
                            <Label>Bank Name *</Label>
                            <Input required placeholder="e.g. Ecobank Togo" value={data.bank_account.bank_name} onChange={e => setData('bank_account', {...data.bank_account, bank_name: e.target.value})} />
                            {errors['bank_account.bank_name'] && <p className="text-red-500 text-sm mt-1">{errors['bank_account.bank_name']}</p>}
                        </div>
                        <div>
                            <Label>Account Number *</Label>
                            <Input required value={data.bank_account.account_number} onChange={e => setData('bank_account', {...data.bank_account, account_number: e.target.value})} />
                            {errors['bank_account.account_number'] && <p className="text-red-500 text-sm mt-1">{errors['bank_account.account_number']}</p>}
                        </div>
                        <div>
                            <Label>Country *</Label>
                            <Input required value={data.bank_account.country} onChange={e => setData('bank_account', {...data.bank_account, country: e.target.value})} />
                            {errors['bank_account.country'] && <p className="text-red-500 text-sm mt-1">{errors['bank_account.country']}</p>}
                        </div>
                        <div>
                            <Label>IBAN (Optional but recommended)</Label>
                            <Input value={data.bank_account.iban} onChange={e => setData('bank_account', {...data.bank_account, iban: e.target.value})} />
                        </div>
                        <div>
                            <Label>SWIFT / BIC (Optional)</Label>
                            <Input value={data.bank_account.swift} onChange={e => setData('bank_account', {...data.bank_account, swift: e.target.value})} />
                        </div>
                    </CardContent>
                </Card>

                {/* BOUTONS D'ACTION */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Project'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}

