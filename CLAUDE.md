# CLAUDE.md — myLanding

Personal portfolio landing site. A single scroll-based page with sections: Hero, About, Stack, Projects, Experience, Contacts.

## Key docs

| File | When to read |
|------|-------------|
| `../docs/task.md` | Understanding **what** the product should do — requirements, sections, design system |
| `../docs/ARCHITECTURE.md` | Understanding **how** the code is structured — key architectural decisions, patterns |

---

## Tech stack

- **React + TypeScript** (Vite)
- **CSS Modules** + CSS custom properties (design tokens)
- **WebGL/Canvas** — animated background

---

## `src/` structure

```
src/
├── App.tsx              # root, composes sections
├── main.tsx             # entry point
├── sections/            # Hero, About, Stack, Projects, Experience, Contacts
├── components/
│   ├── ui/              # atomic elements (Button, Badge, Tag…)
│   └── layout/          # layout wrappers (Section, Container)
├── features/
│   └── BackgroundCanvas/ # isolated WebGL feature
├── hooks/
│   ├── useContent.ts    # single data source for sections
│   └── useScrollReveal.ts
├── services/api.ts      # REST API layer (stub for now)
├── data/content.ts      # static data (current content source)
├── types/content.ts     # TypeScript content types (single source of truth)
└── styles/
    ├── tokens.css       # all colors, fonts, spacing
    └── global.css
```

---

## Key patterns

### Data via props
Sections **do not fetch** data themselves. They receive data via props from `useContent`.  
Currently `useContent` → `data/content.ts`. In the future → `services/api.ts`.

### Styles: tokens only
Hardcoding colors, fonts, or spacing in components is **forbidden**.  
Everything goes through CSS custom properties defined in `styles/tokens.css`.

### Single responsibility
If a block inside a section grows complex — extract it into a separate component.  
Sections compose, `components/ui/` holds atoms, `features/` holds isolated complex features.

### TypeScript everywhere
Data structure is defined in `types/content.ts`. This is the single source of truth for both static data and the future API.

### Imperative code isolation
Imperative canvas/WebGL code lives **outside React** (`features/BackgroundCanvas/background.ts`).  
The React component wires it up via `useRef/useEffect` and returns a cleanup function.

---

## Conventions

- Each section is a dedicated folder under `sections/` with its own `index.tsx`
- Component styles live alongside the component in a `.module.css` file
- New reusable element → `components/ui/`
- New isolated feature with its own logic → `features/`
- Content is never hardcoded in JSX — only via `data/content.ts`

---

## Post-change checklist

```bash
# 1. Linter check
npm run lint

# 2. Type check and build
npm run build
```

- The linter must produce no errors
- The build must complete without TypeScript errors
