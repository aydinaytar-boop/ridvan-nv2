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
  // DÜZELTME: Veriyi okurken hem string hem obje kontrolü yapıyoruz.
  duyurular: (() => {
    try {
      const saved = localStorage.getItem("duyurular_metni");
      
      // 1. Durum: Kayıt yoksa varsayılanı ver
      if (!saved) {
        return { tr: "Hoş geldiniz! İyi Tatiller!", de: "Willkommen! Schöne Feiertage!" };
      }

      // 2. Durum: Veri zaten bir Obje ise (Doğru format)
      if (typeof saved === "object") {
        return {
          tr: saved.tr || "",
          de: saved.de || ""
        };
      }

      // 3. Durum: Veri String ise (Eski format veya bozuk veri)
      // Önce bunun düz yazı mı yoksa JSON mu olduğuna bakıyoruz
      try {
        const parsed = JSON.parse(saved);
        // Eğer JSON parse edilebildiyse ve içi doluysa onu kullan
        if (parsed && (parsed.tr || parsed.de)) {
           return { tr: parsed.tr || "", de: parsed.de || "" };
        }
      } catch (e) {
        // JSON parse hatası verirse, bu düz bir yazıdır (Eski tip duyuru)
        return { tr: saved, de: "" };
      }

      // Hiçbiri değilse boş döndür
      return { tr: "", de: "" };

    } catch (error) {
      console.error("Duyuru okuma hatası:", error);
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

// ✨ Duyuruyu Okuma Fonksiyonu
export function getDuyurular(lang: "tr" | "de"): string {
  const duyuruObj = SETTINGS.duyurular;
  
  // Güvenlik kontrolü
  if (!duyuruObj) return "";

  // Eğer obje değilse string'dir
  if (typeof duyuruObj === "string") {
    return duyuruObj;
  }
  
  // Hangi dil seçiliyse onu getirir
  return duyuruObj[lang] || duyuruObj["tr"] || "";
}

// --- 3. KAYDETME FONKSİYONLARI ---

// Genel Ayar Kaydetme
export function saveSettingToFirebase(key: string, value: string) {
  localStorage.setItem(key, value);
}

// ✨ Duyuruyu Kaydetme Fonksiyonu
export function setDuyurular(data: { tr: string, de: string }) {
  // Veriyi her zaman temiz bir JSON string olarak kaydet
  localStorage.setItem("duyurular_metni", JSON.stringify(data));
  console.log("Duyuru güncellendi:", data);
}