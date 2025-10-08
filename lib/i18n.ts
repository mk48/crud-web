import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import daTranslation from "@/locales/da/translation.json";
import enTranslation from "@/locales/en/translation.json";
import taTranslation from "@/locales/ta/translation.json";

const en = {
  translation: enTranslation,
};
const da = {
  translation: daTranslation,
};
const ta = {
  translation: taTranslation,
};

i18n.use(initReactI18next).init(
  {
    lng: "en",
    debug: false,
    fallbackLng: "en",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === "intlNumber") {
          return new Intl.NumberFormat(lng).format(value);
        }

        return value;
      },
    },
    resources: { en, da, ta },
    ns: ["translation"],
    defaultNS: "translation",
    fallbackNS: "translation",
  },
  (error) => {
    if (error) console.error(error);
  }
);

export default i18n;
