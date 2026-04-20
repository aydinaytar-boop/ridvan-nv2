// src/config/settings.ts

// --- 1. AYARLAR VE VERİLER (SETTINGS) ---
export const SETTINGS = {
  // Sabah Kamet Varsayılanı
  get manuelSabahKamet(): string {
    return localStorage.getItem("manuelSabahKamet") || "05:15";
  },
  
  // Kamet Süreleri
  kametSureleri: { ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 },
  kametOffsets: { sabah: 0, ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 } as Record<string, number>,
  
  // Cuma Saatleri
  cuma: { ezan: "13:10", kamet: "13:30" },
  blackoutSuresi: 600,
  
  // Bayramlar
  bayramlar: [
    { ad_tr: "Ramazan Bayramı", ad_de: "Bayram", tarih: "2026-03-20", tarih2: "2026-03-22", saat: "06:30" },
    { ad_tr: "Kurban Bayramı", ad_de: "Opferfest", tarih: "2026-05-27", tarih2: "2026-05-30", saat: "05:35" },
  ],

  // ✨ DUYURULAR (TR ve DE olarak iki dil)
  // DİKKAT: 'get' kullanılmadı, doğrudan değer atandı. Sonsuz döngü olmaz.
  duyurular: (() => {
    const saved = localStorage.getItem("duyurular_metni");
    
    if (!saved) {
      return {
        tr: "Hoş geldiniz! İyi Tatiller!", 
        de: "Willkommen! Schöne Feiertage!"
      };
    }

    if (typeof saved === "string") {
      const eskiVeri = saved;
      localStorage.setItem("duyurular_metni", JSON.stringify({ tr: eskiVeri, de: "" }));
      return { tr: eskiVeri, de: "" };
    }

    try {
      const data = JSON.parse(saved);
      if (!data.tr) data.tr = "";
      if (!data.de) data.de = "";
      return data;
    } catch {
      return { tr: "", de: "" };
    }
  })(),
};

// --- 2. OKUMA FONKSİYONLARI ---
export function getSabahKametSaati(): string { 
  return localStorage.getItem("manuelSabahKamet") || "05:15"; 
}

export function getBayramSaati(tarih: string): string { 
  return localStorage.getItem(`bayramSaati_${tarih}`) || "06:30"; 
}

// ✨ Duyuruyu Okuma (Dil seçimi yapıyor)
export function getDuyurular(lang: "tr" | "de"): string {
  const duyuruObj = SETTINGS.duyurular;
  
  if (typeof duyuruObj === "string") {
    return duyuruObj;
  }
  
  return duyuruObj[lang] || duyuruObj["tr"];
}

// --- 3. KAYDETME FONKSİYONLARI ---

// Genel Ayar Kaydetme
export function saveSettingToFirebase(key: string, value: string) {
  localStorage.setItem(key, value);
}

// ✨ Duyuruyu Kaydetme
export function setDuyurular(data: { tr: string, de: string }) {
  localStorage.setItem("duyurular_metni", JSON.stringify(data));
  console.log("Duyuru güncellendi:", data);
}