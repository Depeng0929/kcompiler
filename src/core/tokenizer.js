export function tokenizer (input) {
  let tokens = []

  for (let i = 0; i < input.length; i++) {
    const currentStr = input[i]

    if (currentStr === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })
      continue
    }

    if (currentStr === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })
      continue
    }

    if (/\s/.test(currentStr)) {
      continue
    }

    const num = /[0-9]/
    if (num.test(currentStr)) {
      let value = ''
      while (num.test(currentStr)) {
        value += currentStr
        currentStr = input[++i]
      }
      tokens.push({
        type: 'number',
        value
      })
      continue
    }
    
    const letters = /[a-z]/i
    if (letters.test(currentStr)) {
      let value = ''
      while (letters.test(currentStr)) {
        value += currentStr;
        currentStr = input[++i]
      }
      tokens.push({
        type: 'name',
        value
      })
      continue
    }
  }
  return tokens
}