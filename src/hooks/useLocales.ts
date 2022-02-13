import { useTranslation } from 'react-i18next';
// material
import { enUS, deDE, frFR, viVN } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: './static/icons/ic_flag_en.svg'
  },
  {
    label: 'Tiếng Việt',
    value: 'vi',
    systemValue: viVN,
    icon: './static/icons/ic_flag_vi.svg'
  },
  {
    label: 'Deutsch',
    value: 'de',
    systemValue: deDE,
    icon: './static/icons/ic_flag_de.svg'
  },
  {
    label: 'Français',
    value: 'fr',
    systemValue: frFR,
    icon: './static/icons/ic_flag_fr.svg'
  }
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
  };

  return {
    handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS
  };
}
