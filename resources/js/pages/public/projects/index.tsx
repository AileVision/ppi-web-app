import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/publicLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useLang from '@/hooks/useLang';
import { MapPin, ArrowRight, Heart } from 'lucide-react';

// Interface temporaire pour typer nos données
// (Plus tard, ces données viendront de Laravel via les props Inertia)
interface Project {
    id: number;
    slug: string;
    title: Record<string, string>;
    location: Record<string, string>;
    context: Record<string, string>;
    main_image_path: string;
    sectors: { name: Record<string, string> }[];
}

interface Props {
    projects?: Project[];
}

export default function ProjectsIndex({ projects =[] }: Props) {
    const { t, locale } = useLang();

    // DONNÉES FICTIVES (En attendant de connecter la base de données)
    const dummyProjects: Project[] = projects.length > 0 ? projects :[
        {
            id: 1,
            slug: 'construction-ecole-kpalime',
            title: { fr: 'Construction d\'une école primaire', en: 'Primary School Construction' },
            location: { fr: 'Région des Plateaux, Togo', en: 'Plateaux Region, Togo' },
            context: { 
                fr: 'Les enfants de ce village parcourent 10km par jour. Nous voulons construire 3 salles de classe.', 
                en: 'Children in this village walk 10km daily. We aim to build 3 classrooms.' 
            },
            main_image_path: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop',
            sectors:[{ name: { fr: 'Éducation', en: 'Education' } }]
        },
        {
            id: 2,
            slug: 'forage-eau-potable-kara',
            title: { fr: 'Forage d\'eau potable', en: 'Clean Water Borehole' },
            location: { fr: 'Région de la Kara, Togo', en: 'Kara Region, Togo' },
            context: { 
                fr: 'L\'accès à l\'eau potable est critique. Ce projet fournira de l\'eau saine à 500 familles.', 
                en: 'Access to clean water is critical. This project will provide safe water to 500 families.' 
            },
            main_image_path: 'https://images.unsplash.com/photo-1541888062-81781eb89e61?q=80&w=2070&auto=format&fit=crop',
            sectors:[{ name: { fr: 'Santé', en: 'Health' } }]
        }
    ];

    return (
        <PublicLayout>
            <Head title={t('Community Projects')} />

            {/* HEADER DE LA PAGE */}
            <section className="bg-slate-100 py-12 md:py-20 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                        {t('Our Community Projects')}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        {t('projects_intro')}
                    </p>
                </div>
            </section>

            {/* GRILLE DES PROJETS */}
            <section className="py-16 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dummyProjects.map((project) => (
                            <Card key={project.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
                                {/* Image principale */}
                                <div className="relative h-56 overflow-hidden bg-slate-200">
                                    <img 
                                        src={project.main_image_path} 
                                        alt={project.title[locale] || project.title.en} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    {/* Badges Secteurs */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {project.sectors.map((sector, index) => (
                                            <span key={index} className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                {sector.name[locale] || sector.name.en}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl line-clamp-2">
                                        {project.title[locale] || project.title.en}
                                    </CardTitle>
                                    <CardDescription className="flex items-center mt-2 text-slate-500">
                                        <MapPin className="h-4 w-4 mr-1 shrink-0" />
                                        <span className="truncate">{project.location[locale] || project.location.en}</span>
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-grow text-slate-600">
                                    <p className="line-clamp-3">
                                        {project.context[locale] || project.context.en}
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-4 flex flex-col gap-3 sm:flex-row border-t border-slate-50 bg-slate-50/50">
                                    {/* Bouton Voir Détails */}
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={route('projects.show', { slug: project.slug })}>
                                            {t('Read more')} <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>

                                    {/* Bouton Soutenir (Direct) */}
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Heart className="mr-2 h-4 w-4" /> {t('Support')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {dummyProjects.length === 0 && (
                        <div className="text-center py-20 text-slate-500">
                            {t('No projects available at the moment.')}
                        </div>
                    )}

                </div>
            </section>
        </PublicLayout>
    );
}