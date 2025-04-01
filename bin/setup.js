#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Создаем lefthook.yml
const hookConfig = `
commit-msg:
  commands:
    translate:
      run: node ${path.resolve(__dirname, '../scripts/translate.js')} {1}
`;

// Создаем .env.example если его нет
const envExample = `DEEPL_API_KEY=your_key_here`;

// Записываем файлы
fs.writeFileSync('lefthook.yml', hookConfig);
fs.copyFileSync(path.join(__dirname, '../.env.example'), '.env.example');

console.log(`
🎉 Установка завершена!
1. Добавьте ключ DeepL в файл .env
2. Запустите: npx lefthook install
`);
