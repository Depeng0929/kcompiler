import { codeGenerator } from './core/generate.js'
import { parse } from './core/parse.js'
import { tokenizer } from './core/tokenizer.js'
import { transformer } from './core/transform.js'

export function compiler (input) {
  let tokens = tokenizer(input)
  let ast = parse(tokens)
  let newAst = transformer(ast)
  console.log(ast)
  debugger
  return codeGenerator(newAst)
}
