import { calculate } from "./calculate.js";
export { calculate } from "./calculate.js";
// simple CLI usage: node dist/index.js 300 5 "x1,x2,...,x12"
const isMain = process.argv[1] && /index\.(c|m)?js$/.test(process.argv[1]);
if (isMain) {
    const [TemStr, PresStr, compStr] = process.argv.slice(2);
    if (!TemStr || !PresStr || !compStr) {
        console.log("Usage: node dist/index.js <Tem> <Pres> <comma-separated 12 numbers>");
        process.exit(1);
    }
    const Tem = Number(TemStr);
    const Pres = Number(PresStr);
    const arrx_k = compStr.split(",").map(Number);
    const result = calculate({ Tem, Pres, arrx_k });
    console.log(result);
}
