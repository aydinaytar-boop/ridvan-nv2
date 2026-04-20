// src/config/settings.ts
import { db } from "../utils/firebase"; 
import { ref, onValue, update } from "firebase/database";

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
    
    if (saved) {
      // Eğer kayıt varsa onu kullan (Eski sistemden kalan veri uyumu için)
      return JSON.parse(saved); 
    } else {
      // Kayıt yoksa varsayılan mesajları göster
      return {
        tr: "İzine erken gidecek olanlar LÜTFEN Kurban bağışlarınızı yapmış olarak gidin! İyi Tatiller!", 
        de: "“Wer früher in den Urlaub fährt, wird gebeten, seine **Kurban-Spenden bereits im Voraus geleistet zu haben**. Schöne Feiertage!”"
      };
    }
  }
};

// --- 2. OKUMA FONKSİYONLARI ---
export function getSabahKametSaati(): string { 
  return localStorage.getItem("manuelSabahKamet") || "05:15"; 
}

export function getBayramSaati(tarih: string): string { 
  return localStorage.getItem(`bayramSaati_${tarih}`) || "06:00"; 
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

// Genel Ayar Kaydetme
export function saveSettingToFirebase(key: string, value: string) {
  localStorage.setItem(key, value);
  if (db) {
    update(ref(db, 'settings'), { [key]: value });
  }
}

// ✨ Duyuruyu Kaydetme Fonksiyonu
// Buraya hem tr hem de de metnini içeren bir obje gönderilmeli
export function setDuyurular(data: { tr: string, de: string }) {
  // 1. Hemen ekranda görünmesi için hafızaya yaz (JSON formatında)
  localStorage.setItem("duyurular_metni", JSON.stringify(data));
  
  // 2. Uzaktan güncelleme için Firebase'e yaz
  if (db) {
    update(ref(db, 'settings'), { duyurular_metni: JSON.stringify(data) });
  }
  
  console.log("Duyuru güncellendi:", data);
}

// --- 4. FIREBASE SENKRONİZASYONU ---
export function initFirebaseSync() {
  if (!db) return;

  const settingsRef = ref(db, 'settings');
  
  onValue(settingsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
        window.dispatchEvent(new Event('storage-updated')); 
      });
      console.log("Firebase verileri senkronize edildi.");
    }
  });
}