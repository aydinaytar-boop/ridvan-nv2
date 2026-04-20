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

  // ✨ DUYURULAR (TR ve DE olarak iki dil eklendi)
  get duyurular() {
    // Hafızada kayıtlı bir duyuru var mı bak
    const saved = localStorage.getItem("duyurular_metni");
    
    // 1. DURUM: Hiç kayıt yoksa -> Varsayılanı göster
    if (!saved) {
      return {
        tr: "Hoş geldiniz! İyi Tatiller!", 
        de: "Willkommen! Schöne Feiertage!"
      };
    }

    // 2. DURUM: Kayıt var ama eski tip (Düz yazı) ise -> Dönüştür ve Kaydet
    // Eğer JSON değilse (eski sistemden kalma), bunu Türkçe kabul et
    if (typeof saved === "string") {
      const eskiVeri = saved;
      // Hemen yeni formatta kaydedelim ki bir daha bozulmasın
      localStorage.setItem("duyurular_metni", JSON.stringify({ tr: eskiVeri, de: "" }));
      return { tr: eskiVeri, de: "" };
    }

    // 3. DURUM: Kayıt var ve Kutu (JSON) ise -> İçini kontrol et
    try {
      const data = JSON.parse(saved);
      
      // Eğer kutunun içinde 'tr' veya 'de' yoksa boşlukları doldur
      if (!data.tr) data.tr = "";
      if (!data.de) data.de = "";
      
      return data;
    } catch {
      // Her şeye rağmen hata olursa
      return { tr: "", de: "" };
    }
  }
};

// --- 2. OKUMA FONKSİYONLARI ---
export function getSabahKametSaati(): string { 
  return localStorage.getItem("manuelSabahKamet") || "05:15"; 
}

export function getBayramSaati(tarih: string): string { 
  return localStorage.getItem(`bayramSaati_${tarih}`) || "06:30"; 
}

// ✨ Duyuruyu Okuma Fonksiyonu (Artık dil seçimi yapıyor)
// lang parametresi "tr" veya "de" olmalı
export function getDuyurular(lang: "tr" | "de"): string {
  const duyuruObj = SETTINGS.duyurular;
  
  // Eğer duyuru bir obje değil de tek bir yazıysa (eski tip), direkt onu döndür
  if (typeof duyuruObj === "string") {
    return duyuruObj;
  }
  
  // Hangi dil seçiliyse onu getirir, yoksa Türkçe varsayılanı basar
  return duyuruObj[lang] || duyuruObj["tr"];
}

// --- 3. KAYDETME FONKSİYONLARI ---

// Genel Ayar Kaydetme (Sadece LocalStorage kullanır)
export function saveSettingToFirebase(key: string, value: string) {
  localStorage.setItem(key, value);
}

// ✨ Duyuruyu Kaydetme Fonksiyonu
// Buraya hem tr hem de de metnini içeren bir obje gönderilmeli
export function setDuyurular(data: { tr: string, de: string }) {
  // 1. Hemen ekranda görünmesi için hafızaya yaz (JSON formatında)
  localStorage.setItem("duyurular_metni", JSON.stringify(data));
  
  console.log("Duyuru güncellendi:", data);
}