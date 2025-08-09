# AImage

AImage er en AI-drevet bildegenereringsapplikasjon som lar brukere skape unike visuelle kunstverk ved hjelp av tekstbeskrivelser. Applikasjonen tilbyr intuitiv bildegenerering, brukerautentisering, og mulighet til å lagre og organisere favorittbilder.

## Funksjonalitet

-   **AI-bildegenerering**: Skap unike bilder basert på tekstbeskrivelser med avansert AI-teknologi
-   **Brukerautentisering**: Sikker innlogging og registrering med JWT-tokens
-   **Profilbilder**: Sett genererte bilder som profilbilde med øyeblikkelig oppdatering
-   **Likte bilder**: Lagre og organisere favorittbilder i en personlig galleri
-   **Responsivt design**: Optimalisert for alle enheter med moderne UI/UX
-   **Global tilstandshåndtering**: Sømløs brukeropplevelse med Zustand state management

## Hovedfunksjoner

### 🎨 AI-bildegenerering

-   Tekst-til-bilde konvertering med avansert AI
-   Eksempelprompter for enkel start
-   Sanntids bildegenerering

### 👤 Brukerprofil og autentisering

-   Sikker registrering og innlogging
-   JWT-basert autentisering
-   Profilbildehåndtering med real-time oppdatering
-   Personlig brukerdashboard

### ❤️ Likte bilder

-   Lagre favorittbilder for senere visning
-   Personlig galleri med alle likte bilder
-   Enkel navigasjon og organisering
-   Responsivt grid-layout

### 🎯 Profilbildefunksjonalitet

-   Sett genererte bilder som profilbilde
-   Sikker lagring i backend
-   Modal-visning av profilbilder

## Teknologier brukt

-   **Frontend**: Next.js 14 (TypeScript), Tailwind CSS
-   **Backend**: Spring Boot (Kotlin), JPA/Hibernate
-   **Database**: PostgreSQL (NeonDB)
-   **Autentisering**: JWT (JSON Web Tokens)
-   **State Management**: Zustand
-   **UI-komponenter**: shadcn/ui komponenter
-   **Styling**: Tailwind CSS med custom gradients og animasjoner

## API-integrasjoner

-   **Pollinations.ai**: [pollinations.ai](https://pollinations.ai/) - AI-bildegenerering med Flux-modell
-   **Spring Boot Backend**: RESTful API for brukerdata og autentisering
-   **JWT Authentication**: Sikker brukerautentisering og sesjonshåndtering

## Navigasjon

-   **Hjem**: `/` - Hovedside med bildegenerering
-   **Innlogging**: `/login` - Brukerautentisering
-   **Likte bilder**: `/liked-images` - Personlig galleri med favoritter

## Prosjektstruktur

```
AImage/
├── backend/                 # Spring Boot backend
│   ├── src/main/kotlin/
│   │   └── com/luctra/aimage_backend/
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Data models
│   │       ├── repository/  # Database repositories
│   │       ├── service/     # Business logic
│   │       └── security/    # JWT authentication
│   └── build.gradle.kts     # Gradle build configuration
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and stores
│   │   └── ui/            # shadcn/ui components
│   └── package.json       # Node.js dependencies
└── README.md              # Prosjektdokumentasjon
```

## Deployment

### 🌐 Frontend - Vercel

**URL**: [https://a-image-ruby.vercel.app](https://a-image-ruby.vercel.app)

**Teknologi**: Next.js 14 med TypeScript

**Deployment Prosess**:
1. Koble GitHub repository til Vercel
2. Konfigurer build-innstillinger for Next.js
3. Sett miljøvariabler:
   - `NEXT_PUBLIC_API_URL`: Backend API URL
4. Automatiske deployments ved push til main branch

### 🔧 Backend - Render

**Teknologi**: Spring Boot (Kotlin) med Docker

**Deployment Prosess**:
1. Koble GitHub repository til Render
2. Konfigurer som Web Service med Docker-miljø
3. Sett miljøvariabler:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DATABASE_URL`: NeonDB tilkoblingsstreng
   - `JWT_SECRET`: Sikker JWT-signering
   - `PORT`: `8080` (Render vil overskrive)



### 🗄️ Database - NeonDB

**Teknologi**: PostgreSQL

**Tilkobling**: JDBC-format for Spring Boot integrasjon

## Funksjoner i detalj

### Bildegenerering

-   Skriv en beskrivelse av bildet du ønsker
-   Velg fra eksempelprompter for rask start
-   Klikk "Generate Image" for å skape bildet
-   Vent på AI-generering med visuell feedback
-   Se resultatet og bruk handlingsknapper

### Brukerautentisering

-   Registrer ny konto med navn, e-post og passord
-   Logg inn med eksisterende konto
-   Sikker sesjonshåndtering med JWT
-   Automatisk omdirigering basert på autentiseringsstatus

### Likte bilder

-   Klikk "Like" på genererte bilder
-   Besøk "/liked-images" for å se alle favoritter
-   Bruk handlingsknapper på lagrede bilder

### Profilbildehåndtering

-   Klikk "Set as Profile Picture" på genererte bilder
-   Øyeblikkelig oppdatering i hele applikasjonen
-   Modal-visning av profilbilder
