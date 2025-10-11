export type Composition = readonly number[]; // length 12

export interface CalculateParams {
	Tem: number; // temperature (K)
	Pres: number; // pressure (MPa)
	arrx_k: Composition; // 12-length composition
}

export function calculate({ Tem, Pres, arrx_k }: CalculateParams): number {
  if (arrx_k.length !== 12) {
		throw new Error("arrx_k must be length 12");
	}

	let Q = 0;
	let F = 0;
	let V = 0;
	let G = 0;
	let Kx = 0;
	let p0m = 0;
	let b = 0;
	let p = 0;
	let A0 = 0;
	let A1 = 0;
	let Db = 0;
	let pr = 0;

  const arrQ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.69, 0, 0];
  const arrF = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  const arrE = [151.3183, 244.1667, 298.1183, 337.6389, 324.0689, 370.6823, 365.5999, 402.636293, 99.73778, 241.9606, 2.610111, 26.95794];
  const arrG = [0, 0.0793, 0.141239, 0.281835, 0.256692, 0.366911, 0.332267, 0.289731, 0.027815, 0.189065, 0, 0.034369];
  const arrK = [0.4619255, 0.5279209, 0.583749, 0.6341423, 0.6406937, 0.6798307, 0.6738577, 0.7175118, 0.4479153, 0.4557489, 0.3589888, 0.3514916];

	const matrGij: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.807653, 1, 1.95731],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.370296, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.982746, 1, 1],
    [0.807653, 0.370296, 1, 1, 1, 1, 1, 1, 0.982746, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.95731, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

	const matrEij: number[][] = [
    [1, 1, 0.994635, 0.989844, 1.01953, 0.999268, 1.00235, 1.107274, 0.97164, 0.960644, 1, 1.17052],
    [1, 1, 1.02256, 1.01306, 1, 1.00532, 1, 1, 0.97012, 0.925053, 1, 1.16446],
    [0.994635, 1.02256, 1, 1.0049, 1, 1, 1, 1, 0.945939, 0.960237, 1, 1.034787],
    [0.989844, 1.01306, 1.0049, 1, 1, 1, 1, 1, 0.973384, 0.897362, 1, 1.3],
    [1.01953, 1, 1, 1, 1, 1, 1, 1, 0.946914, 0.906849, 1, 1.3],
    [0.999268, 1.00532, 1, 1, 1, 1, 1, 1, 0.94552, 0.859764, 1, 1],
    [1.00235, 1, 1, 1, 1, 1, 1, 1, 0.95934, 0.726255, 1, 1],
    [1.107274, 1, 1, 1, 1, 1, 1, 1, 1, 0.855134, 1, 1],
    [0.97164, 0.97012, 0.945939, 0.973384, 0.946914, 0.94552, 0.95934, 1, 1, 1.02274, 1, 1.08632],
    [0.960644, 0.925053, 0.960237, 0.897362, 0.906849, 0.859764, 0.726255, 0.855134, 1.02274, 1, 1, 1.28179],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.17052, 1.16446, 1.034787, 1.3, 1.3, 1, 1, 1, 1.08632, 1.28179, 1, 1],
  ];

	const matrKij: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1.007619, 0.986893, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0.997596, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1.002529, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0.982962, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1.00363, 1.00796, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0.995933, 1.00851, 1, 1, 1, 1, 1, 0.910183, 0.982361, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1.02326, 1.02034, 1, 1, 1, 1, 1, 1, 1.03227, 1, 1, 0],
  ];

	const matrVij: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0.990877, 1.065173, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0.992291, 1.25, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1.25, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1.00367, 1.25, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1.25, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1.302576, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0.886106, 0.816431, 0.915502, 0.993556, 1, 1, 1, 1, 0, 0, 0, 0],
    [0.963827, 0.96987, 1, 1, 1, 1, 1, 1.066638, 0.835058, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1.15639, 1.61666, 1, 1, 1, 1, 1, 1, 0.408838, 1, 1, 0],
  ];

	const size12 = 12;
	const arrGij = Array.from({ length: size12 }, () => Array<number>(size12).fill(0));
	const arrEij = Array.from({ length: size12 }, () => Array<number>(size12).fill(0));

  for (let i = 0; i <= 11; i++) {
		Q += arrx_k[i] * arrQ[i];
		F += (arrx_k[i] * arrx_k[i]) * arrF[i];
		V += arrx_k[i] * Math.pow(arrE[i], 2.5);
		G += arrx_k[i] * arrG[i];
		Kx += arrx_k[i] * Math.pow(arrK[i], 2.5);

    for (let j = 0; j <= 11; j++) {
			arrGij[i][j] = matrGij[i][j] * (arrG[i] + arrG[j]) / 2;
			arrEij[i][j] = matrEij[i][j] * Math.pow(arrE[i] * arrE[j], 0.5);
		}
	}

	V = Math.pow(V, 2);
	Kx = Math.pow(Kx, 2);

  for (let i = 0; i <= 10; i++) {
    for (let j = i + 1; j <= 11; j++) {
			Kx = Kx + 2 * (arrx_k[i] * arrx_k[j] * (Math.pow(matrKij[j][i], 5) - 1) * Math.pow(arrK[j] * arrK[i], 2.5));
			V = V + 2 * (arrx_k[j] * arrx_k[i] * (Math.pow(matrVij[j][i], 5) - 1) * Math.pow(arrE[j] * arrE[i], 2.5));
			G = G + arrx_k[i] * arrx_k[j] * (matrGij[j][i] - 1) * (arrG[j] + arrG[i]);
		}
	}

	Kx = Math.pow(Kx, 0.2);
	V = Math.pow(V, 0.2);

	p0m = 0.001 * 8.31451 * 1 / Math.pow(Kx, 3);
	b = 1000 * Pres * Math.pow(Kx, 3) / (8.31451 * Tem);
	p = Pres / p0m;

	const arrgn = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
	const arrqn = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1];
	const arrfn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const arrS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const arrsn = [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const arrW = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const arrwn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const arrun = [0, 0.5, 1, 3.5, -0.5, 4.5, 0.5, 7.5, 9.5, 6, 12, 12.5, -6, 2, 3, 2, 2, 11, -0.5, 0.5, 0, 4, 6, 21, 23, 22, -1, -0.5, 7, -1, 6, 4, 1, 9, -13, 21, 8, -0.5, 0, 2, 7, 9, 22, 23, 1, 9, 3, 8, 23, 1.5, 5, -0.5, 4, 7, 3, 0, 1, 0];

	const arrBrn = new Array<number>(58).fill(0);
	const arrCrn = new Array<number>(58).fill(0);
	const arrDrn = new Array<number>(58).fill(0);
	const arrUrn = new Array<number>(58).fill(0);
	const arrA0 = new Array<number>(58).fill(0);
	const arrA1 = new Array<number>(58).fill(0);

	const arran = [0.1538326, 1.341953, -2.998583, -0.04831228, 0.3757965, -1.589575, -0.05358847, 0.88659463, -0.71023704, -1.471722, 1.32185035, -0.78665925, 0.00000000229129, 0.1576724, -0.4363864, -0.04408159, -0.003433888, 0.03205905, 0.02487355, 0.07332279, -0.001600573, 0.6424706, -0.4162601, -0.06689957, 0.2791795, -0.6966051, -0.002860589, -0.008098836, 3.150547, 0.007224479, -0.7057529, 0.5349792, -0.07931491, -1.418465, -5.99905e-17, 0.1058402, 0.03431729, -0.007022847, 0.02495587, 0.04296818, 0.7465453, -0.2919613, 7.294616, -9.936757, -0.005399808, -0.2432567, 0.04987016, 0.003733797, 1.874951, 0.002168144, -0.6587164, 0.000205518, 0.009776195, -0.02048708, 0.01557322, 0.006862415, -0.001226752, 0.002850908];
	const arrbn = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9];
	const arrcn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1];
	const arrkn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 4, 4, 0, 0, 2, 2, 2, 4, 4, 4, 4, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 0, 0, 2, 2, 2, 4, 4, 0, 2, 2, 4, 4, 0, 2, 0, 2, 1, 2, 2, 2, 2];

  for (let i1 = 0; i1 <= 57; i1++) {
		arrBrn[i1] = 0;
    for (let i = 0; i <= 11; i++) {
      for (let j = 0; j <= 11; j++) {
				const Brnij = Math.pow(arrGij[i][j] + 1 - arrgn[i1], arrgn[i1])
					* Math.pow(arrQ[i] * arrQ[j] + 1 - arrqn[i1], arrqn[i1])
					* Math.pow(Math.pow(arrF[i] * arrF[j], 0.5) + 1 - arrfn[i1], arrfn[i1])
					* Math.pow(arrS[i] * arrS[j] + 1 - arrsn[i1], arrsn[i1])
					* Math.pow(arrW[i] * arrW[j] + 1 - arrwn[i1], arrwn[i1]);
				arrBrn[i1] += arrx_k[i] * arrx_k[j] * Brnij * Math.pow(arrEij[i][j], arrun[i1]) * Math.pow(arrK[i] * arrK[j], 1.5);
			}
		}
		arrCrn[i1] = Math.pow(G + 1 - arrgn[i1], arrgn[i1])
			* Math.pow(Q * Q + 1 - arrqn[i1], arrqn[i1])
			* Math.pow(F + 1 - arrfn[i1], arrfn[i1])
			* Math.pow(V, arrun[i1]);
    if (i1 >= 0 && i1 < 12) {
			arrDrn[i1] = arrBrn[i1] / Math.pow(Kx, 3);
			arrUrn[i1] = 0;
    } else if (i1 >= 12 && i1 < 18) {
			arrDrn[i1] = arrBrn[i1] / Math.pow(Kx, 3) - arrCrn[i1];
      arrUrn[i1] = arrCrn[i1];
		} else if (i1 >= 18 && i1 <= 57) {
			arrDrn[i1] = 0;
      arrUrn[i1] = arrCrn[i1];
    }
  }

	// Newton-like iteration
	let iterations = 0;
	while (Math.abs((pr - p) / p) >= 1e-14) {
		A0 = 0;
		A1 = 0;
		b = b + Db;
    for (let i1 = 0; i1 <= 57; i1++) {
			const termA0 = arran[i1] * Math.pow(b, arrbn[i1]) * Math.pow(Tem, -arrun[i1])
				* (arrbn[i1] * arrDrn[i1] + (arrbn[i1] - arrcn[i1] * arrkn[i1] * Math.pow(b, arrkn[i1])) * arrUrn[i1] * Math.exp(-arrcn[i1] * Math.pow(b, arrkn[i1])));
			A0 += termA0;
			const termA1 = arran[i1] * Math.pow(b, arrbn[i1]) * Math.pow(Tem, -arrun[i1])
				* (((arrbn[i1] + 1) * arrbn[i1]) * arrDrn[i1]
					+ ((arrbn[i1] - arrcn[i1] * arrkn[i1] * Math.pow(b, arrkn[i1])) * (arrbn[i1] - arrcn[i1] * arrkn[i1] * Math.pow(b, arrkn[i1]) + 1)
						- arrcn[i1] * Math.pow(arrkn[i1], 2) * Math.pow(b, arrkn[i1])) * arrUrn[i1] * Math.exp(-arrcn[i1] * Math.pow(b, arrkn[i1])));
			A1 += termA1;
		}
		pr = b * Tem * (1 + A0);
		Db = (p / Tem - (1 + A0) * b) / (1 + A1);
		iterations++;
		if (iterations > 10000) {
			break; // safety
		}
	}

	const Zfactor1 = 1 + A0;
	return Number(Zfactor1.toFixed(4));
}

export interface GeometricVolumeParams {
	diameter1: number; // диаметр первого участка (мм)
	length1: number;   // длина первого участка (км)
	diameter2: number; // диаметр второго участка (мм)
	length2: number;   // длина второго участка (км)
	diameter3: number; // диаметр третьего участка (мм)
	length3: number;   // длина третьего участка (км)
	additionalVolume: number; // дополнительный объем (тыс. м³)
}

export function calculateGeometricVolume({ 
	diameter1, length1, 
	diameter2, length2, 
	diameter3, length3, 
	additionalVolume 
}: GeometricVolumeParams): number {
	// Расчет геометрического объема участка
	// Диаметры в мм, длины в км, дополнительный объем в тыс. м³
	// =ОКРУГЛ(ПИ()*d1^2/4*L1/1000+ПИ()*d2^2/4*L2/1000+ПИ()*d3^2/4*L3/1000+(доп_объем*1000);0)
	const volume1 = Math.PI * Math.pow(diameter1, 2) / 4 * length1 / 1000;
	const volume2 = Math.PI * Math.pow(diameter2, 2) / 4 * length2 / 1000;
	const volume3 = Math.PI * Math.pow(diameter3, 2) / 4 * length3 / 1000;
	const additional = additionalVolume * 1000; // тыс. м³ -> м³
	
	const totalVolume = volume1 + volume2 + volume3 + additional;
	
	return Math.round(totalVolume);
}

export interface GasVolumeParams {
	geometricVolume: number; // геометрический объем участка
	numberOfPurges: number;  // количество продувок при проведении работ
}

export function calculateGasVolume({ geometricVolume, numberOfPurges }: GasVolumeParams): number {
	// Расчет объема газа, расходуемого для удаления газовоздушной смеси по участкам
	// =ОКРУГЛ(геом_объем*3*количество_продувок;0)
	const result = geometricVolume * 3 * numberOfPurges;
	
	return Math.round(result);
}

export interface GasStockChangeParams {
	geometricVolume: number; // геометрический объем участка
	avgPressure1: number;   // среднее абсолютное давление газа 1 (МПа)
	compressibility1: number; // коэффициент сжимаемости газа 1
	avgTemperature1: number; // средняя температура газа 1 (К)
	avgPressure2: number;   // среднее абсолютное давление газа 2 (МПа)
	compressibility2: number; // коэффициент сжимаемости газа 2
	avgTemperature2: number; // средняя температура газа 2 (К)
}

export function calculateGasStockChange({ 
	geometricVolume, avgPressure1, compressibility1, avgTemperature1, 
	avgPressure2, compressibility2, avgTemperature2 
}: GasStockChangeParams): number {
	// Расчет изменения запаса газа в участке
	// =ОКРУГЛ((C$27/C$26)*C$37*(C74/(C76*C75)-C81/(C83*C82)))
	// C27 = 293.15 К (температура газа при стандартных условиях)
	// C26 = 0.1013 МПа (давление газа при стандартных условиях)
	const C27 = 293.15; // температура газа при стандартных условиях (К)
	const C26 = 0.1013; // давление газа при стандартных условиях (МПа)
	
	const result = (C27 / C26) * geometricVolume * (avgPressure1 / (compressibility1 * avgTemperature1) - avgPressure2 / (compressibility2 * avgTemperature2));
	
	return Math.round(result);
}

export interface AverageAbsolutePressureParams {
	C77: number; // параметр C77
	C20: number; // параметр C20
	C26: number; // параметр C26
	C79: number; // параметр C79
}

export function calculateAverageAbsolutePressure({ C77, C20, C26, C79 }: AverageAbsolutePressureParams): number {
	// Расчет среднего абсолютного давления газа
	// =(2/3)*((C77+(C$20*C$26/760))+((C79+(C$20*C$26/760))^2/((C77+C$20*C$26/760)+(C79+C$20*C$26/760))))
	const term1 = C77 + (C20 * C26 / 760);
	const term2 = C79 + (C20 * C26 / 760);
	const term3 = term2 * term2 / (term1 + term2);
	
	const result = (2/3) * (term1 + term3);
	
	return result;
} 
