import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Toaster } from '@/components/ui/sonner'; // Le composant Shadcn
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    // Récupération des messages flash depuis Laravel
    const { flash } = usePage<SharedData>().props;

    // Déclenchement du toast si un message est reçu
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            {/* Le composant Toaster qui affiche les notifications */}
            <Toaster position="top-right" richColors /> 
        </AppLayoutTemplate>
    );
};

// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import { type BreadcrumbItem } from '@/types';

// interface AppLayoutProps {
//     children: React.ReactNode;
//     breadcrumbs?: BreadcrumbItem[];
// }

// export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//     <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//         {children}
//     </AppLayoutTemplate>
// );
