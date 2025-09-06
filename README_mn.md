# BuyMeACoffee.mn

Хэл: [Англи](README.md) | [Монгол](README_mn.md)

## Зорилго

- Монголын бүтээгчдэд бүтээлээ хялбар аргаар мөнгөн дэмжлэг авч,
  жижиг нэг удаагийн хандив ("кофе авч өгөх") хэлбэрээр
  мөнгөжүүлэх боломж олгох.
- Дэмжигчдэд талархлаа илэрхийлж, зурвас үлдээн, хүсвэл бага хэмжээний
  дэмжлэг илгээх үйл явцыг аль болох энгийн, хурдан болгох.
- Бүтээгчдэд бүртгэлээ хурдан тохируулж, олон нийттэй хуваалцах
  хуудсаа гаргаж, дэмжлэг авах тодорхой зам гаргах.

## Юуг шийддэг вэ

- Дотоодод хэрэглэж болох, дэлхийн үйлчилгээний орлуулга болсон
  хялбар хандивын шийдэл бүтээгчдэд үгүйлэгддэг.
- Фэнүүд төвөгтэй төлбөрийн урсгалгүйгээр талархлаа илэрхийлэх
  хөнгөн жинтэй аргыг хүсдэг.
- Нэг бүтээгчид нэг хуваалцагдах хуудас нь профайл, сэтгэгдэл,
  дэмжлэгийг нэгтгэнэ.

## Өгдөг үнэ цэнэ

- Хурдан эхлүүлэлт: Google нэвтрэлт, минутын дотор хуудас нээх.
- Дэмжигчийн энгийн туршлага: дүн сонгох, зурвас үлдээх, илгээх.
- Дотоод төвлөрөл: монгол интерфэйс, хөнгөн жинтэй дизайн.
- Ил тод байдал: сүүлийн дэмжлэг, сэтгэгдлүүд бүтээгчийн хуудас
  болон нүүр хуудсанд харагдана.

## Яаж ажилладаг вэ (өндөр түвшин)

1. Баталгаажуулалт: Хэрэглэгч NextAuth ашиглан Google‑оор нэвтэрнэ.
   Эхний нэвтрэлтээр `User` бичлэг үүсэх/шинэчлэгдэнэ.
2. Онбординг: Бүтээгч нэр, товч намтар, зурагтай `Creator` хуудас
   үүсгэнэ.
3. Дэмжлэг: Зочин дүн, зурвасаа оруулна; хийсвэр төлбөрийн санаачилга
   үүсэж `Payment` болгон хадгалагдана. Сэтгэгдэл нь бүтээгчийн
   профайлд нийтлэгдэнэ.
4. Нээлт: Нүүр хуудас `creatorProfile`‑той хэрэглэгчдийг болон сүүлийн
   сэтгэгдлүүдийг жагсаана.

## Архитектур

- Framework: Next.js 14 App Router, React 18, TypeScript.
- Auth: NextAuth (Google) — `app/api/auth/[...nextauth]`, `auth.ts`.
- Өгөгдөл: PostgreSQL + Prisma ORM, `lib/prisma.ts` нэг тохиолдлын
  клиент.
- API замууд: App Router‑ын `route.ts` файлууд `app/api/*` дор.
- UI: Tailwind CSS + shadcn/ui.
- Repository загвар: Асуулгын логик `app/repositories/*`,
  `lib/repositories/*` дор. Prisma үйлдлүүд зөвхөн сервер талд.

## Өгөгдлийн модель (Prisma)

- User: id, email, name, username, profileImage, timestamps
  - Харилцаа: бичсэн сэтгэгдлүүд, бүтээгчийн хувиар авсан
    сэтгэгдлүүд, заавал биш `creatorProfile` (1‑1 Creator)
- Creator: id (uuid), username (давтагдашгүй), bio, profileImage,
  userId (давтагдашгүй), payments[]
- Comment: id, content (<=500), заавал биш amount, authorId -> User,
  creatorId -> User (`CreatorComments` холбоо)
- Payment: id (uuid), amount, currency, status, paymentIntentId
  (давтагдашгүй), creatorId -> Creator, заавал биш name/message

## Гол урсгал ба бүрдлүүд

### Нүүр хуудас (`app/page.tsx`)
- `UserRepository.getCreators()` ашиглан бүтээгчдийг жагсаана
- `CommentRepository.getLatest()` ашиглан сүүлийн сэтгэгдлүүдийг
  харуулна

### Бүтээгчийн хуудас (`app/[username]/page.tsx`)
- `/api/creators/[username]` замаас профайлыг авна
- Дэмжлэгийн маягт `/api/create-payment-intent` замаар төлбөрийн
  санаачилга үүсгэнэ
- Сэтгэгдлийн хэсэг `CommentForm`, `CommentsList` бүрдлүүдийг
  ашиглана

### Онбординг (`app/@creator/page.tsx`, `app/onboarding/creator/page.tsx`)
- Бүтээгчийн хуудас байгаа эсэхээс шалтгаалж чиглүүлнэ
- `CreatorOnboardingForm` Zod‑оор шалгаж `/api/creators` руу илгээнэ

### Профайл засах (`app/[username]/edit/page.tsx`)
- `PUT /api/creators/[username]` замаар шинэчилнэ

## API тойм

### Auth
- `GET/POST /api/auth/[...nextauth]`: NextAuth handlers

### Creators
- `POST /api/creators`: идэвхтэй хэрэглэгчид Creator үүсгэнэ
- `GET /api/creators/[username]`: олон нийтэд нээлттэй профайл мэдээлэл
  (`isOwnProfile` талбартай)
- `PUT /api/creators/[username]`: эзэмшигч нь username/bio шинэчилнэ

### Comments
- `POST /api/comments`: сэтгэгдэл үүсгэнэ (нэвтэрсэн байх шаардлагатай)
- `GET /api/comments/[username]`: тухайн бүтээгчийн сэтгэгдлүүд

### Payments (хийсвэр)
- `POST /api/create-payment-intent`: хийсвэр төлбөрийн санаачилга
  үүсгэж `Payment` болгон хадгална, `clientSecret` буцаана
- `POST /api/confirm-payment`: `clientSecret`‑ээр хийсвэр баталгаажуулалт

## Аюулгүй байдал ба шалгалт

- Сэтгэгдэл үүсгэх, төлбөрийн санаачилга үүсгэхэд нэвтэрсэн байх ёстой.
- Creator үүсгэх нь зөвхөн тухайн сессийн хэрэглэгчид зөвшөөрөгдөнө;
  username давхцахгүйг шалгана.
- Шинэчлэх үед өмчлөгч эсэхийг баталгаажуулна; username давхцвал
  татгалзана.
- Онбординг маягтад Zod шалгалт; сервер талын хамгаалалт API дээр.

## Локал хөгжүүлэлт

### Шаардлага

- Node.js 20+, Yarn
- Docker (Postgres‑ийг docker‑compose‑оор ажиллуулахад)

### Орчны хувьсагчууд

- Аппд шаардлагатай (жишээ нь `docker-compose.yml`‑д):
  - AUTH_GOOGLE_ID
  - AUTH_GOOGLE_SECRET
  - AUTH_SECRET
  - DATABASE_URL (app контейнерт compose‑оор тохируулагдана; локал
    хөгжүүлэлтэд терминалдаа тохируулна)

### Docker‑оор ажиллуулах

1. yarn install
2. docker compose up --build
3. Өөр терминалд (хэрвээ контейнероос гадуур хөгжүүлж байвал):
   - export DATABASE_URL="postgresql://bmc_user:test1234@localhost:5432/bmc_db?schema=public"
   - yarn prisma migrate dev
   - yarn prisma:seed
4. Апп http://localhost:3000 дээр ажиллана

### Docker‑гүйгээр ажиллуулах

1. Postgres асааж `DATABASE_URL` тохируулна
2. yarn install
3. yarn prisma migrate dev
4. yarn prisma:seed
5. yarn dev

## Технологийн стек

- Next.js 14 (App Router), React 18, TypeScript
- NextAuth (Google), Prisma, PostgreSQL
- Tailwind CSS, shadcn/ui, Radix UI

## Төслийн бүтэц (сонгомол)

- app/
  - api/
    - auth/[...nextauth]/route.ts
    - creators/route.ts, creators/[username]/route.ts
    - comments/route.ts, comments/[username]/route.ts
    - create-payment-intent/route.ts
    - confirm-payment/route.ts
  - @creator/page.tsx
  - onboarding/creator/page.tsx
  - [username]/page.tsx, [username]/edit/page.tsx
  - page.tsx, layout.tsx
- lib/
  - prisma.ts
  - repositories/comment-repository.ts, creator-repository.ts
- app/repositories/userRepository.ts
- components/
  - comment-form.tsx, comments-list.tsx, creator-onboarding-form.tsx,
    header.tsx
- prisma/
  - schema.prisma, seed.ts

## Хөгжүүлэлтийн тэмдэглэл

- Prisma клиент нэг тохиолдол (`lib/prisma.ts`).
- Бүх Prisma үйлдэл сервер талд (API замууд, сервер компонентууд).
- Repository загвар өгөгдөлд хандах логикийг тусгаарлаж, ойлгомжтой
  болгодог.
- Төлбөрийн урсгал хийсвэр; Stripe холбохдоо `/api/create-payment-intent`,
  `/api/confirm-payment` логикийг солиод, client талд Stripe.js‑ийг
  холбоно.

## Замын зураг (git түүх ба одоогийн кодоос)

- Stripe‑ийн бүрэн интеграц (сервер + клиент)
- Бүтээгчийн самбар (аналитик, төлбөрийн тохиргоо)
- Сэтгэгдэлд реакшн, дэмжигчийн илүү баялаг түүх
- Олон хэл, хүртээмжийн сайжруулалт

## Лиценз

Sustainable Use License


