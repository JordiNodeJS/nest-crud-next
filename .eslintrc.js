module.exports = {
  // ...existing code...
  rules: {
    // ...existing code...
    'object-curly-newline': 'off', // To completely disable the rule
    
    // Or configure it with options:
    // 'object-curly-newline': ['error', {
    //   ObjectExpression: { consistent: true },
    //   ObjectPattern: { consistent: true },
    //   ImportDeclaration: { consistent: true },
    //   ExportDeclaration: { consistent: true }
    // }],
  },
  // ...existing code...
};