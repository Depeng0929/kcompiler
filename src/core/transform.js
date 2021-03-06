function traverse (ast, visitor) {
  function traverseArray (array, parent) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }

  function traverseNode (node, parent) {
    let operationMethod = visitor[node.type]

    if (operationMethod && operationMethod.enter) {
      operationMethod.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break;
      case 'CallExpression':
        traverseArray(node.params, node)
        break;
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      default:
        throw new TypeError(node.type);
    }

    if (operationMethod && operationMethod.exit) {
      operationMethod.exit(node, parent)
    }
  }
  traverseNode(ast, null)
}

export function transformer (ast) {
  let newAst = {
    type: 'Program',
    body: []
  }
  // 保存新的ast
  ast._context = newAst.body

  traverse(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        })
      }
    },
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        })
      }
    },
    CallExpression: {
      enter (node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: []
        }
        node._context = expression.arguments;

        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }
        parent && parent._context.push(expression);
      },
    }
  })

  return newAst
}