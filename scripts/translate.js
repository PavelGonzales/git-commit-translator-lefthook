require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const translate = async () => {
  const commitFile = process.argv[2];
  const message = fs.readFileSync(commitFile, 'utf-8');
  
  try {
    const response = await axios.post('https://api-free.deepl.com/v2/translate', {
      text: [message],
      target_lang: 'EN'
    }, {
      headers: { 'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` }
    });

    fs.writeFileSync(commitFile, response.data.translations[0].text);
  } catch (error) {
    console.error('🚨 Translation failed:', error.message);
    process.exit(1);
  }
};

translate();
