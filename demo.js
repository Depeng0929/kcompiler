// 1. 解析阶段，通过词法分析转换为词法单元
// 2. 通过语法分析，转为AST
// 3. 将AST通过Transform转为新的AST
// 4. 生成代码
import { compiler } from "./src/index.js";

const result = compiler('(add 2 (subtract 4 2))')
console.log(result === 'add(2, subtract(4, 2))')