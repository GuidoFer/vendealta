const fs = require('fs');

const filePath = '/home/kali/Downloads/vendealta-app-9fbf713de957.json';

try {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log('\n========================================');
  console.log('VARIABLES PARA VERCEL (Base64 Method)');
  console.log('========================================\n');
  
  console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  console.log(data.client_email);
  console.log('');
  
  console.log('GOOGLE_PRIVATE_KEY_BASE64');
  console.log(Buffer.from(data.private_key).toString('base64'));
  console.log('');
  
  console.log('========================================');
  console.log('Copia cada valor en Vercel exactamente');
  console.log('========================================\n');
  
  // También crear .env.local
  const envContent = `
# Generated automatically
GOOGLE_SERVICE_ACCOUNT_EMAIL=${data.client_email}
GOOGLE_PRIVATE_KEY_BASE64=${Buffer.from(data.private_key).toString('base64')}
SHEETS_MAPPING=juan-perez:TU_SHEET_ID_AQUI
DATA_PROVIDER=sheets
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-Z53X9VF72P
`.trim();

  fs.writeFileSync('.env.local.generated', envContent);
  console.log('✅ También generado: .env.local.generated');
  console.log('   Revisa el archivo y copia lo necesario a .env.local\n');
  
} catch (error) {
  console.error('Error:', error.message);
}
