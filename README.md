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
bun start -- --port 4201
```

Navega a `http://localhost:4201/`. La aplicación se recarga automáticamente al modificar archivos.

> El puerto 4200 está ocupado, por eso usamos `--port 4201`.

---

## Build

```bash
bun run build
```

Los artefactos de build se generan en `dist/`. El build de producción optimiza la aplicación para velocidad y rendimiento.

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
├── styles.scss
└── app/
    ├── app.ts
    ├── app.html
    ├── app.scss
    ├── app.config.ts
    ├── app.routes.ts
    ├── core/          # Modelos, servicios HTTP, configuración
    ├── features/      # rates/, calculator/
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
