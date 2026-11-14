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

  resume: {
    fileUrl: '/resume.pdf',
    downloadName: 'Воробьёв Григорий — Backend-разработчик (C# .NET).pdf',
    updatedAt: '9 ноября 2026',
    fullName: 'Воробьёв Григорий',
    position: 'Backend-разработчик (C# .NET)',
    terms: ['Екатеринбург', 'Полная занятость', 'Удалённо', 'Самозанятость'],
    about:
      'Backend-разработчик с фокусом на C# и экосистеме .NET. Имею практический опыт проектирования архитектуры (Clean Architecture, REST API), работы с PostgreSQL, Docker и EF Core. Участвовал в командной разработке в роли тимлида — декомпозировал задачи, согласовывал план с заказчиком, работал в Redmine. Комфортно работаю по Scrum и Kanban. Люблю разбираться в новых технологиях — в проектах самостоятельно осваивал Ollama, Open Route Service, Flutter.',
    experienceTotal: '2 года 3 месяца',
    jobs: [
      {
        company: '741 Studios',
        location: 'Екатеринбург',
        role: 'Backend-разработчик',
        period: 'Сентябрь 2024 — н.в.',
        duration: '2 года 3 месяца',
        projects: [
          {
            title: 'Wayzo.Server',
            subtitle: 'Backend сервиса Wayzo для планирования дальних автопоездок (визы, страховки, расчёты топлива)',
            period: 'Январь 2026 — н.в.',
            link: { label: 'wayzoapp.ru', href: 'https://wayzoapp.ru' },
            paragraphs: [
              'Сервис строит маршрут между точками, считает стоимость топлива под автомобиль пользователя и подбирает визовые требования и страховки для стран на пути. Реализовал на .NET 9 по DDD: модульный монолит из bounded context-ов с отдельными схемами БД, общение только через контракты.',
              'Ядро — контекст планирования поездок с богатой доменной моделью: агрегат поездки с инвариантами и value objects для денег, расстояний и стоимости топлива; данные соседних модулей приходят через anti-corruption layer на портах и адаптерах. Вход по OTP-коду с двумя типами JWT и хранением кодов в Redis, REST-эндпоинты, фоновые сервисы собирают визы, страховки, цены на топливо и курсы валют.',
            ],
          },
          {
            title: 'Diskay',
            subtitle: 'Telegram-бот расписания колледжа из двух микросервисов',
            period: 'Июль 2025 — март 2026',
            link: { label: 'github.com/DiskayHub', href: 'https://github.com/DiskayHub' },
            paragraphs: [
              'Бот показывает студенту расписание его группы и рассылает новости. DiskayBot на .NET 9: фоновый воркер каждые 2 минуты забирает расписание всех групп с портала колледжа и кэширует его в Redis, команды бота читают из кэша. DiskayMemory — REST API на ASP.NET Core, EF Core и PostgreSQL для хранения пользователей и групп, 11 эндпоинтов. Настроил автодеплой на свой сервер через GitHub Actions: бэкап базы, запуск стека в Docker Compose и проверка сервисов. Ботом пользуются около 20 студентов, зарегистрировано более 100.',
            ],
          },
          {
            title: 'VictorySearcher',
            subtitle: 'HR-сервис ранжирования резюме под вакансию с помощью LLM (тестовое задание VictoryGroup)',
            period: 'Июнь 2026 — июль 2026',
            link: { label: 'github.com/Laxerem/VictorySearcher', href: 'https://github.com/Laxerem/VictorySearcher' },
            paragraphs: [
              'Рекрутёр создаёт вакансию и загружает резюме, сервис оценивает каждое через LLM и выдаёт отсортированный список кандидатов с обоснованием. Backend на .NET 9 по Clean Architecture: скоринг выполняется в фоновых задачах Hangfire, прогресс передаётся клиенту через SSE. Для стабильности оценок делается 3 параллельных запроса к модели и берётся медиана, спорные кандидаты помечаются для ручной проверки. REST, JWT, EF Core и PostgreSQL, весь стек поднимается через Docker Compose.',
              'Разрабатывал с Claude Code (требование ТЗ) по выстроенному процессу: 3 агента (архитектор, .NET-разработчик, документатор), claude skills, claude rules, CLAUDE.md для каждого сервиса и память агентов между сессиями. Каждое изменение проходило мой ревью перед коммитом.',
            ],
          },
          {
            title: 'NeurNet',
            subtitle: 'Платформа доступа к LLM для студентов колледжа в локальной сети',
            period: 'Ноябрь 2025 — май 2026',
            link: { label: 'github.com/NeurNet', href: 'https://github.com/NeurNet' },
            paragraphs: [
              'Студенты отправляют запросы к нейросетям через веб-интерфейс и тратят токены, которые им выдаёт преподаватель. Разработал backend на ASP.NET Core: очередь запросов к моделям Ollama в фоновом сервисе с потоковыми ответами через SSE, вход через LDAP колледжа, роли и учёт токенов. REST-эндпоинты, EF Core и PostgreSQL, unit-тесты на xUnit и Moq, CI на GitHub Actions. Руководил командой из 2 человек.',
            ],
          },
        ],
      },
    ],
    skills: ['C#', 'ASP.NET', 'PostgreSQL', 'Entity Framework', 'REST API', 'HTTP', 'Docker', 'Linux', 'Git', 'Claude Code'],
    education: [
      {
        institution: 'Колледж Цифровых Технологий',
        specialty: 'Backend-разработчик',
        level: 'Среднее специальное',
        year: '2028',
      },
    ],
  },

  about: {
    lead: `
    Я Backend-разработчик на C# / .NET.
    Мне нравится та часть, что скрыта от пользователя: чистая логика, продуманные API и решения, которые не разваливаются под нагрузкой.`,
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