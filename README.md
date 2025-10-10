# calculation-flow (TypeScript)

Порт логики `Calculate` из VBA в TypeScript.

## Установка

```bash
npm install
```

## Сборка

```bash
npm run build
```

## Использование в коде

```ts
import { calculate } from "./dist/index.js";

const z = calculate({
  Tem: 300, // K
  Pres: 5,  // MPa
  arrx_k: [/* 12 чисел */]
});
```

## CLI

```bash
node dist/index.js 300 5 "0.965,0.018,0.0045,0.001,0.001,0.0005,0.0003,0.0007,0.003,0.006,0,0"
``` 