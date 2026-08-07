# AGENTS.md — Contexto para asistentes IA

## Proyecto

**Velocambio** — Aplicación web para consultar tasas de cambio y convertir divisas (USD, EUR, USDT) a Bolívares (VES) en Venezuela.

Obtiene cotizaciones en tiempo real desde el backend ([velocambio-back](https://github.com/anomalyco/velocambio-back)) que consulta DolarAPI (USD oficial, USD paralelo, EUR oficial) y Binance P2P (USDT/VES).

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | Angular 20 |
| Lenguaje | TypeScript 5.9 |
| Build | `@angular/build` (Vite/esbuild) |
| Estilos | SCSS |
| Change detection | Zoneless (`provideZonelessChangeDetection`) |
| Bootstrap | Standalone (`bootstrapApplication`) |
| Testing | Karma + Jasmine |
| Package manager | bun |

---

## Estructura del proyecto

```
velocambio-front/
├── public/                    # Activos estáticos (sitemap.xml, robots.txt, ads.txt)
├── src/
│   ├── index.html             # Entry point HTML (JSON-LD estático inline)
│   ├── main.ts                # bootstrapApplication (cliente)
│   ├── main.server.ts         # bootstrap SSR/SSG
│   ├── server.ts              # Dev SSR (Express)
│   ├── styles.scss            # Estilos globales
│   └── app/
│       ├── app.ts             # Componente raíz
│       ├── app.html           # Template raíz
│       ├── app.scss           # Estilos raíz
│       ├── app.config.ts      # Configuración de providers (cliente)
│       ├── app.config.server.ts  # Providers del servidor (SSR/SSG)
│       ├── app.routes.ts      # Definición de rutas
│       ├── app.routes.server.ts  # Rutas a prerender (SSG)
│       ├── app.spec.ts        # Test del componente raíz
│       ├── core/              # Capa core (singletons, servicios globales)
│       │   ├── models/        # Interfaces y tipos
│       │   ├── services/      # HTTP + SeoService
│       │   ├── http/          # Cliente HTTP base, interceptors
│       │   └── config/        # Constantes, environment, ADS_ZONES
│       ├── features/          # Módulos por funcionalidad
│       │   ├── rates/         # Home: tasas + calculadora + contenido SEO
│       │   │   ├── pages/     # Páginas completas
│       │   │   ├── components/# Componentes de la feature
│       │   │   └── services/  # Servicios específicos
│       │   ├── articles/      # Blog (lista y artículo)
│       │   ├── terms/         # Términos y condiciones
│       │   └── privacy-policy # Política de privacidad
│       └── shared/            # Componentes reutilizables
│           ├── components/    # Cards, nav, footer, ad-banner, bcv-disclaimer
│           ├── pipes/         # Pipes personalizados
│           └── directives/    # Directivas personalizadas
├── angular.json               # outputMode: "static" (SSG)
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── AGENTS.md
└── README.md
```

---

## Arquitectura limpia

```
┌─────────────────────────────────────────────┐
│                   UI Layer                  │
│  Pages → Components (smart)                 │
│  ┌───────────────────────────────────────┐  │
│  │           Shared Components           │  │
│  │  (dumb): Cards, Buttons, Inputs       │  │
│  └───────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│              Service Layer                  │
│  ┌───────────────────────────────────────┐  │
│  │  Feature Services (orquestan lógica)  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │  Http Services (llamadas API)         │  │
│  └───────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│               Data Layer                    │
│  ┌───────────────────────────────────────┐  │
│  │  Models / Interfaces (DTOs)           │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Principios
- **Standalone components** — sin NgModules
- **Lazy loading** — features cargadas bajo demanda con `loadComponent`
- **Smart vs Dumb components** — pages con lógica, shared sin dependencias externas
- **Servicios con inyección de dependencias** — separación de responsabilidades
- **Señales (signals)** — preferir signals sobre observables para estado local
- **Zoneless** — no depender de NgZone; usar signals y `ChangeDetectionStrategy.OnPush`

---

## Convenciones de código

### Naming
- **Archivos**: `kebab-case` — `exchange-rate-card.component.ts`
- **Clases**: `PascalCase` — `ExchangeRateCardComponent`
- **Métodos/Funciones**: `camelCase` — `getExchangeRates()`
- **Propiedades**: `camelCase` — `exchangeRates`
- **Señales**: `signal` sufijo opcional — `ratesSignal`, `isLoading`
- **Inputs/Outputs**: sin prefijo — `@Input({ required: true }) rate!: RateModel`

### Imports
Orden: Angular → librerías externas → locales (separados por línea en blanco)

```typescript
import { Component, signal, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { RateService } from '../../services/rate.service';
import { RateModel } from '../../models/rate.model';
```

### Comentarios
- `//*` para notas importantes
- `//?` para preguntas o secciones
- `//!` para advertencias
- `//` para comentarios estándar

### RxJS y Signals
- Usar **signals** para estado de componente y UI
- Usar **observables** solo para flujos de eventos (HTTP, eventos del usuario)
- Convertir observable a signal con `toSignal()` cuando sea necesario
- Gestionar suscripciones con `takeUntilDestroyed()` o `AsyncPipe`

### TypeScript
- **strict mode** habilitado
- Tipado explícito en firmas de métodos públicos
- `noImplicitOverride` — usar `override` en métodos sobrescritos
- Preferir `readonly` en props que no mutan
- `as const` para constantes y enums literales

---

## Diseño UX/UI (basado en app Flutter)

### Sistema de diseño

| Token | Valor | Uso |
|---|---|---|
| `--bg-primary` | `#181B20` | Fondo principal |
| `--bg-surface` | `#1E2126` | Superficies (cards) |
| `--accent` | `#10B981` | Color primario (acento verde) |
| `--text-primary` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `rgba(255,255,255,0.7)` | Texto secundario |
| `--border-subtle` | `rgba(16,185,129,0.2)` | Bordes de cards |

### Componentes clave (desde Flutter)

1. **ExchangeRateCard** — Card seleccionable que muestra:
   - Bandera del país
   - Nombre de la tasa (BCV Oficial, Promedio, Euro, USDT P2P)
   - Valor en VES
   - Estado seleccionado (borde verde + glow)
   - Diferencia porcentual

2. **Calculator** — Calculadora de conversión:
   - Input de monto con teclado numérico
   - Selector de moneda origen/destino
   - Botón para invertir monedas
   - Total calculado en tiempo real
   - Botón copiar al portapapeles

3. **CustomRateModal** — Bottom sheet para agregar tasa personalizada

### Paleta de colores (SCSS custom properties)
```scss
:root {
  --bg-primary: #181B20;
  --bg-surface: #1E2126;
  --accent: #10B981;
  --accent-dim: rgba(16, 185, 129, 0.05);
  --accent-border: rgba(16, 185, 129, 0.2);
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.45);
  --error: #EF4444;
  --radius-sm: 10px;
  --radius-md: 15px;
  --radius-lg: 20px;
}
```

### Tipografía
- Fuente principal: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Pesos: normal (400), semibold (600), bold (700)

---

## API Backend

El backend expone los siguientes endpoints en `http://localhost:9000`:

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/rates/usd_oficial` | Tasa USD oficial (BCV) |
| `GET` | `/rates/usd_promedio` | Tasa USD paralelo (promedio mercado) |
| `GET` | `/rates/eur` | Tasa EUR oficial |
| `GET` | `/rates/usdt` | Tasa USDT P2P (Binance) |
| `GET` | `/rates/today` | Todas las tasas de las últimas 24h |
| `GET` | `/rates/ping` | Healthcheck |

### Modelo de datos (respuesta)

```typescript
export interface RateResponse {
  id: number;
  currency_from: string;    // 'USD', 'EUR', 'USDT'
  currency_to: string;      // 'VES'
  price: number;
  rate_buy: number | null;
  rate_sell: number | null;
  source_type: string;      // 'oficial', 'promedio', 'p2p'
  fetched_at: string;       // ISO 8601
  created_at: string;
}
```

---

## Commands

```bash
# Iniciar servidor de desarrollo (puerto 4201 porque 4200 está ocupado)
bun start -- --port 4201
# o
ng serve --port 4201

# Build producción (SSG): genera HTML prerendered en dist/velocambio-front/browser/
ng build

# Tests unitarios
ng test

# Generar componente
ng generate component features/rates/components/exchange-rate-card

# Generar servicio
ng generate service core/services/rate
```

---

## Reglas al modificar código

1. **No romper** la estructura de carpetas existente
2. **No exponer** secretos ni credenciales (variables de entorno)
3. **No agregar archivos** innecesarios
4. **Seguir** el patrón de componentes standalone
5. **Usar signals** para estado local, RxJS solo para streams
6. **Mantener** tipado estricto
7. **Preferir** `input()` y `output()` sobre `@Input()`/`@Output()` decorators
8. **Siempre** correr `ng test` antes de commits
9. **La app es zoneless** — no inyectar `NgZone` ni usar `NgZone.run()`
10. **Prerender-safe** — al tocar APIs del navegador (`document`, `window`, `localStorage`), protegerlas con `isPlatformServer` o `afterNextRender`: el prerender corre en Node. Inyectar `DOCUMENT` de `@angular/common` en vez de `document` global
11. **Al añadir rutas/páginas** — registrarlas en `app.routes.server.ts` (`RenderMode.Prerender`) para que se genere su HTML estático y agregar la URL a `public/sitemap.xml`
12. **SEO on-page** — cada página debe mantener `<title>` ≤60 caracteres, un solo H1 visible y contenido real (el prerender NO incluye datos en vivo de tasas)
