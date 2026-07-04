const https = require('https');
const BASE = "awqatsalah.diyanet.gov.tr";
const VIYANA_ID = 11618;

function request(path, token = null, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (body) headers['Content-Length'] = Buffer.byteLength(body);

    const req = https.request({ hostname: BASE, path, method, headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  // Login
  const loginBody = JSON.stringify({ email: "aydinaytar@hotmail.com", password: "9cL-yQ+5" });
  const login = await request('/Auth/Login', null, 'POST', loginBody);
  const token = JSON.parse(login.body).data?.accessToken;
  console.log("Token:", token ? "✅" : "❌");

  // Farklı endpointleri test et
  const endpoints = [
    `/api/AwqatSalah/Daily/${VIYANA_ID}`,
    `/api/AwqatSalah/Weekly/${VIYANA_ID}`,
    `/api/AwqatSalah/Monthly/${VIYANA_ID}`,
    `/api/Place/CityDetail/${VIYANA_ID}`,
  ];

  for (const ep of endpoints) {
    const res = await request(ep, token);
    console.log(`\n${ep}`);
    console.log(`Status: ${res.status}`);
    console.log(`Yanıt: ${res.body.substring(0, 300) || "(BOŞ)"}`);
  }
}

run().catch(e => console.error("Hata:", e.message));