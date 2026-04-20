// src/config/settings.ts
import { db } from "../utils/firebase"; // Firebase dosyan varsa buradan gelir, yoksa hata vermez
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
    { ad_tr: "Ramazan Bayramı", ad_de: "Bayram", tarih: "2026-03-20", tarih2: "2026-03-22", saat: "09:00" },
    { ad_tr: "Kurban Bayramı", ad_de: "Opferfest", tarih: "2026-05-27", tarih2: "2026-05-30", saat: "09:00" },
  ],

  // ✨ DUYURULAR (Buradan güncelleyebilirsin)
  get duyurular() {
    // Önce hafızada (localStorage) var mı bak, yoksa varsayılanı göster
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

// ✨ Duyuruyu Okuma Fonksiyonu
export function getDuyurular(): string {
  return SETTINGS.duyurular;
}

// --- 3. KAYDETME FONKSİYONLARI (LocalStorage + Firebase) ---

// Genel Ayar Kaydetme
export function saveSettingToFirebase(key: string, value: string) {
  localStorage.setItem(key, value);
  // Firebase varsa oraya da yaz, yoksa bu satırı atla (Hata vermez)
  if (db) {
    update(ref(db, 'settings'), { [key]: value });
  }
}

// ✨ Duyuruyu Kaydetme Fonksiyonu
export function setDuyurular(text: string) {
  // 1. Hemen ekranda görünmesi için hafızaya yaz
  localStorage.setItem("duyurular_metni", text);
  
  // 2. Uzaktan güncelleme için Firebase'e yaz (Firebase yoksa sessizce geçer)
  if (db) {
    update(ref(db, 'settings'), { duyurular_metni: text });
  }
  
  console.log("Duyuru güncellendi:", text);
}

// --- 4. FIREBASE SENKRONİZASYONU (Uzaktan Güncelleme Motoru) ---
export function initFirebaseSync() {
  // Firebase bağlantısı yoksa bu fonksiyon hiçbir şey yapmaz
  if (!db) return;

  const settingsRef = ref(db, 'settings');
  
  onValue(settingsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Firebase'den gelen veriyi hafızaya al
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
        // Sayfa yenilenince değişikliği algılamak için tetikleme (Opsiyonel)
        window.dispatchEvent(new Event('storage-updated')); 
      });
      console.log("Firebase verileri senkronize edildi.");
    }
  });
}