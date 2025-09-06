# BuyMeACoffee.mn

Хэл: [Англи](README.md) | [Монгол](README_mn.md)

## Зорилго

- Монголын уран бүтээлчдэд өөрсдийн бүтээлээ хурдан бөгөөд хялбар
  тохиргоогоор мөнгөжүүлэх, "кофе авах" мэт жижиг, нэг удаагийн
  хандиваар дэмжлэг авах боломжийг олгох.
- Дэмжигчдийн хувьд талархлаа илэрхийлэх, зурвас үлдээх, бага
  хэмжээний мөнгөн дэмжлэг үзүүлэх үйл явцыг саадгүй, хялбар болгох.
- Уран бүтээлчдэд хялбархан нэгдэж, өөрийн гэсэн хуудсыг нээж,
  дэмжлэг хүлээн авах ойлгомжтой, цэгцтэй урсгалыг бий болгох.

## Бидний шийдэл

- Уран бүтээлчдэд зориулсан олон улсын хандивын платформыг орлох
  дотоодын, хэрэглэхэд хялбар шийдэл.
- Дэмжигчид нь төвөгтэй төлбөрийн системгүйгээр, энгийн аргаар
  талархлаа илэрхийлэх боломж.
- Уран бүтээлч бүрд зориулсан нэгдсэн хуудас нь профайл,
  сэтгэгдлүүд, болон дэмжлэгийг нэг дор харуулна.

## Үндсэн үнэ цэн

- **Хурдан эхлэл:** Google ашиглан нэвтэрч, хэдхэн минутын дотор
  өөрийн хуудсыг үүсгэх.
- **Энгийн хэрэглээ:** Дэмжигчид дүн сонгох, зурвас үлдээх, илгээх
  гэсэн цөөн үйлдлээр дэмжлэг үзүүлэх.
- **Монгол төвтэй:** Монгол хэл дээрх интерфейс, хөнгөн, ойлгомжтой
  дизайн.
- **Ил тод байдал:** Сүүлд ирсэн дэмжлэг, сэтгэгдлүүд нь уран
  бүтээлчийн хуудас болон нүүр хуудсанд нээлттэй харагдана.

## Хэрхэн ажилладаг вэ (Ерөнхий танилцуулга)

1.  **Нэвтрэх:** Хэрэглэгчид NextAuth ашиглан Google хаягаараа
    нэвтэрнэ. Анх нэвтрэхэд тухайн хэрэглэгчийн `User` мэдээлэл
    системд үүснэ (эсвэл шинэчлэгдэнэ).
2.  **Хуудас үүсгэх:** Уран бүтээлчид өөрийн хэрэглэгчийн нэр,
    танилцуулга, зураг бүхий `Creator` хуудсыг үүсгэнэ.
3.  **Дэмжлэг үзүүлэх:** Зочид дэмжлэг үзүүлэх дүнгээ сонгож, зурвас
    үлдэээхэд `Payment` хэлбэрээр төлбөрийн мэдээлэл (mock)
    хадгалагдана. Сэтгэгдэл нь тухайн уран бүтээлчийн хуудсанд
    нийтлэгдэнэ.
4.  **Нээх, танилцах:** Нүүр хуудсанд бүх уран бүтээлчдийн
    `creatorProfile` болон сүүлд нэмэгдсэн сэтгэгдлүүд харагдана.

## Архитектур

- **Framework:** Next.js 14 (App Router), React 18, TypeScript.
- **Нэвтрэх/Баталгаажуулалт (Auth):** NextAuth (Google provider).
  Холбогдох кодууд: `app/api/auth/[...nextauth]` болон `auth.ts`.
- **Өгөгдлийн сан:** PostgreSQL болон Prisma ORM. Prisma client-ийг
  `lib/prisma.ts` файлаас singleton хэлбэрээр ашиглана.
- **API Routes:** Next.js App Router-ийн `route.ts` файлуудыг
  `app/api/` дор үүсгэсэн.
- **Интерфейс (UI):** Tailwind CSS болон shadcn/ui.
- **Repository Pattern:** Өгөгдлийн сантай харьцах логикийг
  `app/repositories/` болон `lib/repositories/` фолдеруудад
  repository pattern ашиглан хийсэн. Prisma-ийн бүх үйлдэл зөвхөн
  сервер талд хийгдэнэ.

## Өгөгдлийн модель (Prisma)

- **User:** `id`, `email`, `name`, `username`, `profileImage`,
  `timestamps`
  - Харилцаа: бичсэн сэтгэгдлүүд, бүтээгчийн хувиар авсан
    сэтгэгдлүүд, `creatorProfile` (Creator-той 1-1 холбогдоно)
- **Creator:** `id` (uuid), `username` (давтагдашгүй), `bio`,
  `profileImage`, `userId` (давтагдашгүй), `payments[]`
- **Comment:** `id`, `content` (<=500), `amount` (заавал биш),
  `authorId` -> User, `creatorId` -> User (`CreatorComments`
  холбоогоор)
- **Payment:** `id` (uuid), `amount`, `currency`, `status`,
  `paymentIntentId` (давтагдашгүй), `creatorId` -> Creator, `name`,
  `message` (заавал биш)

## Гол урсгал ба бүрдлүүд

### Нүүр хуудас (`app/page.tsx`)

- `UserRepository.getCreators()` ашиглан бүтээгчдийг жагсаана.
- `CommentRepository.getLatest()` ашиглан сүүлийн сэтгэгдлүүдийг
  харуулна.

### Бүтээгчийн хуудас (`app/[username]/page.tsx`)

- `/api/creators/[username]` замаас профайлыг авна.
- Дэмжлэгийн маягт `/api/create-payment-intent` замаар төлбөрийн
  санаачилга үүсгэнэ.
- Сэтгэгдлийн хэсэгт `CommentForm`, `CommentsList` бүрдлүүдийг
  ашиглана.

### Бүртгүүлэх (`app/@creator/page.tsx`, `app/onboarding/creator/page.tsx`)

- Бүтээгчийн хуудас байгаа эсэхээс шалтгаалж өөр хуудас руу
  чиглүүлнэ.
- `CreatorOnboardingForm` нь Zod ашиглан хэрэглэгчийн оруулсан
  мэдээллийг шалгаад `/api/creators` руу илгээнэ.

### Профайл засах (`app/[username]/edit/page.tsx`)

- `PUT /api/creators/[username]` замаар мэдээллээ шинэчилнэ.

## API тойм

### Auth

- `GET/POST /api/auth/[...nextauth]`: NextAuth-ийн үйлдлүүд

### Creators

- `POST /api/creators`: тухайн нэвтэрсэн хэрэглэгчид Creator үүсгэнэ.
- `GET /api/creators/[username]`: олон нийтэд нээлттэй профайл
  мэдээлэл (`isOwnProfile` талбартай).
- `PUT /api/creators/[username]`: эзэмшигч нь `username` болон `bio`-г
  шинэчилнэ.

### Comments

- `POST /api/comments`: сэтгэгдэл үүсгэнэ (нэвтэрсэн байх
  шаардлагатай).
- `GET /api/comments/[username]`: тухайн бүтээгчийн сэтгэгдлүүдийг
  авна.

### Payments (mock)

- `POST /api/create-payment-intent`: Төлбөрийн санаачилга (mock)
  үүсгэж `Payment` болгон хадгалаад, `clientSecret` буцаана.
- `POST /api/confirm-payment`: `clientSecret`-г ашиглан төлбөрийг
  баталгаажуулна (mock).

## Аюулгүй байдал ба шалгалт

- Сэтгэгдэл үүсгэх, төлбөрийн санаачилга үүсгэхэд нэвтэрсэн байх
  ёстой.
- Creator үүсгэх нь зөвхөн тухайн сессийн хэрэглэгчид
  зөвшөөрөгдөнө; `username` давхцахгүйг шалгана.
- Мэдээлэл шинэчлэх үед өмчлөгч эсэхийг баталгаажуулна; `username`
  давхцвал буцаана.
- Бүртгүүлэх маягтад Zod ашиглан client талд шалгалт хийнэ; API
  сервер талд нэмэлт хамгаалалттай.

## Локал хөгжүүлэлт

### Шаардлага

- Node.js 20+, Yarn
- Docker (Postgres-г `docker-compose`-оор ажиллуулахад)

### Орчны хувьсагчууд

- Аппликейшнд шаардлагатай (жишээг `docker-compose.yml`-с харна уу):
  - `AUTH_GOOGLE_ID`
  - `AUTH_GOOGLE_SECRET`
  - `AUTH_SECRET`
  - `DATABASE_URL` (app контейнерт compose-оор автоматаар
    тохируулагдана; локал хөгжүүлэлтэд терминалдаа тохируулна)

### Docker-оор ажиллуулах

1.  `yarn install`
2.  `docker-compose up --build`
3.  Өөр терминал нээж (хэрвээ контейнероос гадуур хөгжүүлж байвал):
    - `export DATABASE_URL="postgresql://bmc_user:test1234@localhost:5432/bmc_db?schema=public"`
    - `yarn prisma migrate dev`
    - `yarn prisma:seed`
4.  Апп `http://localhost:3000` дээр ажиллана.

### Docker-гүйгээр ажиллуулах

1.  Postgres асааж `DATABASE_URL`-г тохируулна.
2.  `yarn install`
3.  `yarn prisma migrate dev`
4.  `yarn prisma:seed`
5.  `yarn dev`

## Технологийн стек

- Next.js 14 (App Router), React 18, TypeScript
- NextAuth (Google), Prisma, PostgreSQL
- Tailwind CSS, shadcn/ui, Radix UI

## Төслийн бүтэц (сонгомол)

- **app/**
  - **api/**
    - `auth/[...nextauth]/route.ts`
    - `creators/route.ts`, `creators/[username]/route.ts`
    - `comments/route.ts`, `comments/[username]/route.ts`
    - `create-payment-intent/route.ts`
    - `confirm-payment/route.ts`
  - `@creator/page.tsx`
  - `onboarding/creator/page.tsx`
  - `[username]/page.tsx`, `[username]/edit/page.tsx`
  - `page.tsx`, `layout.tsx`
- **lib/**
  - `prisma.ts`
  - `repositories/comment-repository.ts`, `creator-repository.ts`
- **app/repositories/userRepository.ts**
- **components/**
  - `comment-form.tsx`, `comments-list.tsx`,
    `creator-onboarding-form.tsx`, `header.tsx`
- **prisma/**
  - `schema.prisma`, `seed.ts`

## Хөгжүүлэлтийн тэмдэглэл

- Prisma client-г singleton хэлбэрээр ашиглана (`lib/prisma.ts`).
- Бүх Prisma үйлдэл сервер талд хийгдэнэ (API routes, server
  components).
- Repository загвар ашиглан өгөгдлийн сантай харьцах логикийг
  тусгаарласан.
- Төлбөрийн урсгал нь mock хэлбэрээр хийгдсэн. Stripe холбохдоо
  `/api/create-payment-intent`, `/api/confirm-payment` логикийг
  солиод, client талд Stripe.js-ийг холбоно.

## Цаашдын хөгжүүлэлт (git түүх болон одоогийн кодоос харахад)

- Stripe-ийн бүрэн интеграц (сервер + клиент)
- Бүтээгчийн хяналтын самбар (аналитик, төлбөрийн тохиргоо)
- Сэтгэгдэлд reaction дарах, дэмжигчийн түүхийг илүү баяжуулах
- Олон хэлний дэмжлэг, хүртээмжийн сайжруулалт

## Лиценз

Sustainable Use License


