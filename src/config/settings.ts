// src/config/settings.ts
import { db } from "../utils/firebase"; // Firebase bağlantın buradan geliyor
import { ref, onValue, update } from "firebase/database";

// --- 1. AYARLAR TANIMLARI (SETTINGS) ---
export const SETTINGS = {
  get manuelSabahKamet(): string {
    return localStorage.getItem("manuelSabahKamet") || "05:15";
  },
  kametSureleri: { ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 },
  kametOffsets: { sabah: 0, ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 } as Record<string, number>,
  cuma: { ezan: "13:10", kamet: "13:30" },
  blackoutSuresi: 600,
  bayramlar: [
    { ad_tr: "Ramazan Bayramı", ad_de: "Bayram", tarih: "2026-03-20", tarih2: "2026-03-22", saat: "09:00" },
    { ad_tr: "Kurban Bayramı", ad_de: "Opferfest", tarih: "2026-05-27", tarih2: "2026-05-30", saat: "09:00" },
  ],
  
  // ✨ YENİ EKLENEN: Varsayılan Duyuru Metni
  get duyurular() {
    return localStorage.getItem("duyurular_metni") || "Hoş geldiniz! Cuma namazı saati 13:10'dur.";
  }
};

// --- 2. OKUMA FONKSİYONLARI ---
export function getSabahKametSaati(): string { 
  return localStorage.getItem("manuelSabahKamet") || "06:15"; 
}

export function getBayramSaati(tarih: string): string { 
  return localStorage.getItem(`bayramSaati_${tarih}`) || "09:00"; 
}

// ✨ YENİ EKLENEN: Duyuruyu Okuma Fonksiyonu
export function getDuyurular(): string {
  return SETTINGS.duyurular;
}

// --- 3. KAYDETME FONKSİYONLARI (LOCAL + FIREBASE) ---

// Genel Ayar Kaydetme (Kamet saati vb. için)
export function saveSettingToFirebase(key: string, value: string) {
  // Hem kendi hafızana (Local) hem de Firebase'e yazıyoruz
  localStorage.setItem(key, value); 
  update(ref(db, 'settings'), { [key]: value });
}

// ✨ YENİ EKLENEN: Duyuruyu Kaydetme Fonksiyonu
export function setDuyurular(text: string) {
  // 1. LocalStorage'a kaydet (Hemen ekranda görünsün diye)
  localStorage.setItem("duyurular_metni", text);
  
  // 2. Firebase'e kaydet (Uzaktan güncelleme için şart)
  // 'settings' anahtarı altına 'duyurular_metni' olarak gider
  update(ref(db, 'settings'), { duyurular_metni: text });
  
  console.log("Duyuru güncellendi:", text);
}

// --- 4. FIREBASE SENKRONİZASYONU (UZAKTAN GÜNCELLEME MOTORU) ---
export function initFirebaseSync() {
  const settingsRef = ref(db, 'settings');
  
  // Firebase'deki veriyi dinlemeye başla
  onValue(settingsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Firebase'den gelen her veriyi LocalStorage'a aktar
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
        console.log(`Firebase'den gelen güncelleme: ${key} = ${data[key]}`);
      });
    }
  });
}