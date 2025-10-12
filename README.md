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
import { calculate, calculateGeometricVolume, calculateGasVolume, calculateGasStockChange, calculateAverageAbsolutePressure } from "./dist/index.js";

// Расчет коэффициента сжимаемости
const z = calculate({
  Tem: 300, // K
  Pres: 5,  // MPa
  arrx_k: [/* 12 чисел */]
});

// Расчет геометрического объема участка
const volume = calculateGeometricVolume({
  diameter1: 1000,      // диаметр первого участка (мм)
  length1: 5,           // длина первого участка (км)
  diameter2: 800,       // диаметр второго участка (мм)
  length2: 3,           // длина второго участка (км)
  diameter3: 600,       // диаметр третьего участка (мм)
  length3: 2,           // длина третьего участка (км)
  additionalVolume: 1.5 // дополнительный объем (тыс. м³)
});

// Расчет объема газа для удаления газовоздушной смеси
const gasVolume = calculateGasVolume({
  geometricVolume: 100, // геометрический объем участка
  numberOfPurges: 50    // количество продувок при проведении работ
});

// Расчет изменения запаса газа в участке
const stockChange = calculateGasStockChange({
  geometricVolume: 100,    // геометрический объем участка
  avgPressure1: 5,        // среднее абсолютное давление газа 1 (МПа)
  compressibility1: 0.9,  // коэффициент сжимаемости газа 1
  avgTemperature1: 300,   // средняя температура газа 1 (К)
  avgPressure2: 3,       // среднее абсолютное давление газа 2 (МПа)
  compressibility2: 0.8,  // коэффициент сжимаемости газа 2
  avgTemperature2: 280   // средняя температура газа 2 (К)
});

// Расчет среднего абсолютного давления газа
const avgPressure = calculateAverageAbsolutePressure({
  excessPressureStart: 10, // Избыточное давление в начале участка (МПа)
  atmosphericPressureMm: 745,  // Атмосферное давление (мм.рт.ст.)
  excessPressureEnd: 8   // Избыточное давление в конце участка (МПа)
});
// Расчет средней температуры газа
const averageGasTemperature = calculateAverageGasTemperature({
  excessTemperatureStar: 280, // Температура газа в начале участка (К)
	excessTemperatureEnd: 290, // Температура газа в конце участка (К)
});
```

## CLI

```bash
# Расчет коэффициента сжимаемости
node dist/index.js calculate 300 5 "0.965,0.018,0.0045,0.001,0.001,0.0005,0.0003,0.0007,0.003,0.006,0,0"

# Расчет геометрического объема участка (диаметры в мм, длины в км, дополнительный объем в тыс. м³)
node dist/index.js volume 1000 5 800 3 600 2 1.5

# Расчет объема газа для удаления газовоздушной смеси (геом_объем продувки)
node dist/index.js gas 100 50

# Расчет изменения запаса газа в участке (геом_объем давление1 сжим1 темп1 давление2 сжим2 темп2)
node dist/index.js stock 100 5 0.9 300 3 0.8 280

# Расчет среднего абсолютного давления газа
node dist/index.js pressure 10 745 8

# Расчет средней температуры газа
node dist/index.js temperature 280 290
``` 