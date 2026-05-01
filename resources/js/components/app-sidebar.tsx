// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { type NavItem } from '@/types';
// import { Link } from '@inertiajs/react';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
// import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         url: '/dashboard',
//         icon: LayoutGrid,
//     },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         url: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         url: 'https://laravel.com/docs/starter-kits',
//         icon: BookOpen,
//     },
// ];

// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon" variant="inset">
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link href="/dashboard" prefetch>
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain items={mainNavItems} />
//             </SidebarContent>

//             <SidebarFooter>
//                 <NavFooter items={footerNavItems} className="mt-auto" />
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, HeartHandshake, FolderHeart, Landmark, UsersRound, Tags } from 'lucide-react';
import AppLogo from './app-logo';
import useLang from '@/hooks/useLang';

export function AppSidebar() {
    const { t } = useLang();
    const { auth } = usePage<SharedData>().props;

    // Définition dynamique des menus pour utiliser les traductions
    const mainNavItems: NavItem[] =[
        {
            title: t('Dashboard'),
            url: 'dashboard',
            // url: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: t('Categories'),
            url: '/categories',
            // url: '/admin/categories',
            icon: Tags,
        },
        {
            title: t('Projects'),
            url: '/projects',
            // url: '/admin/projects',
            icon: FolderHeart,
        },
        {
            title: t('Beneficiaries'),
            // url: '/admin/beneficiaries',
            url: '/admin/beneficiaries',
            icon: HeartHandshake,
        },
        {
            title: t('Bank Accounts'),
            url: '/admin/banks',
            // url: '/admin/banks',
            icon: Landmark,
        },
        {
            title: t('Team'),
            url: '/admin/team',
            // url: '/admin/team',
            icon: UsersRound,
        },
    ];

    const footerNavItems: NavItem[] =[
        // Tu peux laisser les liens de support ou mettre un lien vers le site public
        {
            title: t('View Public Site'),
            url: '/',
            icon: BookOpen,
        },
    ];

    // Sécurité visuelle : si l'utilisateur n'est pas admin, on ne rend pas la sidebar complète (optionnel)
    if (!auth.user?.roles?.includes('admin')) {
        return null; 
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* On passe nos items traduits au composant de menu principal */}
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}