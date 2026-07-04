const https = require('https');
const fs = require('fs');

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
  console.log("Login yapılıyor...");
  const loginBody = JSON.stringify({ email: "aydinaytar@hotmail.com", password: "9cL-yQ+5" });
  const login = await request('/Auth/Login', null, 'POST', loginBody);
  const loginData = JSON.parse(login.body);
  const token = loginData.data?.accessToken;
  const refreshToken = loginData.data?.refreshToken;
  console.log("Token:", token ? "✅" : "❌");

  // Aylık vakitler — DOĞRU ENDPOINT: /api/PrayerTime/Monthly/
  console.log("\nAylık vakitler çekiliyor...");
  const monthly = await request(`/api/PrayerTime/Monthly/${VIYANA_ID}`, token);
  console.log("HTTP Status:", monthly.status);
  console.log("Yanıt:", monthly.body.substring(0, 1000));

  if (monthly.status !== 200) return;

  const data = JSON.parse(monthly.body);
  console.log("\nVeri yapısı (ilk eleman):", JSON.stringify(data.data?.[0], null, 2));

  // Vakitleri işle
  const prayerTimes = {};
  if (data.data && Array.isArray(data.data)) {
    data.data.forEach(day => {
      const date = day.gregorianDateShort || day.gregorianDate || day.date;
      if (!date) return;
      prayerTimes[date] = {
        sabah:  (day.fajr   || day.imsak  || "").substring(0, 5),
        gunes:  (day.sunrise || day.israk  || "").substring(0, 5),
        ogle:   (day.dhuhr  || day.zuhr   || "").substring(0, 5),
        ikindi: (day.asr    || "").substring(0, 5),
        aksam:  (day.maghrib || "").substring(0, 5),
        yatsi:  (day.isha   || "").substring(0, 5),
      };
    });
  }

  console.log("\nİşlenen gün sayısı:", Object.keys(prayerTimes).length);
  if (Object.keys(prayerTimes).length > 0) {
    console.log("İlk gün:", JSON.stringify(Object.entries(prayerTimes)[0]));
    const output = { lastUpdated: new Date().toISOString(), refreshToken, prayerTimes };
    fs.writeFileSync('C:\\Users\\ridva\\Desktop\\vakitler.json', JSON.stringify(output, null, 2), 'utf8');
    console.log("\n✅ vakitler.json kaydedildi!");
  }
}

run().catch(e => console.error("Hata:", e.message));