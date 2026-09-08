import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
      <Globe className="w-4 h-4 text-neutral-500 mr-1 ml-1" />
      {[
        { code: 'en', label: 'EN' },
        { code: 'hi', label: 'HI' },
        { code: 'ta', label: 'TA' }
      ].map((lang) => {
        const isActive = i18n.resolvedLanguage === lang.code || i18n.language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${
              isActive
                ? 'bg-white text-teal shadow-sm ring-1 ring-border'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
