# Velocambio

Aplicación web para consultar tasas de cambio y convertir divisas en Venezuela. Muestra cotizaciones del **USD oficial (BCV)**, **USD promedio del mercado**, **EUR oficial** y **USDT P2P (Binance)**, con una calculadora integrada para conversiones rápidas.

---

## Features

- Visualización de tasas de cambio en tiempo real (USD, EUR, USDT)
- Calculadora de conversión entre divisas (USD/VES, EUR/VES, USDT/VES)
- Selección de tasa de cambio preferida
- Tasa de cambio personalizada
- Copia de resultados al portapapeles
- Diseño oscuro moderno inspirado en la app móvil

---

## Stack

| Tecnología | Versión |
|---|---|
| Angular | 20 |
| TypeScript | 5.9 |
| SCSS | — |
| Karma + Jasmine | Testing |

---

## Requisitos

- Node.js 22+
- bun (o npm)
- Angular CLI 20 (`npm install -g @angular/cli`)

---

## Instalación

```bash
git clone <repo-url>
cd velocambio-front

bun install
```

---

## Servidor de desarrollo

```bash
bun start
```

Navega a `http://localhost:4201/`. La aplicación se recarga automáticamente al modificar archivos.

> El puerto 4200 está ocupado, por eso el script `start` usa `--port 4201`.

---

## Ambientes

La app usa dos configuraciones de entorno en `src/environments/`:

| Archivo | Uso | API base |
|---|---|---|
| `environment.ts` | Desarrollo | `http://localhost:9000` |
| `environment.prod.ts` | Producción | `https://velocambio-back.onrender.com` |

El reemplazo se hace con `fileReplacements` en la configuración `production` de `angular.json`.

| Comando | Ambiente | API base |
|---|---|---|
| `bun start` | Dev | `http://localhost:9000` |
| `bun run start:prod` | Prod (servidor local) | `https://velocambio-back.onrender.com` |
| `bun run build` | Prod (default) | `https://velocambio-back.onrender.com` |
| `bun run build:dev` | Dev | `http://localhost:9000` |

---

## Build

```bash
bun run build
```

Los artefactos de build se generan en `dist/`. El build de producción optimiza la aplicación para velocidad y rendimiento.

---

## SEO y prerendering (SSG)

El sitio se despliega como **sitio estático prerendered** (SSG) con `@angular/ssr`:

- `angular.json` usa `"outputMode": "static"`: `ng build` genera HTML estático real para cada ruta en `dist/velocambio-front/browser/`, sin servidor Node.
- Las rutas prerendered se definen en `src/app/app.routes.server.ts` (`RenderMode.Prerender`). Las rutas dinámicas `/blog/:slug` usan `getPrerenderParams` desde `ARTICLES`.
- Cada página prerendered incluye su `<title>` (≤60 caracteres), meta description y canonical correctos, porque `SeoService` corre durante el prerender.
- El JSON-LD (WebSite + WebApplication) es un `<script type="application/ld+json">` estático en `index.html`; los artículos añaden su schema `Article` vía `SeoService`.
- Los datos en vivo (tasas) **no** van en el HTML estático: se cargan por JS al hidratar la página. El fetch de tasas y los banners están desactivados durante el prerender (`isPlatformServer`).
- Vercel sirve `dist/velocambio-front/browser`; las rutas no prerendered (y el redirect de `/calculator`) caen al rewrite de `index.html` (CSR).

### Al agregar rutas o artículos nuevos

1. Añade la ruta en `app.routes.ts`.
2. Añádela a `serverRoutes` en `app.routes.server.ts` (con `getPrerenderParams` si tiene parámetros) para que se genere su HTML estático.
3. Agrega la URL a `public/sitemap.xml`.

---

## Tests

```bash
bun test
```

Ejecuta tests unitarios con Karma + Jasmine.

---

## Backend

Esta app consume la API REST de [velocambio-back](https://github.com/anomalyco/velocambio-back) en `http://localhost:9000`.

---

## Estructura del proyecto

```
src/
├── index.html
├── main.ts
├── main.server.ts          # Bootstrap SSR/SSG
├── server.ts               # Dev SSR (Express)
├── styles.scss
└── app/
    ├── app.ts
    ├── app.html
    ├── app.scss
    ├── app.config.ts
    ├── app.config.server.ts # Providers del servidor
    ├── app.routes.ts
    ├── app.routes.server.ts # Rutas a prerender (SSG)
    ├── core/          # Modelos, servicios HTTP, configuración
    ├── features/      # rates/, articles/, terms/, privacy-policy/
    └── shared/        # Componentes reutilizables
```

---

## Diseño

El diseño visual está basado en la app móvil de Velocambio (Flutter):
- **Tema oscuro** con fondo `#181B20`
- **Acento verde** `#10B981`
- Cards de tasas seleccionables con bordes y glow
- Calculadora de conversión integrada
- Tipografía: Inter / Space Grotesk

---

## Licencia

MIT
