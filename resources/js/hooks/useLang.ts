import { usePage } from '@inertiajs/react';
import { SharedData } from '../types'; // Ajuste le chemin selon où se trouve ton index.tsx de types

export default function useLang() {
    // On type explicitement les props Inertia avec ton interface SharedData
    const { translations, locale } = usePage<{
        locale: string;
        translations: Record<string, string>;
    } & SharedData>().props;

    /**
     * Fonction de traduction
     * @param key - La clé de traduction présente dans lang/fr.json
     * @param replace - (Optionnel) Un objet pour remplacer des variables dans la chaîne (ex: { name: 'John' })
     * @returns La chaîne traduite, ou la clé si non trouvée
     */
    const t = (key: string, replace?: Record<string, string | number>): string => {
        let translation = translations[key] || key;

        // S'il y a des variables à remplacer (ex: "Bienvenue :name")
        if (replace) {
            Object.keys(replace).forEach((replaceKey) => {
                translation = translation.replace(
                    new RegExp(`:${replaceKey}`, 'g'),
                    String(replace[replaceKey])
                );
            });
        }

        return translation;
    };

    return { t, locale };
}