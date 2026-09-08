import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-neutral-500" />
      <select
        value={i18n.resolvedLanguage || 'en'}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-sm font-semibold text-neutral-700 outline-none cursor-pointer"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="mr">मराठी (Marathi)</option>
      </select>
    </div>
  );
}
