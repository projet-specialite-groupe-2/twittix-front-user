#!/bin/bash

UTILS_PATH="./mock-server/utils.js"  # Chemin vers ton fichier utils.js
JSON_PATH="./mock-server/data/apiUsersIdconversationsGetCollection.json"
cat > "$UTILS_PATH" <<'EOF'
const { pathToRegexp } = require('path-to-regexp')

const isMatch = routePattern => routePath => {
  const regexp = pathToRegexp(routePattern)
  return !!regexp.regexp.exec(routePath)
}

module.exports = { isMatch }
EOF

echo "✅ utils.js corrigé avec succès."


cat > "$JSON_PATH" <<EOF
[
{
    "id": 2838,
    "title": "Test conversation",
    "picturePath": "picture_image_path_base.jpg",
    "createdAt": "2025-06-15T10:12:40.526Z",
    "lastMessage": {
      "id": 273,
      "content": "Test message",
      "author": {
        "id": 273,
        "email": "test@test.com",
        "username": "test"
      }
    }
  }
]
EOF

echo "✅ data.json écrasé avec succès."

sleep 3
