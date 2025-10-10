import { calculate } from './calculate.js';
// Simple demo input; replace with real data
const Tem = 5; // K
const Pres = 300; // MPa
const arrx_k = [
    0.965, 0.018, 0.0045, 0.001, 0.001, 0.005,
    0.0003, 0.0007, 0.003, 0.006, 0, 0,
];
const result = calculate({ Tem, Pres, arrx_k });
console.log('Z =', result);
