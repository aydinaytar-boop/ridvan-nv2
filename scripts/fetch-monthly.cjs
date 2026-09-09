const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = "awqatsalah.diyanet.gov.tr";
const VIYANA_ID = 11618;
const CONFIG_PATH = path.join(__dirname, '..', 'public', 'config.json');

const EMAIL = process.env.DIYANET_EMAIL;
const PASSWORD = process.env.DIYANET_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error("HATA: DIYANET_EMAIL / DIYANET_PASSWORD ortam değişkenleri bulunamadı.");
  console.error("GitHub Actions'da bunlar Secrets üzerinden geliyor olmalı.");
  process.exit(1);
}

function request(reqPath, token = null, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (body) headers['Content-Length'] = Buffer.byteLength(body);

    const req = https.request({ hostname: BASE, path: reqPath, method, headers }, (res) => {
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
  console.log("Login yapılıyor...");
  const loginBody = JSON.stringify({ email: EMAIL, password: PASSWORD });
  const login = await request('/Auth/Login', null, 'POST', loginBody);
  const loginData = JSON.parse(login.body);
  const token = loginData.data?.accessToken;
  console.log("Token:", token ? "✅" : "❌");

  if (!token) {
    console.error("Login başarısız, çıkılıyor. Yanıt:", login.body.substring(0, 300));
    process.exit(1);
  }

  console.log("Aylık vakitler çekiliyor...");
  const monthly = await request(`/api/PrayerTime/Monthly/${VIYANA_ID}`, token);
  console.log("HTTP Status:", monthly.status);

  if (monthly.status !== 200) {
    console.error("Vakit çekme başarısız:", monthly.body.substring(0, 500));
    process.exit(1);
  }

  const data = JSON.parse(monthly.body);
  const newPrayerTimes = {};

  // timeEngine.ts vakitleri "YYYY-MM-DD" (tire ile, yıl-ay-gün) formatındaki
  // anahtarla arıyor. Diyanet API'si tarihi "DD.MM.YYYY" (nokta ile) döndürüyor,
  // bu yüzden mutlaka çevirmemiz gerekiyor — aksi halde apiPrayerTimes hiçbir
  // zaman eşleşmez ve uygulama sessizce statik/eski veriye düşer.
  function toIsoDate(raw) {
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(raw);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`; // DD.MM.YYYY -> YYYY-MM-DD
    return raw; // zaten ISO formatındaysa dokunma
  }

  if (data.data && Array.isArray(data.data)) {
    data.data.forEach(day => {
      const rawDate = day.gregorianDateShort || day.gregorianDate || day.date;
      if (!rawDate) return;
      const date = toIsoDate(rawDate);
      newPrayerTimes[date] = {
        sabah: (day.fajr || day.imsak || "").substring(0, 5),
        gunes: (day.sunrise || day.israk || "").substring(0, 5),
        ogle: (day.dhuhr || day.zuhr || "").substring(0, 5),
        ikindi: (day.asr || "").substring(0, 5),
        aksam: (day.maghrib || "").substring(0, 5),
        yatsi: (day.isha || "").substring(0, 5),
      };
    });
  }

  const dayCount = Object.keys(newPrayerTimes).length;
  console.log("İşlenen gün sayısı:", dayCount);

  if (dayCount === 0) {
    console.error("Hiç vakit verisi işlenemedi, config.json'a dokunulmadı.");
    process.exit(1);
  }

  // Mevcut config.json'u oku ve KORU — sadece dynamic.prayerTimes alanını
  // güncelle/genişlet. Uygulama (timeEngine.ts / App.tsx) vakitleri
  // config.dynamic.prayerTimes altından okuyor — üst seviyeye değil, mutlaka
  // "dynamic" objesinin İÇİNE yazılması gerekiyor.
  let config = {};
  if (fs.existsSync(CONFIG_PATH)) {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  }

  if (!config.dynamic) config.dynamic = {};

  config.dynamic.prayerTimes = {
    ...(config.dynamic.prayerTimes || {}),
    ...newPrayerTimes,
  };
  config.dynamic.lastApiUpdate = new Date().toISOString();

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
  console.log(`✅ ${CONFIG_PATH} güncellendi (${dayCount} gün eklendi/güncellendi, dynamic.prayerTimes altına).`);
}

run().catch(e => {
  console.error("Hata:", e.message);
  process.exit(1);
});
