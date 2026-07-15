import type { SiteContent } from '../types/content';
import meSrc from '../assets/me.png';

export const content: SiteContent = {
  hero: {
    statusText: 'Открыт к предложениям · Екатеринбург',
    firstName: 'Григорий',
    lastName: 'Воробьёв',
    role: 'Backend-разработчик',
    roleSeparator: '/',
    roleStack: 'C# · .NET',
    tagline:
      '«Есть цель — будет результат» Пишу серверную логику, проектирую API и довожу задачи до рабочего продукта.',
    photoSrc: meSrc,
  },

  about: {
    lead: 'Я Backend-разработчик на C# / .NET. Мне нравится та часть, что скрыта от пользователя: чистая логика, продуманные API и решения, которые не разваливаются под нагрузкой.',
    body: [
      'Имею опыт разработки веб-приложений от идеи до реализации: декомпозирую задачи, проектирую архитектуру, делаю деплой на сервер.',
      'Не стою на месте, и активно применяю ИИ агентов в разработке (Claude Code, Codex) - не просто пишу запрос, а налаживаю процесс: создаю скиллы, правила, хуки от непредвиденных действий.',
      'Убеждён в том, что грамотный и контролируемый подход к разработке является наиболее важным качеством в эпоху развития ИИ.',
    ],
    facts: [
      { k: 'Локация', v: 'Екатеринбург' },
      { k: 'Основной стек', v: 'C# · .NET' },
      { k: 'Репозиториев', v: '24+', small: ' на GitHub' },
      { k: 'Формат', v: 'Открыт', small: ' к работе' },
    ],
    stats: [
      { n: 5, label: 'завершённых проекта' },
      { n: 24, suffix: '+', label: 'репозитория на GitHub', source: 'github-repos' },
      { n: 1, suffix: '+', label: 'год в backend-разработке' },
    ],
  },

  stack: {
    core: {
      label: 'Ядро',
      name: '.NET',
      desc: 'Основа. Сервисы, API, бизнес-логика.',
      lead: ['C#', 'ASP.NET Core'],
      rest: ['REST API', 'Entity Framework Core', 'JWT'],
    },
    satellites: [
      {
        title: 'Данные и инфраструктура',
        lead: ['PostgreSQL'],
        rest: ['SQL', 'Redis', 'Docker', 'Linux', 'CI/CD'],
      },
      {
        title: 'Дополнительно',
        lead: ['Node JS', 'React'],
        rest: ['TypeScript', 'Telegram Bot API'],
      },
      {
        title: 'Инструменты',
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
          'Backend API-сервис платформы NeurNet — единая точка доступа к LLM-моделям для студентов и преподавателей колледжа.',
        url: 'https://github.com/NeurNet/Neur.Server.Net',
        tags: ['ASP.NET Core', 'PostgreSQL', 'Docker', 'Ollama'],
        stars: 1,
        coverImageUrl: 'https://i.ibb.co/sdShH0d6/neurnet-preview.png',
        images: [],
        aboutHtml: `
          <p>Серверная часть платформы <b>NeurNet</b>.</p>
          <p>Принимает запросы от клиентов, аутентифицирует пользователей через LDAP, маршрутизирует запросы к Ollama и возвращает потоковый ответ.</p>
          <p>Реализована <u>трёхуровневая ролевая модель</u>: администратор, преподаватель, студент — каждый со своими правами на токены и доступ к моделям.</p>
          <figure><img src="https://i.ibb.co/9mv2mZzF/photo-2026-04-12-18-24-14.jpg" alt="Превью проекта Neur.Server.Net" /></figure>
          <h3>Что внутри</h3>
          <ul>
            <li>Потоковая передача ответов LLM через Ollama</li>
            <li>Аутентификация по LDAP через сторонний сервис колледжа</li>
            <li>Система токенов: начисление, списание, передача между ролями</li>
            <li>Чистая архитектура: API / Application / Core / Infrastructure разделены по слоям</li>
          </ul>
        `,
      },
      {
        id: 'p2',
        name: 'DiskayBot',
        lang: 'C#',
        langColor: '#a371f7',
        description:
          'Telegram-бот для студентов КЦТ: авторизация по группе и актуальное расписание в одно нажатие. 100+ пользователей.',
        url: 'https://github.com/DiskayHub/DiskayBot',
        tags: ['Telegram Bot API', '.NET', 'Redis'],
        stars: 3,
        coverImageUrl: 'https://i.ibb.co/RkGFc23F/image-2026-07-13-19-56-10.png',
        images: [],
        aboutHtml: `
          <p>Бот помогает студентам колледжа получать расписание прямо в Telegram.</p>
          <p>Пользователь один раз выбирает курс и группу, после чего может получать актуальное расписание в один клик — или посмотреть расписание любой другой группы.</p>
          <figure><img src="https://i.ibb.co/GQDcS9Gr/Diskay.png" alt="Процесс авторизации Diskay" /></figure>
          <p>Сейчас активно используется: более 100 зарегистрированных пользователей, 10–15 человек в регулярной активности. Бот работает в связке с отдельным CRUD-сервисом DiskayMemory.</p>
          <br>
          <img src="https://i.ibb.co/3944ykzs/image-2026-07-15-14-11-34.png" alt="Внешний вид расписания" width="50%" />
          <h3>Что внутри</h3>
          <ul>
            <li>Авторизация по курсу и студенческой группе</li>
            <li>Получение актуального расписания одной кнопкой</li>
            <li>Redis для кэширования сессий и состояния диалога</li>
            <li>Взаимодействие с DiskayMemory — отдельным API-сервисом на ASP.NET + PostgreSQL</li>
            <li>100+ зарегистрированных пользователей, бот работает в проде</li>
          </ul>
        `,
      },
      {
        id: 'p3',
        name: 'Wayzo.Server',
        lang: 'C#',
        langColor: '#a371f7',
        description:
          'Backend сервиса для автопутешественников: маршруты через OpenRouteService, расчёт стоимости топлива, JWT-авторизация.',
        url: "",
        tags: ['ASP.NET Core', 'PostgreSQL', 'Redis', 'ORS'],
        stars: 0,
        coverImageUrl: 'https://i.ibb.co/TBn95061/Frame-15.png',
        images: [],
        aboutHtml: `
          <p>Серверная часть Wayzo — приложения для планирования автопоездок. Сервис строит маршрут из точки A в точку B через OpenRouteService (на базе OSM), парсит актуальные цены на топливо из открытых источников и считает примерную стоимость поездки. Хранит пользователей, их автомобили и сохранённые маршруты.</p>
          <h3>Что внутри</h3>
          <ul>
            <li>Интеграция с OpenRouteService для построения маршрутов</li>
            <li>Парсинг цен на топливо и расчёт стоимости поездки</li>
            <li>JWT-аутентификация и авторизация пользователей</li>
            <li>Вход по номеру телефона через flash call (zvonok.com)</li>
          </ul>
        `,
      },
      {
        id: 'p4',
        name: 'RollingPanda.Web',
        lang: 'TypeScript',
        langColor: '#3178c6',
        description:
          'Сайт-презентация геймстудии колледжа: проекты, контакты, живой лендинг на React + Vite.',
        url: 'https://github.com/Laxerem/RollingPanda.Web',
        tags: ['React', 'TypeScript', 'Vite'],
        stars: 0,
        coverImageUrl: 'https://i.ibb.co/BKGYPRNH/Frame-16-1.png',
        images: [],
        aboutHtml: `
          <p>Лендинг для студенческой геймстудии <b>Колледжа цифровых технологий</b>.</p>
          <p>Сайт представляет студию, показывает разработанные игры и содержит контактную информацию.</p>
          <figure><img src="https://i.ibb.co/vvm5N8pq/image-2026-07-15-14-38-52.png" alt="Главная страница RollingPanda" /></figure>
          <p>Доступен по адресу <a href="https://rollingpanda.it-college.ru." target="_blank">rollingpanda.it-college.ru.</a></p></p>
          <h3>Что внутри</h3>
          <ul>
            <li>Публичный лендинг, работающий в продакшне</li>
            <li>Презентация игр и команды студии</li>
          </ul>
        `,
      },
    ],
  },

  experience: {
    items: [
      {
        id: 'e1',
        kind: 'work',
        period: '2025 — н.в.',
        title: 'Backend-разработчик',
        organization: 'Проекты / фриланс',
        description:
          'Разработка REST API на ASP.NET Core, интеграция с внешними сервисами (Ollama, ORS, Telegram Bot API), работа с PostgreSQL и Redis.',
      },
      {
        id: 'e2',
        kind: 'education',
        period: '2022 — н.в.',
        title: 'Студент (в процессе)',
        organization: 'Колледж цифровых технологий (КЦТ)',
        description: 'Программирование и информационные технологии. Остался год-два до выпуска.',
      },
    ],
  },

  contacts: {
    items: [
      {
        id: 'c1',
        kind: 'telegram',
        label: 'Telegram',
        href: 'https://t.me/laxwork',
        handle: '@laxwork',
      },
      {
        id: 'c2',
        kind: 'github',
        label: 'GitHub',
        href: 'https://github.com/Laxerem',
        handle: 'github.com/Laxerem',
      },
      {
        id: 'c3',
        kind: 'email',
        label: 'Email',
        href: 'mailto:Laxerem@yandex.ru',
        handle: 'Laxerem@yandex.ru',
      },
    ],
  },
};