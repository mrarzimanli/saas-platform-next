## Proyekti işə salmaq üçün:

Nümunə kimi əlavə olunmuş `env-example` faylını `.env` olaraq dəyişərək aşağıdakı əmrləri ardıcıllıqla icra edin.

```bash
npm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Nəticəni görmək üçün brauzerdə [http://localhost:3000](http://localhost:3000) açın.

## Hər plan üçün test istifadəçi
**Qeyd:** yeni istifadəçi yaradaraq da daxil ola bilərsiniz.

| **Plan**       | **E-mail**                    | **Password** |
| -------------- | ----------------------------- | ------------ |
| **Basic**      | `test.basic@example.com`      | `Test123`    |
| **Pro**        | `test.pro@example.com`        | `Test123`    |
| **Enterprise** | `test.enterprise@example.com` | `Test123`    |



## İstifadə olunan texnologiyalar:

- Proyekt arxitekturası `Union Design Pattern` əsasında hazırlanıb və modulyarlıq maksimum qorunmağa çalışılıb.

- Ehtiyac olan API-ləri təmin edə bilmək üçün `next.js` istifadə edilib və hər hansı 3-cü tərəf provider istifadə etmədən bütün API-lər manual olaraq yazılıb.

- `JWT` istifadə edərək **Secure Authentication** təmin edildi. (`authToken`, `refreshToken`)
- **Global state management** üçün `ContextAPI`, **data fetching** üçün `react-query`, **API client** olaraq `axios` istifadə edilib.

- Routing dəyişikliyi olmadan **internationalization** üçün `next-intl (i18n)` istifadə edilib. (`en`, `az`)

- `middleware` vasitəsi ilə **Protected Routing** və **Plan-Based Access Control** təmin edilib.

- **Code efficiency** artırmaq üçün `TypeScript` istifadə olunub.

- Dizayn bacarıqlarını önə çıxarmaq üçün hər hansı Design System və ya kitabxana istifadə olunmayıb. Dizayn `BEM` metodologiyası və `Module SCSS` istifadə edilərək sıfırdan hazırlanıb.
- Analitik məlumatlarının göstərilməsi üçün `Apache eCharts` istifadə olunub.

- **Data Fetching** zamanı axıcı görüntünün əldə olunması üçün `React Loading Skeleton` istifadə olunub.

-  `SVGr` vasitəsi ilə vizuallarlın komponent kimi render olunması təmin olunub.

- Baş verə biləcək UI xətalarınını, mövcud olmayan səhifələrə müraciətləri önləmək üçün global `not-found`, `errors`, `loading` səhifələri əlavə edilib.

- `React Testing Library` və `Jest` istifadə olunaraq bir neçə test nümunəsi yazılııb.

## API Structure

| **Category**  | **Endpoint**                     | **Description**              |
| ------------- | -------------------------------- | ---------------------------- |
| **Analytics** | `analytics/audienceByAge/`       | Audience data by age         |
|               | `analytics/audienceByCities/`    | Audience data by cities      |
|               | `analytics/audienceByCountries/` | Audience data by countries   |
|               | `analytics/audienceByGender/`    | Audience data by gender      |
|               | `analytics/performances/`        | Content performance data     |
|               | `analytics/posts/`               | Posts analytics              |
|               | `analytics/reels/`               | Reels analytics              |
| **Auth**      | `auth/login/`                    | User login                   |
|               | `auth/logout/`                   | User logout                  |
|               | `auth/me/`                       | Get current user info        |
|               | `auth/refresh-token/`            | Refresh authentication token |
|               | `auth/register/`                 | User registration            |
| **Plans**     | `plans/[id]/`                    | Plan details                 |
|               | `plans/[id]/cancel/`             | Cancel a specific plan       |
|               | `plans/list/`                    | List all plans               |
|               | `plans/subscribe/`               | Subscribe to a plan          |


## Plan Features

| **Plan**       | **Features**                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| **Basic**      | Performances, Audience by Gender, Audience by Age, Posts                                                   |
| **Pro**        | Performances, Audience by Gender, Audience by Age, Posts, Reels                                            |
| **Enterprise** | Performances, Audience by Gender, Audience by Age, Audience by Countries, Audience by Cities, Posts, Reels |


## Pages List

## Auth Pages
- `auth/login`
- `auth/signup`

## Dashboard Pages
- `dashboard/analytics` (show only for pro and enterprise users)
- `dashboard/dashboard`
- `dashboard/settings`
