#!/bin/bash

UTILS_PATH="./mock-server/utils.js"  # Chemin vers ton fichier utils.js

cat > "$UTILS_PATH" <<'EOF'
const { pathToRegexp } = require('path-to-regexp')

const isMatch = routePattern => routePath => {
  const regexp = pathToRegexp(routePattern)
  return !!regexp.regexp.exec(routePath)
}

module.exports = { isMatch }
EOF

echo "✅ utils.js corrigé avec succès."
