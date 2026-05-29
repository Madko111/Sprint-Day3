# 🚀 ИНСТРУКЦИЯ ПО ПОДКЛЮЧЕНИЮ SUPABASE

## ✅ ЧТО УЖЕ СДЕЛАНО:

1. ✅ `.env` обновлен с твоими credentials
2. ✅ `useOrders.ts` обновлен - теперь использует Supabase
3. ✅ SQL скрипт создан - `supabase/dashboard_seed.sql`
4. ✅ Таблица называется `dashboard_orders` (не конфликтует со Sprint Day 2)

---

## 📋 ЧТО НУЖНО СДЕЛАТЬ (5 минут):

### Шаг 1: Открыть Supabase SQL Editor

1. Открой https://supabase.com/dashboard/project/qdzohomlwlozyfolgaiv
2. В левом меню нажми **SQL Editor**
3. Нажми **New query**

### Шаг 2: Запустить SQL скрипт

1. Открой файл `c:\Users\user\Desktop\Sprint-Day3\supabase\dashboard_seed.sql`
2. Скопируй **ВЕСЬ** код (Ctrl+A, Ctrl+C)
3. Вставь в SQL Editor (Ctrl+V)
4. Нажми **Run** (или F5)
5. Должно появиться: "Dashboard orders table created successfully! 50 orders inserted."

### Шаг 3: Проверить что таблица создана

1. В левом меню нажми **Table Editor**
2. Найди таблицу `dashboard_orders`
3. Должно быть **50 строк**
4. Проверь что есть колонки: order_number, customer_name, product, category, amount, status, region, created_at

### Шаг 4: Перезапустить дашборд

1. Останови dev сервер (Ctrl+C в терминале)
2. Запусти снова:
```bash
cd c:\Users\user\Desktop\Sprint-Day3\dashboard
npm run dev
```
3. Открой http://localhost:5174

---

## 🎬 ЧТО ДОЛЖНО РАБОТАТЬ:

### ✅ Дашборд загружает данные из Supabase:
- **Total Revenue** - сумма всех amount
- **Orders Count** - 50 заказов
- **Average Order Value** - средний чек
- **Refund Rate** - процент refunded

### ✅ Все фильтры работают:
- Date Range (7d, 30d, 90d, 180d)
- Region (NA, EU, APAC, LATAM)
- Category (Electronics, Apparel, Home, Books)
- Status (pending, paid, refunded, cancelled)
- Search

### ✅ Все графики обновляются:
- Revenue Over Time (линия)
- Revenue by Region (столбцы)
- Orders by Status (пончик)
- Top 5 Products (горизонтальные столбцы)

### ✅ Таблица показывает заказы:
- Сортировка по колонкам
- Пагинация
- CSV export

---

## 🎥 СЦЕНАРИЙ ДЛЯ ВИДЕО (2 минуты):

### 1. Показать Supabase (30 сек)
- Открыть Table Editor
- Показать таблицу `dashboard_orders` с 50 строками
- Показать несколько записей (ORD-2026-001, John Smith, $299.99, paid, NA)

### 2. Показать код (15 сек)
- Открыть `.env` (замазать credentials)
- Открыть `useOrders.ts` - показать строку:
```typescript
.from('dashboard_orders')
```

### 3. Показать дашборд (1 мин)
- Открыть http://localhost:5174
- Показать KPI: Total Revenue, Orders, AOV, Refund Rate
- Применить фильтр Date Range: 30 Days
- Применить фильтр Region: NA, EU
- Показать что графики обновились
- Показать таблицу с заказами
- Экспортировать CSV

### 4. Показать синхронизацию (30 сек)
- Вернуться в Supabase Table Editor
- Нажать **Insert row**
- Заполнить:
  - order_number: ORD-2026-051
  - customer_name: Test User
  - customer_email: test@test.com
  - product: Test Product
  - category: Electronics
  - amount: 99.99
  - status: paid
  - region: NA
  - created_at: NOW()
- Сохранить
- Вернуться в дашборд
- Обновить страницу (F5)
- Показать что новый заказ появился в таблице!

---

## ❌ ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ:

### Ошибка: "Failed to fetch orders"
→ Проверь что SQL скрипт запустился без ошибок

### Ошибка: "Table dashboard_orders does not exist"
→ Запусти SQL скрипт еще раз

### Пустой дашборд (0 заказов)
→ Проверь в Supabase Table Editor что есть 50 строк

### Dev сервер не запускается
→ Останови все процессы на порту 5174:
```bash
netstat -ano | findstr :5174
taskkill /PID <номер> /F
```

---

## 🔥 ГОТОВО!

Теперь у тебя:
- ✅ Таблица `dashboard_orders` в Supabase (не конфликтует со Sprint Day 2)
- ✅ 50 реалистичных заказов
- ✅ Дашборд подключен к Supabase
- ✅ Все фильтры и графики работают
- ✅ Готово для записи видео!

**ПОГНАЛИ СНИМАТЬ ВИДЕО!** 🎬🔥
