export type Lang = "uz" | "ru" | "en";

export const LANGS: Lang[] = ["uz", "ru", "en"];

export const translations = {
  uz: {
    nav: { services: "Xizmatlar", advantages: "Afzalliklar", order: "Buyurtma" },
    hero: {
      eyebrow: "24/7 Santexnika xizmati",
      title: "Ishonchli santexnika — bir qo'ng'iroqda",
      subtitle:
        "Tezkor, sifatli va kafolatli santexnika xizmatlari. Toshkent bo'ylab istalgan vaqtda yetib boramiz.",
      cta: "Buyurtma berish",
      callNow: "Hoziroq qo'ng'iroq qiling",
    },
    services: {
      title: "Bizning xizmatlar",
      subtitle: "Har qanday santexnika muammosini hal qilamiz",
      items: {
        faucet: "Kranni almashtirish",
        pipe: "Truba o'rnatish",
        drain: "Kanalizatsiya tozalash",
        leak: "Suv oqishini tuzatish",
      },
      itemDesc: {
        faucet: "Eski yoki sinib qolgan kranlarni yangisiga almashtiramiz",
        pipe: "Yangi suv va isitish trubalarini sifatli o'rnatish",
        drain: "Tiqilib qolgan kanalizatsiyani tez va toza tozalaymiz",
        leak: "Har qanday suv oqishini tezda topib bartaraf etamiz",
      },
    },
    advantages: {
      title: "Nega aynan biz?",
      items: {
        always: "24/7 xizmat",
        fast: "Tez yetib borish",
        cheap: "Arzon narx",
      },
      desc: {
        always: "Kechayu kunduz, dam olish kunlarisiz ishlaymiz",
        fast: "Buyurtmadan keyin 30 daqiqa ichida joydamiz",
        cheap: "Adolatli va shaffof narxlar — hech qanday yashirin to'lovlar yo'q",
      },
    },
    form: {
      title: "Buyurtma qoldiring",
      subtitle: "Formani to'ldiring, tez orada siz bilan bog'lanamiz",
      name: "Ism",
      phone: "Telefon",
      address: "Manzil",
      service: "Xizmat",
      comment: "Izoh",
      commentOptional: "ixtiyoriy",
      selectService: "Xizmatni tanlang",
      submit: "Yuborish",
      sending: "Yuborilmoqda...",
    },
    errors: {
      required: "Iltimos, barcha majburiy maydonlarni to'ldiring",
      phone: "Telefon raqami noto'g'ri. Format: +998XXXXXXXXX",
      generic: "Xatolik yuz berdi",
      retry: "Qayta urinib ko'ring",
    },
    success: {
      title: "Buyurtma yuborildi",
      desc: "Tez orada operatorimiz siz bilan bog'lanadi",
    },
    footer: "Barcha huquqlar himoyalangan",
  },
  ru: {
    nav: { services: "Услуги", advantages: "Преимущества", order: "Заказ" },
    hero: {
      eyebrow: "Сантехника 24/7",
      title: "Надёжная сантехника — в один звонок",
      subtitle:
        "Быстрые, качественные и гарантированные услуги сантехника. Приедем по Ташкенту в любое время.",
      cta: "Заказать",
      callNow: "Позвонить сейчас",
    },
    services: {
      title: "Наши услуги",
      subtitle: "Решаем любые сантехнические задачи",
      items: {
        faucet: "Замена крана",
        pipe: "Установка труб",
        drain: "Прочистка канализации",
        leak: "Устранение протечек",
      },
      itemDesc: {
        faucet: "Меняем старые и сломанные краны на новые",
        pipe: "Качественная установка водопроводных и отопительных труб",
        drain: "Быстро и чисто прочистим засорившуюся канализацию",
        leak: "Найдём и устраним любую протечку в кратчайшие сроки",
      },
    },
    advantages: {
      title: "Почему именно мы?",
      items: {
        always: "Работаем 24/7",
        fast: "Быстрый выезд",
        cheap: "Доступные цены",
      },
      desc: {
        always: "Круглосуточно, без выходных и праздников",
        fast: "Приезжаем в течение 30 минут после заявки",
        cheap: "Честные и прозрачные цены — никаких скрытых платежей",
      },
    },
    form: {
      title: "Оставьте заявку",
      subtitle: "Заполните форму — мы свяжемся с вами в ближайшее время",
      name: "Имя",
      phone: "Телефон",
      address: "Адрес",
      service: "Услуга",
      comment: "Комментарий",
      commentOptional: "необязательно",
      selectService: "Выберите услугу",
      submit: "Отправить",
      sending: "Отправка...",
    },
    errors: {
      required: "Пожалуйста, заполните все обязательные поля",
      phone: "Неверный телефон. Формат: +998XXXXXXXXX",
      generic: "Произошла ошибка",
      retry: "Попробуйте ещё раз",
    },
    success: {
      title: "Заказ отправлен",
      desc: "Наш оператор свяжется с вами в ближайшее время",
    },
    footer: "Все права защищены",
  },
  en: {
    nav: { services: "Services", advantages: "Advantages", order: "Order" },
    hero: {
      eyebrow: "24/7 Plumbing Service",
      title: "Reliable plumbing — just one call away",
      subtitle:
        "Fast, quality and guaranteed plumbing services across Tashkent, anytime you need us.",
      cta: "Order Now",
      callNow: "Call now",
    },
    services: {
      title: "Our services",
      subtitle: "We solve any plumbing problem",
      items: {
        faucet: "Faucet replacement",
        pipe: "Pipe installation",
        drain: "Drain cleaning",
        leak: "Leak repair",
      },
      itemDesc: {
        faucet: "Replace old or broken faucets with brand new ones",
        pipe: "Professional installation of water and heating pipes",
        drain: "Quickly and cleanly unclog any blocked drain",
        leak: "Find and fix any water leak in record time",
      },
    },
    advantages: {
      title: "Why choose us?",
      items: {
        always: "24/7 service",
        fast: "Fast arrival",
        cheap: "Affordable prices",
      },
      desc: {
        always: "Around the clock, weekends and holidays included",
        fast: "On site within 30 minutes after your request",
        cheap: "Fair, transparent pricing — no hidden fees",
      },
    },
    form: {
      title: "Place your order",
      subtitle: "Fill out the form and we'll contact you shortly",
      name: "Name",
      phone: "Phone",
      address: "Address",
      service: "Service",
      comment: "Comment",
      commentOptional: "optional",
      selectService: "Select a service",
      submit: "Submit",
      sending: "Sending...",
    },
    errors: {
      required: "Please fill in all required fields",
      phone: "Invalid phone. Format: +998XXXXXXXXX",
      generic: "Something went wrong",
      retry: "Please try again",
    },
    success: {
      title: "Order sent successfully",
      desc: "Our operator will contact you shortly",
    },
    footer: "All rights reserved",
  },
} as const;

export type TranslationShape = typeof translations.uz;