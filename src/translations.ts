import { Record } from "./types/index";

type TranslationKeys = keyof Record;

interface Translations {
  [key: string]: string;
}

export const translations: Translations = {
  firstName: "Имя",
  lastName: "Фамилия",
  middleName: "Отчество",
  age: "Возраст",
  position: "Должность",
  hireDate: "Дата приема на работу",
  salary: "Зарплата",
  department: "Отдел",
  email: "Email",
  phone: "Телефон",
  address: "Адрес"
};

const ensureValidTranslations = (translations: Translations) => {
  const validKeys: TranslationKeys[] = [
    "firstName",
    "lastName",
    "middleName",
    "age",
    "position",
    "hireDate",
    "salary",
    "department",
    "email",
    "phone",
    "address"
  ];

  Object.keys(translations).forEach((key) => {
    if (!validKeys.includes(key as TranslationKeys)) {
      throw new Error(`Invalid translation key: ${key}`);
    }
  });
};

ensureValidTranslations(translations);
