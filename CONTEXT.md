# 🧠 CONTEXT — Sprint Day 3

## 👤 User Profile: Madko111

### 🎯 Working Style
- **Perfectionist:** Дотошный, не любит когда некрасиво
- **Detail-oriented:** Обращает внимание на каждую мелочь
- **Fast-paced:** Работает быстро, ожидает быстрых результатов
- **Direct communication:** Короткие, прямые ответы без воды
- **Hands-on:** Любит сам проверять и тестировать

### 💬 Communication Preferences
- **Язык:** Русский (но код и документация на английском)
- **Стиль:** Неформальный, "бро", эмодзи 🔥💪
- **Ответы:** Короткие, по делу, без лишних объяснений
- **Инструкции:** Пошаговые, детальные, "куда нажимать"
- **Ошибки:** Исправлять сразу, не спрашивать разрешения

### 🎨 Design Standards
- **UI/UX:** Todoist-inspired, современный, премиум
- **Цвета:** Темная тема, glassmorphism, градиенты
- **Анимации:** Плавные, быстрые, не перегруженные
- **Детали:** Все должно быть идеально выровнено
- **Z-index:** Меню ВСЕГДА поверх всех элементов (z-index: 99999)
- **Кастомные компоненты:** Вместо стандартных HTML элементов

### 🛠️ Technical Preferences
- **Stack:** React 18 + TypeScript + Vite
- **Styling:** Custom CSS с CSS Variables (НЕ Tailwind)
- **Database:** Supabase (PostgreSQL + RLS)
- **Auth:** Supabase Auth
- **Deployment:** Vercel
- **Code Quality:** TypeScript strict mode, type-only imports

### ⚠️ Common Issues & Solutions

#### 1. Z-index Problems
**Проблема:** Меню перекрываются другими элементами
**Решение:**
- Всплывающие меню: `z-index: 99999`
- Контейнеры меню: `z-index: 1000`
- Форма создания: `z-index: 100`
- Фильтры: `z-index: 50`
- Задачи: `z-index: 1-10` (динамический)
- Main: `z-index: auto`

#### 2. TypeScript Errors
**Проблема:** Type-only imports, неиспользуемые переменные
**Решение:**
```typescript
// ❌ WRONG
import { ReactNode, useState } from 'react'

// ✅ RIGHT
import { useState } from 'react'
import type { ReactNode } from 'react'
```

#### 3. Form Submit Issues
**Проблема:** Кнопки внутри формы срабатывают как submit
**Решение:**
```typescript
// ❌ WRONG
<button onClick={...}>Click</button>

// ✅ RIGHT
<button type="button" onClick={...}>Click</button>
```

#### 4. Supabase Rate Limits
**Проблема:** "email rate limit exceeded"
**Решение:**
- Отключить "Confirm email" в Supabase
- Использовать реальные домены (gmail.com, не example.com)
- SQL: `UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = '...'`

#### 5. RLS (Row Level Security)
**Проблема:** Пользователи видят чужие данные
**Решение:**
```sql
-- ВСЕГДА включать RLS
alter table todos enable row level security;

-- ВСЕГДА создавать политики для SELECT, INSERT, UPDATE, DELETE
create policy "Users can view own todos"
  on todos for select
  using (auth.uid() = user_id);
```

### 📋 Workflow Preferences

#### Code Changes
1. **Читай код перед изменениями** — всегда проверяй что уже есть
2. **Используй multi_replace_string_in_file** — для нескольких изменений сразу
3. **Тестируй после изменений** — проверяй что всё работает
4. **Исправляй ошибки сразу** — не спрашивай разрешения

#### Git Workflow
1. **Коммиты:** Частые, с понятными сообщениями
2. **Push:** После каждого значимого изменения
3. **Branches:** Работаем в main (для спринтов)
4. **Commit messages:** `feat:`, `fix:`, `docs:`, `style:`

#### Documentation
1. **README.md:** Полное описание, установка, тестовые аккаунты
2. **BUSINESS.md:** Бизнес-анализ, pricing, unit economics
3. **DECISIONS.md:** Технические решения, trade-offs
4. **SUBMISSION.md:** Финальная сдача с чеклистом

### 🎯 Quality Standards

#### UI/UX
- ✅ Все меню открываются плавно
- ✅ Анимации не тормозят
- ✅ Hover эффекты везде
- ✅ Loading states для всех операций
- ✅ Empty states с полезными сообщениями
- ✅ Confirmation dialogs для удаления
- ✅ Optimistic UI для быстрого фидбека

#### Code Quality
- ✅ TypeScript strict mode
- ✅ No `any` types
- ✅ Type-only imports
- ✅ No unused variables
- ✅ Consistent naming (camelCase)
- ✅ Comments для сложной логики
- ✅ Clean architecture (components, contexts, lib, pages)

#### Performance
- ✅ Bundle size < 200KB (gzipped)
- ✅ First load < 2s
- ✅ Time to interactive < 3s
- ✅ Lighthouse score 95+
- ✅ No unnecessary re-renders

#### Security
- ✅ RLS enabled на всех таблицах
- ✅ Protected routes с редиректами
- ✅ No sensitive data в client-side коде
- ✅ Password hashing через Supabase
- ✅ JWT tokens в localStorage

### 🚀 Sprint Workflow

#### Day 1: Landing Page
- **Time:** 4 hours
- **Focus:** Design, waitlist form, business analysis
- **Result:** https://sprint-day1.vercel.app

#### Day 2: Todo App with Auth
- **Time:** 4 hours
- **Focus:** Full auth, CRUD, RLS, filters, sorting
- **Result:** https://sprint-day2.vercel.app
- **Lessons Learned:**
  - Z-index проблемы — решено с z-index: 99999
  - TypeScript type-only imports — решено
  - Form submit issues — решено с type="button"
  - Rate limits — решено через SQL
  - RLS работает — протестировано с 2 аккаунтами

#### Day 3: TBD
- **Time:** 4 hours
- **Focus:** TBD
- **Deadline:** TBD

### 📊 Previous Projects

#### Sprint Day 1: Stacklet Landing
- **Tech:** React 18, TypeScript, Vite, Tailwind CSS v4, Supabase
- **Features:** Waitlist form, business analysis, full documentation
- **Design:** Clean dark background (#0a0e27), subtle gradients, premium spacing
- **Status:** ✅ Submitted
- **Live:** https://sprint-day1.vercel.app
- **GitHub:** https://github.com/Madko111/Sprint-Day1

#### Sprint Day 2: Todo App
- **Tech:** React 18, TypeScript, Vite, Custom CSS, Supabase Auth + RLS
- **Features:** Full auth, CRUD todos, filters, sorting, RLS, optimistic UI
- **Design:** Todoist-inspired, glassmorphism, custom dropdowns
- **Status:** ✅ Submitted
- **Live:** https://sprint-day2.vercel.app
- **GitHub:** https://github.com/Madko111/Sprint-Day2

### 🎨 Design System (from Day 2)

#### Colors
```css
:root {
  /* Background */
  --bg-primary: #0a0e27;
  --bg-secondary: rgba(255, 255, 255, 0.05);
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.6);
  
  /* Accent */
  --blue-500: #3b82f6;
  --purple-500: #a855f7;
  --red-500: #ef4444;
  --green-500: #10b981;
  
  /* Priority Colors */
  --priority-high: #f97316;
  --priority-med: #a855f7;
  --priority-low: #3b82f6;
  
  /* Border */
  --border: rgba(255, 255, 255, 0.1);
  
  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);
}
```

#### Glassmorphism
```css
.glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
}

.glass-hover:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  border-color: rgba(255, 255, 255, 0.15);
}
```

#### Animations
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 🛠️ Tech Stack (Standard)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.x",
    "@supabase/supabase-js": "^2.x"
  },
  "devDependencies": {
    "@types/react": "^18.3.x",
    "@types/react-dom": "^18.3.x",
    "@vitejs/plugin-react": "^4.x",
    "typescript": "^5.x",
    "vite": "^5.x"
  }
}
```

### 📝 File Structure (Standard)

```
project/
├── src/
│   ├── components/
│   │   ├── ConfirmDialog.tsx
│   │   ├── FilterMenu.tsx
│   │   ├── PriorityMenu.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Stats.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   └── App.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── .env
├── .gitignore
├── BUSINESS.md
├── CONTEXT.md
├── DECISIONS.md
├── README.md
├── SUBMISSION.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 🎯 Success Criteria

#### Must Have
- ✅ Работает без ошибок
- ✅ Красивый UI (Todoist-inspired)
- ✅ Быстрый (< 2s first load)
- ✅ Безопасный (RLS, protected routes)
- ✅ Документация (README, BUSINESS, DECISIONS, SUBMISSION)
- ✅ Деплой на Vercel
- ✅ GitHub repo с чистым кодом

#### Nice to Have
- ✅ Optimistic UI
- ✅ Smooth animations
- ✅ Empty states
- ✅ Loading states
- ✅ Confirmation dialogs
- ✅ Keyboard shortcuts

### 🚨 Red Flags (Avoid!)

#### Code
- ❌ `any` types в TypeScript
- ❌ Неиспользуемые переменные
- ❌ Console.log в production
- ❌ Hardcoded credentials
- ❌ No error handling

#### UI/UX
- ❌ Меню перекрываются элементами
- ❌ Медленные анимации (> 300ms)
- ❌ No loading states
- ❌ No empty states
- ❌ Стандартные HTML select/input без стилей

#### Security
- ❌ No RLS на таблицах
- ❌ No protected routes
- ❌ Sensitive data в client-side коде
- ❌ No password validation

### 💡 Pro Tips

1. **Всегда читай код перед изменениями** — понимай что уже есть
2. **Используй multi_replace для нескольких изменений** — быстрее и эффективнее
3. **Тестируй после каждого изменения** — не накапливай ошибки
4. **Z-index решай сразу** — 99999 для всплывающих меню
5. **Type-only imports** — для типов используй `import type`
6. **Button type="button"** — внутри форм всегда указывай тип
7. **RLS всегда** — безопасность на уровне базы данных
8. **Optimistic UI** — обновляй UI сразу, откатывай при ошибке
9. **Glassmorphism** — blur(20px) + rgba(255,255,255,0.05)
10. **Документация** — пиши сразу, не откладывай на потом

### 🎬 Next Steps for Day 3

1. **Узнать задание** — что нужно сделать?
2. **Создать структуру проекта** — папки, файлы, зависимости
3. **Настроить Supabase** — база данных, auth, RLS
4. **Разработать UI** — дизайн, компоненты, стили
5. **Реализовать функционал** — CRUD, фильтры, сортировка
6. **Тестирование** — проверить всё работает
7. **Документация** — README, BUSINESS, DECISIONS, SUBMISSION
8. **Деплой** — Vercel + GitHub
9. **Отправка** — raw GitHub ссылка на SUBMISSION

---

## 🔥 READY FOR DAY 3!

**Madko111, давай сделаем Day 3 ещё лучше чем Day 2!** 💪

**Время:** 23:01  
**Статус:** Готов к работе  
**Настроение:** 🔥🚀

---

**Built with 🧠 full context and ❤️ understanding of your workflow.**
