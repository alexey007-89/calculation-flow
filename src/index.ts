import { calculate, calculateGeometricVolume, calculateGasVolume, calculateGasStockChange, calculateAverageAbsolutePressure, calculateAverageGasTemperature } from "./calculate.js";

export { calculate, calculateGeometricVolume, calculateGasVolume, calculateGasStockChange, calculateAverageAbsolutePressure, calculateAverageGasTemperature } from "./calculate.js";

// CLI usage: 
// node dist/index.js calculate 300 5 "x1,x2,...,x12"
// node dist/index.js volume d1_mm L1_km d2_mm L2_km d3_mm L3_km additional
// node dist/index.js gas geometricVolume numberOfPurges
// node dist/index.js stock geometricVolume avgPressure1 compressibility1 avgTemperature1 avgPressure2 compressibility2 avgTemperature2
// node dist/index.js pressure excessStart_MPa atmospheric_mmHg excessEnd_MPa
// node dist/index.js temperature excessTemperatureStar_K excessTemperatureEnd_K
const isMain = process.argv[1] && /index\.(c|m)?js$/.test(process.argv[1]);
if (isMain) {
	const [command] = process.argv.slice(2);
	
	if (command === "calculate") {
		const [TemStr, PresStr, compStr] = process.argv.slice(3);
		if (!TemStr || !PresStr || !compStr) {
			console.log("Usage: node dist/index.js calculate <Tem> <Pres> <comma-separated 12 numbers>");
			process.exit(1);
		}
		const Tem = Number(TemStr);
		const Pres = Number(PresStr);
		const arrx_k = compStr.split(",").map(Number);
		const result = calculate({ Tem, Pres, arrx_k });
		console.log("=== РАСЧЕТ КОЭФФИЦИЕНТА СЖИМАЕМОСТИ ===");
		console.log(`Температура: ${Tem} K`);
		console.log(`Давление: ${Pres} МПа`);
		console.log(`Состав: [${arrx_k.join(", ")}]`);
		console.log(`Результат: ${result}`);
	} else if (command === "volume") {
		const [diameter1, length1, diameter2, length2, diameter3, length3, additionalVolume] = process.argv.slice(3).map(Number);
		if (process.argv.length < 10) {
			console.log("Usage: node dist/index.js volume <diameter1_mm> <length1_km> <diameter2_mm> <length2_km> <diameter3_mm> <length3_km> <additionalVolume_thousand_m3>");
			process.exit(1);
		}
		const result = calculateGeometricVolume({ 
			diameter1, length1, 
			diameter2, length2, 
			diameter3, length3, 
			additionalVolume 
		});
		console.log("=== РАСЧЕТ ГЕОМЕТРИЧЕСКОГО ОБЪЕМА УЧАСТКА ===");
		console.log(`Участок 1: диаметр ${diameter1} мм, длина ${length1} км`);
		console.log(`Участок 2: диаметр ${diameter2} мм, длина ${length2} км`);
		console.log(`Участок 3: диаметр ${diameter3} мм, длина ${length3} км`);
		console.log(`Дополнительный объем: ${additionalVolume} тыс. м³`);
		console.log(`Результат: ${result}`);
	} else if (command === "gas") {
		const [geometricVolume, numberOfPurges] = process.argv.slice(3).map(Number);
		if (process.argv.length < 5) {
			console.log("Usage: node dist/index.js gas <geometricVolume> <numberOfPurges>");
			process.exit(1);
		}
		const result = calculateGasVolume({ geometricVolume, numberOfPurges });
		console.log("=== РАСЧЕТ ОБЪЕМА ГАЗА ДЛЯ УДАЛЕНИЯ ГАЗОВОЗДУШНОЙ СМЕСИ ===");
		console.log(`Геометрический объем участка: ${geometricVolume}`);
		console.log(`Количество продувок: ${numberOfPurges}`);
		console.log(`Результат: ${result}`);
	} else if (command === "stock") {
		const [geometricVolume, avgPressure1, compressibility1, avgTemperature1, avgPressure2, compressibility2, avgTemperature2] = process.argv.slice(3).map(Number);
		if (process.argv.length < 10) {
			console.log("Usage: node dist/index.js stock <geometricVolume> <avgPressure1> <compressibility1> <avgTemperature1> <avgPressure2> <compressibility2> <avgTemperature2>");
			process.exit(1);
		}
		const result = calculateGasStockChange({ 
			geometricVolume, avgPressure1, compressibility1, avgTemperature1, 
			avgPressure2, compressibility2, avgTemperature2 
		});
		console.log("=== РАСЧЕТ ИЗМЕНЕНИЯ ЗАПАСА ГАЗА В УЧАСТКЕ ===");
		console.log(`Геометрический объем участка: ${geometricVolume}`);
		console.log(`Газ 1 - давление: ${avgPressure1} МПа, сжимаемость: ${compressibility1}, температура: ${avgTemperature1} К`);
		console.log(`Газ 2 - давление: ${avgPressure2} МПа, сжимаемость: ${compressibility2}, температура: ${avgTemperature2} К`);
		console.log(`Результат: ${result}`);
	} else if (command === "temperature") {
		const [excessTemperatureStar, excessTemperatureEnd] = process.argv.slice(3).map(Number);
		if (process.argv.length < 5) {
			console.log("Usage: node dist/index.js temperature <excessTemperatureStar_K> <excessTemperatureEnd_K>");
			process.exit(1);
		}
		const result = calculateAverageGasTemperature({ excessTemperatureStar, excessTemperatureEnd });
		console.log("=== РАСЧЕТ СРЕДНЕЙ ТЕМПЕРАТУРЫ ГАЗА ===");
		console.log(`Температура газа в начале участка (К): ${excessTemperatureStar}`);
		console.log(`Температура газа в конце участка (К): ${excessTemperatureEnd}`);
		console.log(`Результат: ${result}`);
	} else if (command === "pressure") {
		const [excessPressureStart, atmosphericPressureMm, excessPressureEnd] = process.argv.slice(3).map(Number);
		if (process.argv.length < 6) {
			console.log("Usage: node dist/index.js pressure <excessPressureStart_MPa> <atmosphericPressure_mmHg> <excessPressureEnd_MPa>");
			process.exit(1);
		}
		const result = calculateAverageAbsolutePressure({ excessPressureStart, atmosphericPressureMm, excessPressureEnd });
		console.log("=== РАСЧЕТ СРЕДНЕГО АБСОЛЮТНОГО ДАВЛЕНИЯ ГАЗА ===");
		console.log(`Избыточное давление в начале участка (МПа): ${excessPressureStart}`);
		console.log(`Атмосферное давление (мм.рт.ст.): ${atmosphericPressureMm}`);
		console.log(`Избыточное давление в конце участка (МПа): ${excessPressureEnd}`);
		console.log(`Результат: ${result}`);

	} else {
		console.log("=== CALCULATION-FLOW ===");
		console.log("Доступные команды:");
		console.log("  calculate - Расчет коэффициента сжимаемости");
		console.log("  volume    - Расчет геометрического объема участка");
		console.log("  gas       - Расчет объема газа для удаления газовоздушной смеси");
		console.log("  stock     - Расчет изменения запаса газа в участке");
		console.log("  pressure  - Расчет среднего абсолютного давления газа");
		console.log("");
		console.log("Примеры использования:");
		console.log("  node dist/index.js calculate 300 5 \"0.965,0.018,0.0045,0.001,0.001,0.0005,0.0003,0.0007,0.003,0.006,0,0\"");
		console.log("  node dist/index.js volume 1000 0.001 800 0.002 600 0.001 1.5  # дополнительный объем в тыс. м³");
		console.log("  node dist/index.js gas 100 50  # геом_объем=100, продувки=50");
		console.log("  node dist/index.js stock 100 5 0.9 300 3 0.8 280  # геом_объем давление1 сжим1 темп1 давление2 сжим2 темп2");
		console.log("  node dist/index.js pressure 10 745 8  # excessStart_MPa atmospheric_mmHg excessEnd_MPa");
		console.log("  node dist/index.js temperature 280 290  # excessTemperatureStar_K excessTemperatureEnd_K");
		process.exit(1);
	}
}
