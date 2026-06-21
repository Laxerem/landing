import type { SiteContent } from '../types/content';

export const content: SiteContent = {
  hero: {
    statusText: 'Открыт к предложениям · Екатеринбург',
    firstName: 'Григорий',
    lastName: 'Воробьёв',
    role: 'Backend-разработчик',
    roleSeparator: '/',
    roleStack: 'C# · .NET',
    tagline:
      '«Дайте цель — получите результат» Пишу серверную логику, проектирую API и довожу задачи до рабочего продукта.',
    photoSrc: '/me.png',
  },

  about: {
    lead: 'Я Backend-разработчик на C# / .NET. Мне нравится та часть, что скрыта от пользователя: чистая логика, продуманные API и решения, которые не разваливаются под нагрузкой.',
    body: [
      'Реальные проекты выросли из учебной среды колледжа — от Telegram-ботов до бэкенд-сервиса для генеративных моделей. Работаю с базами данных, проектирую структуру сервисов и спокойно ухожу на уровень ниже, когда задача того требует — вплоть до сетевых сокетов на C++.',
      'Подхожу к работе по принципу из моего слогана: ставлю цель и довожу её до результата, а не до «вроде работает».',
    ],
    facts: [
      { k: 'Локация', v: 'Екатеринбург' },
      { k: 'Основной стек', v: 'C# · .NET' },
      { k: 'Репозиториев', v: '24', small: ' на GitHub' },
      { k: 'Формат', v: 'Открыт', small: ' к работе' },
    ],
  },

  stack: {
    groups: [
      {
        n: '01',
        title: 'Бэкенд',
        sub: 'Основа. Сервисы, API, бизнес-логика.',
        lead: ['C#', '.NET', 'ASP.NET Core'],
        rest: ['REST API', 'Entity Framework', 'EF Core'],
      },
      {
        n: '02',
        title: 'Данные и инфраструктура',
        sub: 'Хранение, очереди, доставка.',
        lead: ['PostgreSQL'],
        rest: ['SQL', 'Redis', 'Docker', 'Linux', 'CI/CD'],
      },
      {
        n: '03',
        title: 'Дополнительно',
        sub: 'Чем закрываю задачи рядом с бэкендом.',
        lead: ['Python'],
        rest: ['TypeScript', 'C++', 'Telegram Bot API'],
      },
      {
        n: '04',
        title: 'Инструменты',
        sub: 'Каждодневное окружение.',
        lead: ['Git'],
        rest: ['GitHub', 'Rider / VS', 'Postman', 'Swagger'],
      },
    ],
  },

  projects: {
    items: [
      {
        id: 'p1',
        name: 'Neur.Server.Net',
        lang: 'C#',
        langColor: '#a371f7',
        description:
          'Backend API-сервис генеративных моделей для студентов и преподавателей колледжа.',
        url: 'https://github.com/NeurNet/Neur.Server.Net',
        tags: ['ASP.NET', 'API'],
        stars: 1,
      },
      {
        id: 'p2',
        name: 'DiskayBot',
        lang: 'C#',
        langColor: '#a371f7',
        description: 'Telegram-бот для работы с экосистемой колледжа.',
        url: 'https://github.com/DiskayHub/DiskayBot',
        tags: ['Telegram Bot API', '.NET'],
        stars: 3,
      },
      {
        id: 'p3',
        name: 'Simple-votings',
        lang: 'Python',
        langColor: '#3572A5',
        description: 'Лёгкий сервис для проведения голосований.',
        url: 'https://github.com/Laxerem/Simple-votings',
        tags: ['Python', 'Web'],
        stars: 0,
      },
      {
        id: 'p4',
        name: 'socket-server',
        lang: 'C++',
        langColor: '#f34b7d',
        description:
          'Изучение сетевых сокетов на C++ — низкоуровневая работа с соединениями.',
        url: 'https://github.com/Laxerem/socket-server',
        tags: ['C++', 'Networking'],
        stars: 0,
      },
    ],
  },

  experience: {
    items: [
      {
        id: 'e1',
        kind: 'work',
        period: '2024 — н.в.',
        title: 'Backend-разработчик',
        organization: 'Проекты / фриланс',
        description:
          'Разработка REST API на ASP.NET Core, интеграция с Telegram Bot API, работа с PostgreSQL и Redis.',
      },
      {
        id: 'e2',
        kind: 'education',
        period: '2020 — 2024',
        title: 'Бакалавр',
        organization: 'УрФУ',
        description: 'Информационные технологии и программирование.',
      },
    ],
  },

  contacts: {
    items: [
      {
        id: 'c1',
        kind: 'telegram',
        label: 'Telegram',
        href: 'https://t.me/laxerem',
        handle: '@laxerem',
      },
      {
        id: 'c2',
        kind: 'github',
        label: 'GitHub',
        href: 'https://github.com/Laxerem',
        handle: 'github.com/Laxerem',
      },
    ],
  },
};
